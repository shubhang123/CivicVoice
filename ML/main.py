from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uuid
import pymongo
import json
import re
from groq import Groq

# MongoDB Connection Setup (hardcoded values)
MONGO_URI = "mongodb+srv://nikunj:1234@cluster0.djsjf.mongodb.net/prayatna?retryWrites=true&w=majority"
MONGO_DB = "prayatna"
MONGO_COLLECTION = "complaints"

client = pymongo.MongoClient(MONGO_URI)
db = client[MONGO_DB]
collection = db[MONGO_COLLECTION]

app = FastAPI()

# Pydantic model for incoming request
class ComplaintRequest(BaseModel):
    content: str

def classify_complaint_via_groq(content: str) -> dict:
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
You are an assistant that analyzes public service complaints. The complaint below may come from Reddit, Twitter, Facebook, or has been provided manually. Based on the provided data, identify the correct "content_platform" among [Reddit, Twitter, Facebook, Manual]. Then produce a JSON object with the following keys:

1. "department": Identify the most appropriate local department from the list below.
2. "summary": Provide a concise summary or key phrases of the complaint.
3. "severity": Assess the complaint's priority (Low, Moderate, or High).
4. "location": The location mentioned in the complaint, or "N/A" if not available. Create an object for location with keys "address", "state", "city", and "pincode".
5. "name": The name of the person who complained, or "N/A" if not available.
6. "content_platform": Must be one of [Reddit, Twitter, Facebook, Manual], inferred from the data.

Local Departments:
{local_departments}

Complaint: "{content}"
Sentiment Score: N/A
Only return the JSON object with these keys and values—no markdown formatting or triple backticks.
"""
   
    groq_api_key = "your_groq_api_key_here"
    if not groq_api_key:
        print("Error: GROQ_API_KEY not provided.")
        return None

    groq_client = Groq(api_key=groq_api_key)
    messages = [{"role": "user", "content": prompt}]

    try:
        completion = groq_client.chat.completions.create(
            model="llama3-70b-8192",
            messages=messages,
            temperature=1,
            max_completion_tokens=2048,
            top_p=1,
            stream=True,
            stop=None,
        )
    except Exception as e:
        print("Error calling Groq API:", e)
        return None

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

@app.post("/complaint")
def handle_complaint(request: ComplaintRequest):
    response = classify_complaint_via_groq(request.content)
    if response is None:
        raise HTTPException(status_code=500, detail="Groq classification failed")
    response["referenceNumber"] = str(uuid.uuid4())
    try:
        collection.insert_one(response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to insert into MongoDB: {e}")
   
    if "_id" in response:
        response["_id"] = str(response["_id"])
    
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
