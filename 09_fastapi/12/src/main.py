from fastapi import FastAPI

app = FastAPI()

# Временная база данных
product_list = []
product_id_counter = 1

# BEGIN (write your solution here)
from fastapi import HTTPException
from pydantic import BaseModel, Field

class ProductSpecifications(BaseModel):
    size: str
    color: str
    material: str


class Product(BaseModel):
    name: str
    price: float = Field(gt=0)
    specifications: ProductSpecifications


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float


class ProductDetailResponse(ProductResponse):
    specifications: ProductSpecifications


@app.post("/product", status_code=201, response_model=ProductDetailResponse)
def add_product(product: Product):
    global product_id_counter
    saved = {"id": product_id_counter, **product.model_dump()}
    product_id_counter += 1
    product_list.append(saved)
    return saved


@app.get("/products", response_model=list[ProductResponse])
def get_products():
    return product_list


@app.get("/product/{product_id}", response_model=ProductDetailResponse)
def get_product(product_id: int):
    for product in product_list:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")
# END
