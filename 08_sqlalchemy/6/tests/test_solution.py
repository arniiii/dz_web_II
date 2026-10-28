import os
from datetime import date

import pytest
from dotenv import load_dotenv
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker

from models import Base, Director, Movie
from solution import get_movies_with_directors

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
        session.add_all([
            Movie(title="The Shawshank Redemption", release_date=date(1994, 9, 23), duration=142, genre="Drama", rating=9.3, director=Director(name="Frank Darabont")),
            Movie(title="Inception", release_date=date(2010, 7, 16), duration=148, genre="Sci-Fi", rating=8.8, director=Director(name="Christopher Nolan")),
        ])
        session.commit()
        yield session
        session.rollback()


def test_get_movies_with_directors_uses_one_query_and_orders_movies(session, engine):
    query_count = 0

    def count_queries(*_):
        nonlocal query_count
        query_count += 1

    event.listen(engine, "before_cursor_execute", count_queries)
    try:
        result = get_movies_with_directors(session)
        assert [movie.title for movie in result] == ["Inception", "The Shawshank Redemption"]
        assert [movie.director.name for movie in result] == ["Christopher Nolan", "Frank Darabont"]
        assert query_count == 1
    finally:
        event.remove(engine, "before_cursor_execute", count_queries)
