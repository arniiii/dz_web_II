from fastapi import FastAPI

app = FastAPI()

# Временная база данных
product_list = []
product_id_counter = 1

# BEGIN (write your solution here)
from fastapi import HTTPException, Query
from pydantic import BaseModel, Field

class ProductSpecifications(BaseModel):
    size: str
    color: str
    material: str


class ProductCreate(BaseModel):
    name: str
    price: float = Field(gt=0)
    specifications: ProductSpecifications


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float


class ProductDetailResponse(ProductResponse):
    specifications: ProductSpecifications


class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = Field(default=None, gt=0)
    specifications: ProductSpecifications | None = None


@app.post("/products", status_code=201, response_model=ProductDetailResponse)
def add_product(product: ProductCreate):
    global product_id_counter
    saved = {"id": product_id_counter, **product.model_dump()}
    product_id_counter += 1
    product_list.append(saved)
    return saved


@app.get("/products", response_model=list[ProductResponse])
def get_products(min_price: float = Query(0, ge=0)):
    return [product for product in product_list if product["price"] >= min_price]


@app.patch("/products/{product_id}", response_model=ProductDetailResponse)
def update_product(product_id: int, update: ProductUpdate):
    for product in product_list:
        if product["id"] == product_id:
            product.update(update.model_dump(exclude_unset=True, exclude_none=True))
            return product
    raise HTTPException(status_code=404, detail="Product not found")
# END
