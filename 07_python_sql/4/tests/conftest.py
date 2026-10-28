import os

import psycopg
import pytest

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://python_sql_user:python_sql_password@127.0.0.1:5432/python_sql_db")


@pytest.fixture(scope="session")
def db_connection():
    conn = psycopg.connect(DATABASE_URL)
    yield conn
    conn.close()


@pytest.fixture(scope="session", autouse=True)
def setup_database(db_connection):
    with db_connection.cursor() as cur:
        with open("init.sql", encoding="utf-8") as file:
            cur.execute(file.read())
    db_connection.commit()


@pytest.fixture
def db_transaction(db_connection):
    db_connection.rollback()
    try:
        yield db_connection
    finally:
        db_connection.rollback()
