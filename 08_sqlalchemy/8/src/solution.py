from sqlalchemy import select
from sqlalchemy.orm import selectinload

from models import Movie


# BEGIN (write your solution here)
async def get_all_movies(session):
    query = select(Movie).options(selectinload(Movie.director)).order_by(Movie.id)
    result = await session.scalars(query)
    return [
        f"{movie.title} by {movie.director.name}, released on {movie.release_date}, "
        f"duration: {movie.duration} min, genre: {movie.genre}, rating: {movie.rating}"
        for movie in result.all()
    ]
# END

