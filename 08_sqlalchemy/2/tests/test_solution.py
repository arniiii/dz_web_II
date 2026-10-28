import os
import datetime

import pytest
from dotenv import load_dotenv
from sqlalchemy import CheckConstraint, create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker

from solution import Base, Book

load_dotenv()


@pytest.fixture(scope="module")
def engine():
    return create_engine(os.environ["DATABASE_URL"])


@pytest.fixture(scope="module", autouse=True)
def tables(engine):
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)


@pytest.fixture
def session(engine):
    with sessionmaker(engine)() as session:
        yield session
        session.rollback()


def make_book(**kwargs):
    values = dict(title="Test Book", author="Test Author", published_date=datetime.date(2021, 1, 1), pages=100, genre="Fiction", rating=4.5)
    values.update(kwargs)
    return Book(**values)


def test_book_schema():
    columns = Book.__table__.c
    assert columns.title.type.length == 256
    assert columns.author.type.length == 128
    assert columns.genre.type.length == 64
    assert columns.title.unique is True
    assert any(isinstance(constraint, CheckConstraint) for constraint in Book.__table__.constraints)


def test_book_constraints(session):
    session.add(make_book(title="Unique Title"))
    session.commit()

    session.add(make_book(title="Unique Title", author="Another Author"))
    with pytest.raises(IntegrityError):
        session.commit()
    session.rollback()

    session.add(make_book(title="Valid Title", rating=11))
    with pytest.raises(IntegrityError):
        session.commit()

