from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the actual origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load existing blog posts
with open('blogPosts.json', 'r') as file:
    blogPosts = json.load(file)

# Load existing accounts
with open('login.json', 'r') as file:
    accounts = json.load(file)

class BlogPost(BaseModel):
    title: str
    content: str
    subthread: list = []

@app.get('/posts')
def get_blog_posts():
    return blogPosts

@app.get('/login')
def get_accounts():
    return accounts

@app.post('/newpost')
def create_new_post(post: BlogPost = Body(...)):
    blogPosts.append(post.dict())

    with open('blogPosts.json', 'w') as file:
        json.dump(blogPosts, file, indent=4)

    return 'Post created successfully!'

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
