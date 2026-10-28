from fastapi import FastAPI, Form

app = FastAPI()

# BEGIN (write your solution here)
@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    return {"username": username, "status": "Login successful"}
# END
