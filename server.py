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

# Load existing tokens
with open('tokens.json', 'r') as file:
    tokens = json.load(file)

class BlogPost(BaseModel):
    title: str
    content: str
    subthread: list = []

class Token(BaseModel):
    userID: str
    time: str
    expire: str

@app.get('/posts')
def get_blog_posts():
    return blogPosts

@app.get('/login')
def get_accounts():
    return accounts

# @app.get('/resister')
# def get_accounts():
#     return accounts

@app.post('/register')
def register_account(account: dict = Body(...)):
    accounts.append(account)

    with open('login.json', 'w') as file:
        json.dump(accounts, file, indent=4)

    return 'Account created successfully!'

@app.get('/tokenGet')
def get_token():
    print(tokens)
    return tokens

@app.post('/token')
def require_token(token: dict = Body(...)):

    #get current time
    import datetime
    now = datetime.datetime.now()
    now = now.strftime('%Y-%m-%d %H:%M:%S')
    
        
    for t in tokens:
        if t['userID'] == token['userID']:
            t['time'] = token['time']
            t['expire'] = token['expire']
            print('Renewed token!')
            return

    # if tokens not empty
    if tokens:
        print('Already logged in!')

    tokens.append(token)
    with open('tokens.json', 'w') as file:
        json.dump(tokens, file, indent=4)
    print('New token created!')
    return 

@app.post('/expiredToken')
def expired_token(token: dict = Body(...)):
    for t in tokens:
        if t['userID'] == token['userID']:
            tokens.remove(t)
            print('Token removed!')
            break

@app.post('/newpost')
def create_new_post(post: BlogPost = Body(...)):
    blogPosts.append(post.dict())

    with open('blogPosts.json', 'w') as file:
        json.dump(blogPosts, file, indent=4)

    return 'Post created successfully!'

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
