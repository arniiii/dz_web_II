import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_square_positive_number():
    response = client.get("/square?number=4")
    assert response.status_code == 200
    assert response.json() == {"number": 4, "square": 16}

def test_square_negative_number():
    response = client.get("/square?number=-3")
    assert response.status_code == 200
    assert response.json() == {"number": -3, "square": 9}

def test_square_missing_parameter():
    response = client.get("/square")
    assert response.status_code == 200
    assert response.json() == {"number": None, "square": None}
