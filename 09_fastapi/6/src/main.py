import re
from fastapi import FastAPI, Header, HTTPException

app = FastAPI()

REGEX_API_KEY = r"^[A-Za-z0-9]{32}$"

# BEGIN (write your solution here)
@app.get("/validate-api-key")
def validate_api_key(x_api_key: str = Header(...)):
    if re.fullmatch(REGEX_API_KEY, x_api_key) is None:
        raise HTTPException(status_code=400, detail="Invalid API Key format")
    return {"message": "Access granted"}
# END
