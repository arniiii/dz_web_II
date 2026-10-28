import os
from datetime import date

import pytest
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Base, Movie
from solution import get_all_movies, get_movies_by_director, get_top_rated_movies

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
        session.query(Movie).delete()
        session.commit()
        session.add_all([
            Movie(title="The Shawshank Redemption", director="Frank Darabont", release_date=date(1994, 9, 23), duration=142, genre="Drama", rating=9.3),
            Movie(title="The Godfather", director="Francis Ford Coppola", release_date=date(1972, 3, 24), duration=175, genre="Crime", rating=9.2),
            Movie(title="Gladiator", director="Ridley Scott", release_date=date(2000, 5, 5), duration=155, genre="Action", rating=8.5),
            Movie(title="Alien", director="Ridley Scott", release_date=date(1979, 5, 25), duration=117, genre="Horror", rating=8.4),
        ])
        session.commit()
        yield session
        session.rollback()


def test_get_all_movies(session):
    assert [movie.split(" by ")[0] for movie in get_all_movies(session)] == ["Alien", "Gladiator", "The Godfather", "The Shawshank Redemption"]


def test_get_movies_by_director(session):
    movies = get_movies_by_director(session, "Ridley Scott")
    assert [movie.split(" by ")[0] for movie in movies] == ["Alien", "Gladiator"]


def test_get_top_rated_movies(session):
    movies = get_top_rated_movies(session, 2)
    assert [movie.split(" by ")[0] for movie in movies] == ["The Shawshank Redemption", "The Godfather"]


def test_get_top_rated_movies_handles_empty_limit(session):
    assert get_top_rated_movies(session, 0) == []
