from fastapi import FastAPI, status
from pydantic import BaseModel, ConfigDict, Field


app = FastAPI()

# Временная база данных
product_list = []
product_id_counter = 1

# BEGIN (write your solution here)
class ProductSpecifications(BaseModel):
    size: str
    color: str
    material: str


class Product(BaseModel):
    name: str
    price: float = Field(gt=0)
    specifications: ProductSpecifications


@app.post("/product", status_code=status.HTTP_201_CREATED)
def add_product(product: Product):
    global product_id_counter
    saved = {"id": product_id_counter, **product.model_dump()}
    product_id_counter += 1
    product_list.append(saved)
    return {"message": "Product added successfully", "product": saved}


@app.get("/products")
def get_products():
    return {"products": product_list}
# END
