import os
import time
import json
import re
import praw
import requests
import pymongo
from dotenv import load_dotenv
from datetime import datetime
from bson.objectid import ObjectId

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://nikunj:1234@cluster0.djsjf.mongodb.net/prayatna?retryWrites=true&w=majority&appName=cluster0")
MONGO_DB = os.getenv("MONGO_DB", "prayatna")
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION", "complaints")

client = pymongo.MongoClient(MONGO_URI)
db = client[MONGO_DB]
collection = db[MONGO_COLLECTION]

REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
REDDIT_USER_AGENT = os.getenv("REDDIT_USER_AGENT")

if not all([REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT]):
    raise ValueError("Reddit API credentials are missing. Check your .env file.")


reddit = praw.Reddit(
    client_id=REDDIT_CLIENT_ID,
    client_secret=REDDIT_CLIENT_SECRET,
    user_agent=REDDIT_USER_AGENT,
    check_for_async=False
)


indian_subreddits = [
    "complaintsIndia", "india", "IndiaSpeaks", "IndianPolitics",
    "LegalAdviceIndia", "AskIndia", "modi"
]

def ollama_classify(text):
    """
    Uses Ollama's API to classify text as 'complaint' or 'noncomplaint'.
    """
    prompt = (
        f"You are a classifier that must decide if the following text is a complaint or noncomplaint. "
        f"Return only one word: either 'complaint' or 'noncomplaint'. "
        f"Do not include any extra text, explanations, or formatting.\n"
        f"Text: {text}"
    )

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"prompt": prompt, "model": "llama3.2:1b", "stream": False},
            timeout=30
        )
        response.raise_for_status()

        
        response_data = response.json()
        raw_output = response_data.get("response", "").strip()

        
        return raw_output.lower() if raw_output.lower() in {"complaint", "noncomplaint"} else "noncomplaint"

    except requests.RequestException as e:
        print(f"❌ HTTP Error during Ollama classification: {e}")
        return "noncomplaint"

    except json.JSONDecodeError as e:
        print(f"❌ JSON Decode Error: {e}")
        return "noncomplaint"

    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return "noncomplaint"

def get_reddit_posts(max_posts=5):
    """
    Fetches top Reddit posts from specified Indian subreddits.
    """
    posts = []
    for subreddit in indian_subreddits:
        print(f"🔍 Scraping top posts from r/{subreddit}...")
        try:
            for submission in reddit.subreddit(subreddit).top(limit=max_posts):
                time.sleep(1)  # Delay to prevent rate-limiting

                post_text = submission.title.strip()
                if submission.selftext:
                    post_text += "\n" + submission.selftext.strip()

                posts.append({
                    "post_id": submission.id,
                    "date": str(datetime.utcfromtimestamp(submission.created_utc)),
                    "content": post_text,
                    "username": submission.author.name if submission.author else "N/A",
                    "subreddit": subreddit,
                    "url": submission.url,
                    "content_platform": "Reddit"
                })

                # Stop scraping when enough posts are collected
                if len(posts) >= max_posts:
                    break

        except praw.exceptions.RedditAPIException as e:
            print(f"⚠️ Skipping r/{subreddit} due to Reddit API error: {e}")

        except Exception as e:
            print(f"⚠️ Skipping r/{subreddit} due to unexpected error: {e}")

    return posts

def process_complaints_and_store(posts):
    complaints_list = []

    for post in posts:
        post_text = post.get("content", "").strip()
        if not post_text:
            continue

        # Classify using Ollama
        classification_label = ollama_classify(post_text)

        # Log classification results
        print(f"📌 Post Classification: {classification_label} | Content: {post_text[:50]}...")

        # Only process complaints
        if classification_label == "complaint":
            # Ensure unique referenceNumber (if missing, generate a unique one)
            post["referenceNumber"] = post.get("referenceNumber") or str(ObjectId())

            complaints_list.append(post)

    # Save complaints to MongoDB
    if complaints_list:
        try:
            for complaint in complaints_list:
                collection.update_one(
                    {"post_id": complaint["post_id"]},  # Check for existing post
                    {"$set": complaint},  # Update data
                    upsert=True  # Insert if not exists
                )
            print(f"✅ Inserted/Updated {len(complaints_list)} complaints into MongoDB.")

        except pymongo.errors.BulkWriteError as e:
            print(f"❌ MongoDB Bulk Write Error: {e.details}")

    return complaints_list

def job():
    print("\n🚀 Running live Reddit scraping and classification job...")
    reddit_posts = get_reddit_posts(max_posts=5)
    print(f"📌 Found {len(reddit_posts)} posts total.")

    # Process posts and store complaints in MongoDB
    complaints_stored = process_complaints_and_store(reddit_posts)

    if complaints_stored:
        print(f"✅ {len(complaints_stored)} complaints successfully stored in MongoDB.")
    else:
        print("⚠️ No complaints found.")

    print("🔄 Job completed.\n")

# Run the job immediately
if __name__ == "__main__":
    job()
