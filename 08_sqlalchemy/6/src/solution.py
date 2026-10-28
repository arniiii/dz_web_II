from sqlalchemy import select
from sqlalchemy.orm import joinedload

from models import Movie


# BEGIN (write your solution here)
def get_movies_with_directors(session):
    query = select(Movie).options(joinedload(Movie.director)).order_by(Movie.title)
    return session.scalars(query).all()
# END

