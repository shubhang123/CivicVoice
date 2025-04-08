import os
import certifi
import json
import time
import pandas as pd
import praw
import subprocess
from transformers import pipeline
from dotenv import load_dotenv


load_dotenv()

os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()


zero_shot_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=0
)
COMPLAINT_THRESHOLD = 0.80  

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
    "complaintsIndia",
    "india", "IndiaSpeaks", "IndianPolitics", "LegalAdviceIndia", "AskIndia", "modi",
    # "Delhi", "Mumbai", "Indore", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    # "Nagpur", "Surat", "Jaipur", "Lucknow", "Kanpur", "Patna", "Bhopal", "Ranchi", "Varanasi",
    # "indianworkplace", "indian_Academia"
]

# Output file to store complaints
output_file = "complaints_output.json"

##############################
# Function to Scrape Reddit Posts
##############################
def get_reddit_posts(max_posts=10):
    """
    Fetch the top Reddit posts from specified Indian subreddits.
    - Uses top() instead of new().
    - Adds a short delay between posts to prevent rate-limiting.
    - We pass all posts to zero-shot classification (no keyword filtering).
    """
    posts = []
    for subreddit in indian_subreddits:
        print(f"Scraping top posts from r/{subreddit}...")
        try:
            for submission in reddit.subreddit(subreddit).top(limit=max_posts):
                time.sleep(1)  # Delay after processing each post
                post_text = submission.title.strip()
                if submission.selftext:
                    post_text += "\n" + submission.selftext.strip()

                posts.append({
                    "post_id": submission.id,
                    "date": str(pd.to_datetime(submission.created_utc, unit="s")),
                    "content": post_text,
                    "username": submission.author.name if submission.author else "N/A",
                    "subreddit": subreddit,
                    "url": submission.url,
                    "content_platform": "Reddit" 
                })

                if len(posts) >= max_posts:
                    break
        except Exception as e:
            print(f"Skipping r/{subreddit} due to error: {e}")
            continue
    return posts

def job():
    print("\nRunning live Reddit scraping and classification job...")
    reddit_posts = get_reddit_posts(max_posts=10)
    print(f"Found {len(reddit_posts)} posts total.")

    complaints_list = []
    for post in reddit_posts:
        post_text = post.get("content", "").strip()
        if not post_text:
            continue
        try:
            zero_shot_result = zero_shot_classifier(
                post_text,
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

        post_details = {
            "post_id": post.get("post_id"),
            "date": post.get("date"),
            "content": post_text,
            "username": post.get("username"),
            "subreddit": post.get("subreddit"),
            "url": post.get("url"),
            "complaint_score": complaint_score,
            "content_platform": post.get("content_platform", "Reddit")
        }
        complaints_list.append(post_details)

    
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(complaints_list, f, ensure_ascii=False, indent=2)
    print(f"Complaints saved to {output_file}")
    print("\n🔄 Triggering complaint classification with temp.py...")
    subprocess.run(["python", "temp.py", "complaints_output.json", "classified_complaints.json"], check=True)
    print("✅ Classification process completed.")


if __name__ == "__main__":
    while True:
        job()
        sleep_time = random.randint(180, 300)
        print(f"Sleeping for {sleep_time} seconds before the next run...\n")
        time.sleep(sleep_time)