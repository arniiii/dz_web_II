# Инструкция

## PostgreSQL в Docker

Запустите контейнер PostgreSQL (порт `5432`):

```bash
docker run --name postgres-python-sql \
  -e POSTGRES_USER=python_sql_user \
  -e POSTGRES_PASSWORD=python_sql_password \
  -e POSTGRES_DB=python_sql_db \
  -p 5432:5432 \
  -d postgres:16
```

Проверка, что контейнер работает:

```bash
docker ps
docker exec -it postgres-python-sql pg_isready -U python_sql_user -d python_sql_db
```

Остановка и удаление контейнера:

```bash
docker stop postgres-python-sql
docker rm postgres-python-sql
```

## Запуск задания

Перейдите в каталог нужного задания, например:

```bash
cd python-sql-tasks/1
```

Установка зависимостей:

```bash
uv sync
```

По умолчанию используется подключение к `127.0.0.1:5432` с параметрами: пользователь `python_sql_user`, пароль `python_sql_password`, база `python_sql_db`.

Проверка кода:

```bash
uv run pytest
```

или:

```bash
make test
```

