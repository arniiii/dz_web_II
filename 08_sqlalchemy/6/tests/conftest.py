import os

os.environ.setdefault(
    "DATABASE_URL",
    "postgresql+psycopg2://sqlalchemy_user:sqlalchemy_password@127.0.0.1:5432/sqlalchemy_db",
)
