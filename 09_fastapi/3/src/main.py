from fastapi import FastAPI

app = FastAPI()

# BEGIN (write your solution here)
@app.get("/square")
def square(number: int | None = None):
    return {"number": number, "square": number ** 2 if number is not None else None}
# END
