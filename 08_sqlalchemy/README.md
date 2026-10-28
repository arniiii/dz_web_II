# SQLAlchemy: практические задания

## PostgreSQL в Docker

Тесты используют отдельный контейнер и базу `sqlalchemy_db` на стандартном порту PostgreSQL `5432`; они не подключаются к обычной локальной базе PostgreSQL.

```bash
docker run --name postgres-sqlalchemy-tasks \
  -e POSTGRES_USER=sqlalchemy_user \
  -e POSTGRES_PASSWORD=sqlalchemy_password \
  -e POSTGRES_DB=sqlalchemy_db \
  -p 5432:5432 \
  -d postgres:16
```

Дождитесь готовности базы:

```bash
docker exec -it postgres-sqlalchemy-tasks pg_isready -U sqlalchemy_user -d sqlalchemy_db
```

Остановить и удалить контейнер:

```bash
docker stop postgres-sqlalchemy-tasks
docker rm postgres-sqlalchemy-tasks
```

По умолчанию тесты используют URL `postgresql+psycopg2://sqlalchemy_user:sqlalchemy_password@127.0.0.1:5432/sqlalchemy_db`. Чтобы указать другой **выделенный тестовый** экземпляр, задайте `SQLALCHEMY_TASKS_DATABASE_URL`. Не направляйте эту переменную на рабочую базу: тесты пересоздают учебные таблицы.

## Запуск

Перейдите в каталог задания, например:

```bash
cd sqlalchemy-tasks/1
uv sync
uv run pytest
```

Также доступна команда `make test`. Набор использует Python 3.11+ и SQLAlchemy 2.x.

