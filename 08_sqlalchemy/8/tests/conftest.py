import os

import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool

from models import Base

DATABASE_URL = os.getenv(
    "SQLALCHEMY_TASKS_DATABASE_URL",
    "postgresql+asyncpg://sqlalchemy_user:sqlalchemy_password@127.0.0.1:5432/sqlalchemy_db",
)
engine = create_async_engine(DATABASE_URL, poolclass=NullPool)
Session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


@pytest_asyncio.fixture(scope="module", autouse=True)
async def initialize_database():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.drop_all)
        await connection.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


@pytest_asyncio.fixture
async def async_session():
    async with Session() as session:
        yield session
