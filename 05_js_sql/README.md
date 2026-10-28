# Инструкция

## PostgreSQL в Docker

Запустите контейнер PostgreSQL (порт `5432`):

```bash
docker run --name postgres-js-sql \
  -e POSTGRES_USER=js_sql_user \
  -e POSTGRES_PASSWORD=js_sql_password \
  -e POSTGRES_DB=js_sql_db \
  -p 5432:5432 \
  -d postgres:16
```

Проверка, что контейнер работает:

```bash
docker ps
docker exec -it postgres-js-sql pg_isready -U js_sql_user -d js_sql_db
```

Остановка и удаление контейнера:

```bash
docker stop postgres-js-sql
docker rm postgres-js-sql
```

## Запуск задания

Перейдите в каталог нужного задания, например:

```bash
cd js-sql-tasks/1
```

Установка зависимостей:

```bash
npm install
```

По умолчанию используется подключение к `127.0.0.1:5432` с параметрами: пользователь `js_sql_user`, пароль `js_sql_password`, база `js_sql_db`.

Проверка кода:

```bash
npm test -s
```

или:

```bash
make test
```

