
import pandas as pd
import requests
import json
import time  # To add retry delay if needed
from transformers import pipeline
from groq import Groq
import json
import re

# Cell 3: Define a list of sample complaints (as plain text)
complaints = [
    "IDFC bank is a fraud\nFor last 3 months i am chasing and calling customer service of idfc to foreclose one of loans i took and paid 2 years ago. Everytine they say due to technical issue they are not able to close my account and will do it in 15 days.\n\nis there anything i can do?",
    "Driving license\nCan someone tell me how much they spend to make their driving license. Do we have to bribe the officers also to complete the process, how much they generally take? And how many months it take to finally get the license?",
    "Hairfall Treatment in Ranchi – Need Genuine Suggestions!\nHey fellow Ranchiites,\n\nI’ve been struggling with hair fall for quite some time now. Took treatment from **Dr. Batra's for 2 years**, spent **₹80K**, followed everything they suggested, but **zero results**. Now it seems like I’ll have to go for **PRP or GFC treatments**, but I want to make sure I choose a genuine place this time.\n\nI’ve heard about **Dr. Paul’s Clinic and Density Hair**, but not sure how effective they are. I am very skeptical about wasting more money and want **real results** this time. If anyone has gone through **PRP/GFC treatment in Ranchi**, please share your experience and recommendations.\n\nAlso, for those considering **Dr. Batra's – AVOID THEM**! They are just **money-minded fraudsters**. They kept saying my hair fall was **due to stress** and never admitted that their treatment/medicines weren’t working. Now they are pushing me to go for **XOGEN**, claiming it will give the \"best results.\" But after their **STEM and GROW Hair** treatments made my condition worse, I am done trusting them.\n\nLooking for **genuine advice** from people who have actually got PRP or GFC done in Ranchi. Would really appreciate your help! 🙏\n\n\\#Ranchi #Hairfall #PRP #GFC #AvoidDrBatras",

]
# Cell 4: Identify complaints using Zero-Shot Classification

# Initialize the zero-shot classification pipeline using a model like facebook/bart-large-mnli
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Define candidate labels for the text
candidate_labels = ["complaint", "compliment", "suggestion"]

# Set a threshold for a text to be considered a complaint (adjust as needed)
COMPLAINT_THRESHOLD = 0.5

filtered_complaints = []
for text in complaints:
    # Classify the text into the candidate labels
    result = classifier(text, candidate_labels)
    # Extract the score corresponding to the "complaint" label
    complaint_score = result["scores"][result["labels"].index("complaint")]
    print(f"Text: {text}\nCandidate Scores: {result['scores']}\n")
    if complaint_score >= COMPLAINT_THRESHOLD:
        filtered_complaints.append({
            "text": text,
            "complaint_score": complaint_score,
            "classification_result": result
        })
    else:
        print("Skipping text, not classified as a complaint:", text, "\n")

print(f"\nTotal complaints to be processed: {len(filtered_complaints)}")
    # Cell X: Using the groq library for complaint classification



# Initialize the Groq client with the API key as a keyword argument
client = Groq(api_key="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")


def classify_complaint_via_groq(complaint):
    """
    Uses Groq Cloud's LLM via the groq package to classify a complaint.
    The prompt instructs the LLM to extract details such as:
      - "department": The most appropriate local department from the provided list.
      - "summary": A concise summary or key phrases of the complaint.
      - "severity": The complaint's priority (Low, Moderate, or High).
      - "raw": The original complaint text.
      - "location": The location mentioned in the complaint, or "N/A".
      - "name": The name of the person who complained, or "N/A".

    The function streams the response, cleans it of any markdown formatting, and returns the parsed JSON object.
    """
    # Comprehensive list of local departments (no state/central departments, no duplicates)
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
"""
    # Build the prompt using only the local departments list.
    prompt = f"""
You are an assistant that analyzes public service complaints. Given the following complaint, extract and output a JSON object with the following keys:
- "department": Identify the most appropriate local department from the list below.
- "summary": Provide a concise summary or key phrases of the complaint.
- "severity": Assess the complaint's priority (Low, Moderate, or High).
- "raw": The original complaint text.
- "location": The location mentioned in the complaint, or "N/A" if not available.Create a object of location where it has address , state and city and also pincode.
- "name": The name of the person who complained, or "N/A" if not available.

Local Departments:
{local_departments}

Complaint: "{complaint.get('text')}"
Sentiment Score: {complaint.get('sentiment_score')}
Sentiment Label: "{complaint.get('sentiment_label')}"

Return only the JSON object without any markdown formatting (no triple backticks or similar).
"""
    # Create a message for the chat model
    messages = [{"role": "user", "content": prompt}]

    # Call the Groq Cloud API with streaming enabled
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=messages,
        temperature=1,
        max_completion_tokens=2048,
        top_p=1,
        stream=True,
        stop=None,
    )

    # Accumulate the streamed response
    output = ""
    for chunk in completion:
        output += chunk.choices[0].delta.content or ""

    # Clean the output by removing any markdown code fences if present
    output = output.strip()
    output = re.sub(r"^```(json)?\s*", "", output)
    output = re.sub(r"\s*```$", "", output)

    # Try to parse the accumulated text as JSON
    try:
        details = json.loads(output)
        return details
    except Exception as e:
        print("Error parsing output:", e)
        print("Output was:", output)
        return None

# Example usage:
# complaint_dict = {
#     "text": "I have been facing issues with street lighting and potholes in my area.",
#     "sentiment_score": -0.35,
#     "sentiment_label": "Negative"
# }
# details = classify_complaint_via_groq(complaint_dict)
# print(details)
# Cell 6: Process the filtered complaints via Groq Cloud API and collect results


results = []

for index, comp in enumerate(filtered_complaints):
    print(f"\n🔹 Processing complaint {index + 1}/{len(filtered_complaints)}:")
    print(f"📝 Complaint Text: {comp['text']}\n")

    # Retry mechanism for API failures
    retries = 3
    for attempt in range(retries):
        details = classify_complaint_via_groq(comp)

        if details:  # Successful API response
            # Ensure that the raw text is included and supplement any missing info
            details["raw"] = comp["text"]
            details.setdefault("location", "N/A")  # Ensure location exists
            details.setdefault("name", "N/A")        # Ensure name exists
            # Use .get() with a fallback value for sentiment fields
            details["sentiment_label"] = comp.get("sentiment_label", "N/A")
            details["sentiment_score"] = comp.get("sentiment_score", comp.get("complaint_score", "N/A"))

            # Save the result
            results.append(details)

            print(f"✅ API successfully classified complaint {index + 1}:")
            print(f"📌 Department: {details.get('department', 'N/A')}")
            print(f"⚡ Severity: {details.get('severity', 'N/A')}")
            print(f"🔍 Summary: {details.get('summary', 'N/A')}\n")

            break  # Exit retry loop if successful
        else:
            print(f"⚠️ Attempt {attempt + 1} failed. Retrying in 2 seconds...")
            time.sleep(2)  # Wait before retrying

    else:  # Executes if all retries fail
        print(f"❌ Failed to classify complaint {index + 1} after {retries} attempts.\n")

print("\n🎯 Classification complete! Total successful complaints processed:", len(results))


df_results = pd.DataFrame(results)
df_results
