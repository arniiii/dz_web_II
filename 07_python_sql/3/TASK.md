# Параметризованные запросы

## Подготовка

Выполните `uv sync`, затем запускайте тесты командой `uv run pytest` или `make test`.

Таблица `products` использует `id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY` и поля `name`, `price`, `quantity`.

## src/solution.py

Реализуйте:

- `batch_insert(conn, products)` — массово добавляет список словарей с ключами `name`, `price`, `quantity`.
- `get_all_products(conn)` — возвращает товары, отсортированные по цене `DESC`.

```python
products = [
    {"name": "milk", "price": 12, "quantity": 20},
    {"name": "bread", "price": 3, "quantity": 10},
    {"name": "orange", "price": 6, "quantity": 5},
]
```

## Подсказки

- В Psycopg 3 массовая вставка выполняется методом `cur.executemany(sql, params_seq)`.
- Подготовьте последовательность кортежей параметров из словарей.
- Используйте `%s` для каждого значения и не собирайте SQL форматированием строк.
- Курсор открывайте через `with conn.cursor() as cur:`; соединение не закрывайте.
