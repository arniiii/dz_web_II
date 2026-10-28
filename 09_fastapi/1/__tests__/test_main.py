import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


def test_get_items():
    response = client.get("/items")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "name": "Item 1"},
        {"id": 2, "name": "Item 2"},
        {"id": 3, "name": "Item 3"},
    ]
