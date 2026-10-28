# Стандартный workflow

## Подготовка

Выполните `uv sync`, затем запускайте тесты командой `uv run pytest` или `make test`. Параметры PostgreSQL описаны в корневом `README.md`.

В базе уже подготовлена таблица `movies`:

- `id` — автоматически генерируемый первичный ключ (`GENERATED ALWAYS AS IDENTITY`)
- `title` — название фильма
- `release_year` — год выпуска
- `duration` — длительность в минутах

## src/solution.py

Напишите `add_movies(conn)`, которая добавляет:

- `Godfather`, 1972 год, 175 минут
- `The Green Mile`, 1999 год, 189 минут

Напишите `get_all_movies(conn)`, которая возвращает все строки таблицы `movies` в виде списка кортежей.

```python
import psycopg

conn = psycopg.connect("...")
add_movies(conn)
get_all_movies(conn)
# [(1, "Godfather", 1972, 175),
#  (2, "The Green Mile", 1999, 189)]
```

## Подсказки

- Открывайте курсор через `with conn.cursor() as cur:`: контекст закрывает курсор, но не соединение.
- Передавайте значения отдельно от SQL через плейсхолдеры `%s`, в том числе числа.
- Завершение транзакции — ответственность владельца соединения; функции не должны закрывать переданный `conn`.
