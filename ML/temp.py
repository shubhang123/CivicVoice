import pandas as pd
import requests
import json
import time
import re
import argparse
import pymongo
import praw
from groq import Groq
from dotenv import load_dotenv
import os
import uuid  

load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT"),
    username=os.getenv("REDDIT_USERNAME"),
    password=os.getenv("REDDIT_PASSWORD"),
)

MONGO_URI = "mongodb+srv://nikunj:1234@cluster0.djsjf.mongodb.net/prayatna?retryWrites=true&w=majority&appName=cluster0" # Securely stored in .env
mongo_client = pymongo.MongoClient(MONGO_URI)
db = mongo_client["prayatna"]
collection = db["complaints"]  

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def classify_complaint_via_groq(complaint):
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
You are an assistant that analyzes public service complaints. The complaint below may come from Reddit, Twitter, Facebook, or has been provided manually. Identify the correct "content_platform" among [Reddit, Twitter, Facebook, Manual]. Then produce a JSON object with the following keys:

1. "department": Identify the most appropriate local department from the list below.
2. "summary": Provide a concise summary or key phrases of the complaint.
3. "severity": Assess the complaint's priority (Low, Moderate, or High).
4. "location": The location mentioned in the complaint, or "N/A" if not available.
5. "name": The name of the person who complained, or "N/A" if not available.
6. "content_platform": Must be one of [Reddit, Twitter, Facebook, Manual], inferred from the data.
7. "content_platform_details": Must be a JSON object containing:
    - "post_id": Unique identifier of the Reddit post.
    - "date": Date when the complaint was posted.
    - "content": Full text of the complaint.
    - "username": The Reddit username of the complainant.
    - "subreddit": Name of the subreddit where the complaint was posted.
    - "url": Direct link to the complaint post.
    - "complaint_score": AI-generated sentiment score for severity.

Local Departments:
{local_departments}

Complaint Data:
{json.dumps(complaint, indent=2)}

Only return the JSON object with these keys and values—no markdown formatting or triple backticks.
"""

    messages = [{"role": "user", "content": prompt}]
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=messages,
        temperature=1,
        max_completion_tokens=2048,
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

def reply_to_reddit_post(reference_number, post_details):
    """Replies to the Reddit post with the complaint's reference number and full post details."""
    try:
        reddit_post_id = post_details["post_id"]
        submission = reddit.submission(id=reddit_post_id)

        reply_message = (
            f"Greetings from CivicVoice\n"
            f"✅ Your complaint has been registered!\n\n"
            f"**Reference Number:** {reference_number}\n\n"
            f"📌 **Post Details:**\n"
            f"- **Subreddit:** r/{post_details['subreddit']}\n"
            f"- **Posted by:** u/{post_details['username']}\n"
            f"- **Date:** {post_details['date']}\n"
            f"- **Complaint Score:** {post_details['complaint_score']:.2f}\n"
            f"- **Post URL:** [View Post]({post_details['url']})\n\n"
            "You can track your complaint via our system."
        )
        submission.reply(reply_message)
        print(f"📝 Successfully replied to Reddit post ID: {reddit_post_id}")
    except Exception as e:
        print(f"⚠️ Error replying to Reddit post {post_details.get('post_id')}: {e}")

def reply_with_reference_number(complaints):
    """Replies to each Reddit complaint with its reference number and details."""
    print("\n📢 Sending replies with reference numbers...")
    for complaint in complaints:
        reference_number = complaint.get("referenceNumber", "N/A")
        post_details = complaint.get("content_platform_details")

        if post_details and isinstance(post_details, dict) and "post_id" in post_details and post_details["post_id"] != "N/A":
            reply_to_reddit_post(reference_number, post_details)
        else:
            print("❌ No valid post_id found in content_platform_details for complaint:", complaint)
    print("\n✅ Replies successfully sent!")

def main(input_json, output_json):
    data = load_json(input_json)
    complaints = data if isinstance(data, list) else []

    print("\n🔍 Processing complaints...")
    results = []
    for index, comp in enumerate(complaints):
        print(f"\n🔹 Processing complaint {index + 1}/{len(complaints)}:")
        retries = 3
        for attempt in range(retries):
            details = classify_complaint_via_groq(comp)
            if details:
                details["referenceNumber"] = str(uuid.uuid4())
                results.append(details)
                break
            else:
                print(f"⚠️ Attempt {attempt + 1} failed. Retrying in 2 seconds...")
                time.sleep(2)

    with open(output_json, "w", encoding="utf-8") as file:
        json.dump(results, file, indent=4)

    print(f"\n✅ Complaints successfully classified and saved in {output_json}")

    collection.insert_many(results)
    print(f"\n🎯 Process completed! Inserted {len(results)} documents into MongoDB.")

    reply_with_reference_number(results)

def load_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process Reddit complaints from a JSON file and insert into MongoDB")
    parser.add_argument("input_json", help="Path to input JSON file")
    parser.add_argument("output_json", help="Path to output JSON file")
    args = parser.parse_args()
    main(args.input_json, args.output_json)
