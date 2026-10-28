# Контекстные менеджеры

## Подготовка

Выполните `uv sync`, затем запускайте тесты командой `uv run pytest` или `make test`. `init.sql` удаляет старую таблицу `cars`, поэтому каждый запуск начинается с повторяемого состояния.

## src/solution.py

Реализуйте:

- `make_cars_table(conn)` — создаёт таблицу `cars` с полями `id`, `brand`, `model`; `id` должен быть `INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY`.
- `populate_cars_table(conn, cars)` — добавляет список пар `(brand, model)`.
- `get_all_cars(conn)` — возвращает строки, отсортированные по `brand` по возрастанию.

```python
import psycopg

conn = psycopg.connect("...")
make_cars_table(conn)
populate_cars_table(conn, [("kia", "sorento"), ("bmw", "x5")])
get_all_cars(conn)
# [(2, "bmw", "x5"), (1, "kia", "sorento")]
```

## Подсказки

- Используйте контекстный менеджер только для курсора: `with conn.cursor() as cur:`.
- Не используйте `with conn:`: в Psycopg 3 выход из такого блока закрывает соединение.
- Значения передавайте плейсхолдерами `%s`; для набора строк подходит `executemany()`.
- Не закрывайте соединение, полученное аргументом функции.
