import os
from datetime import date

import pytest
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Base, Director, Movie
from solution import delete_director

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
        director = Director(name="Christopher Nolan")
        session.add_all([
            director,
            Movie(title="Inception", release_date=date(2010, 7, 16), duration=148, genre="Sci-Fi", rating=8.8, director=director),
            Movie(title="Interstellar", release_date=date(2014, 11, 7), duration=169, genre="Sci-Fi", rating=8.6, director=director),
        ])
        session.commit()
        yield session
        session.rollback()


def test_delete_director_with_movies(session, engine):
    director_id = session.query(Director.id).scalar()
    assert delete_director(session, director_id) is True

    with sessionmaker(engine)() as check_session:
        assert check_session.query(Director).count() == 0
        assert check_session.query(Movie).count() == 0


def test_delete_non_existent_director_is_a_noop(session):
    assert delete_director(session, 999) is False
    assert session.query(Director).count() == 1
    assert session.query(Movie).count() == 2

