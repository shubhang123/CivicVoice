
import pandas as pd
import json
import time
import re
import pymongo
import uuid
from groq import Groq
from dotenv import load_dotenv
import os
from transformers import pipeline
from google.colab import files


load_dotenv()

MONGO_URI = "mongodb+srv://nikunj:1234@cluster0.djsjf.mongodb.net/prayatna?retryWrites=true&w=majority&appName=cluster0"
mongo_client = pymongo.MongoClient(MONGO_URI)
db = mongo_client["prayatna"]
collection = db["complaints"]


client = Groq(api_key="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")


zero_shot_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=-1  
)


COMPLAINT_THRESHOLD = 0.69 

def classify_complaint_via_groq(complaint):
    """Classifies a complaint using Groq AI."""
    local_departments = """
1. Water Supply Department
2. Health and Sanitation Department
3. Public Works Department
4. Electricity Department
5. Local Police Station
6. Education Department
7. Tax Department
8. Town Planning Department
9. Environment Department
10. Consumer Affairs Department
11. Transport Department
12. Social Welfare Department
13. Legal Aid Center
14. Culture and Sports Department
15. Tourism Department
16. Disaster Management Department
17. Building and Development Control Department
18. Socio-Economic Development Department
19. Fire Department
20. Environment and Parks Department
21. Slum Development Department
22. Urban Development Department
23. Parks and Recreation Department
24. Culture and Education Department
25. Cemetery Management Department
26. Animal Control Department
27. Registration Department
28. Public Amenities Department
29. Food Safety and Health Department
30. Railway Department
"""

    prompt = f"""
You are an assistant that analyzes public service complaints. Given the following complaint, extract and output a JSON object with the following keys:
- "department": Identify the most appropriate local department from the list below.
- "summary": Provide a concise summary or key phrases of the complaint.
- "severity": Assess the complaint's priority (Low, Moderate, or High).
- "location": The location mentioned in the complaint, or "N/A" if not available.
- "name": The name of the person who complained, or "N/A" if not available.
- "content_platform": This must be "Twitter" as the complaint originates from a tweet.
- "content_platform_details": A nested object including:
  - "tweet_id", "date", "content", "username", "url"

Local Departments:
{local_departments}

Complaint: "{complaint.get('content')}"
Sentiment Score: {complaint.get('complaint_score', 'N/A')}"

Return only the JSON object without any markdown formatting (no triple backticks or similar).
"""

    messages = [{"role": "user", "content": prompt}]
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=messages,
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )

    output = ""
    for chunk in completion:
        output += chunk.choices[0].delta.content or ""

    output = output.strip()
    output = re.sub(r"^```(json)?\s*", "", output)
    output = re.sub(r"\s*```$", "", output)

    try:
        return json.loads(output)
    except Exception as e:
        print("Error parsing output:", e)
        print("Output was:", output)
        return None

def process_csv(input_csv, output_json):
    """Processes the CSV file containing sentiment data and classifies complaints."""
    df = pd.read_csv(input_csv)

    print("\n🔍 Processing sentiment data for complaints...")

    results = []
    for index, row in df.iterrows():
        if pd.isna(row["SentimentText"]):
            print(f"⚠️ Row {index + 1} skipped due to missing SentimentText.")
            continue

        text = row["SentimentText"].strip()

        try:
            zero_shot_result = zero_shot_classifier(
                text,
                candidate_labels=["complaint", "not a complaint"]
            )
        except Exception as e:
            print("Error during zero-shot classification:", e)
            continue

        top_label = zero_shot_result["labels"][0]
        if top_label != "complaint":
            continue  

        complaint_score = zero_shot_result["scores"][0]
        if complaint_score < COMPLAINT_THRESHOLD:
            continue  
    
        complaint_data = {
            "tweet_id": str(row["Item ID"]),
            "date": "N/A",            
            "content": text,
            "username": "N/A",        
            "url": "N/A",             
            "complaint_score": complaint_score,
            "sentiment": row["Sentiment"]  
        }

        print(f"\n🔹 Processing complaint {index + 1}/{len(df)}")
        retries = 3
        for attempt in range(retries):
            details = classify_complaint_via_groq(complaint_data)
            if details:
                details["referenceNumber"] = str(uuid.uuid4())

                details["content_platform_details"] = {
                    "tweet_id": complaint_data["tweet_id"],
                    "date": complaint_data["date"],
                    "content": complaint_data["content"],
                    "username": complaint_data["username"],
                    "url": complaint_data["url"]
                }
                results.append(details)
                break
            else:
                print(f"⚠️ Attempt {attempt + 1} failed. Retrying in 2 seconds...")
                time.sleep(2)

    with open(output_json, "w", encoding="utf-8") as file:
        json.dump(results, file, indent=4)
    print(f"\n✅ Complaints successfully classified and saved in {output_json}")


    for complaint in results:
        collection.update_one(
            {"referenceNumber": complaint["referenceNumber"]},
            {"$set": complaint},
            upsert=True
        )

    print(f"\n🎯 Process completed! Inserted {len(results)} complaints into MongoDB.")


print("Please upload your CSV file (ensure it has columns: Item ID, Sentiment, SentimentText)")
uploaded_files = files.upload()
if not uploaded_files:
    raise Exception("No file uploaded. Please upload the CSV file and try again.")

input_csv_filename = list(uploaded_files.keys())[0]


output_json_filename = "classified_complaints.json"

# Step 3: Process the CSV file
process_csv(input_csv_filename, output_json_filename)

# Optionally, download the output JSON file back to your local machine
files.download(output_json_filename)
