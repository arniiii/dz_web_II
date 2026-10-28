import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_valid_api_key():
    response = client.get("/validate-api-key", headers={"X-API-Key": "1234567890abcdef1234567890abcdef"})
    assert response.status_code == 200
    assert response.json() == {"message": "Access granted"}

def test_invalid_api_key_format():
    response = client.get("/validate-api-key", headers={"X-API-Key": "invalid_api_key"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid API Key format"}

def test_missing_api_key():
    response = client.get("/validate-api-key")
    assert response.status_code == 422  # FastAPI автоматически обрабатывает отсутствие заголовка
