import pytest
from fastapi.testclient import TestClient

import src.main as main

client = TestClient(main.app)


@pytest.fixture(autouse=True)
def reset_product_list():
    main.product_list.clear()
    main.product_id_counter = 1


def create_product(name: str, price: float) -> dict:
    response = client.post(
        "/products",
        json={
            "name": name,
            "price": price,
            "specifications": {"size": "M", "color": "Red", "material": "Cotton"},
        },
    )
    assert response.status_code == 201
    return response.json()


def test_create_product_returns_complete_response():
    product = create_product("T-Shirt", 29.99)
    assert product["id"] == 1
    assert product["specifications"]["material"] == "Cotton"


def test_list_filters_products_and_hides_specifications():
    create_product("T-Shirt", 29.99)
    create_product("Jeans", 49.99)
    response = client.get("/products?min_price=30")
    assert response.status_code == 200
    assert response.json() == [{"id": 2, "name": "Jeans", "price": 49.99}]


def test_patch_updates_only_supplied_fields():
    product = create_product("T-Shirt", 29.99)
    response = client.patch(f"/products/{product['id']}", json={"price": 34.99})
    assert response.status_code == 200
    assert response.json()["name"] == "T-Shirt"
    assert response.json()["price"] == 34.99
    assert response.json()["specifications"]["size"] == "M"


def test_patch_rejects_invalid_data_and_missing_product():
    assert client.patch("/products/1", json={"price": 0}).status_code == 422
    response = client.patch("/products/999", json={"name": "Unknown"})
    assert response.status_code == 404
    assert response.json() == {"detail": "Product not found"}
