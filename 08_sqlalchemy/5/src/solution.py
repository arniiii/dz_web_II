from sqlalchemy import select

from models import Director, Movie


# BEGIN (write your solution here)
def get_movies_with_directors(session):
    query = select(Movie, Director.name).join(Director).order_by(Movie.title)
    return [
        f"{movie.title} by {name}, released on {movie.release_date}, "
        f"duration: {movie.duration} min, genre: {movie.genre}, rating: {movie.rating}"
        for movie, name in session.execute(query)
    ]
# END

