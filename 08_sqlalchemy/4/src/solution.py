from sqlalchemy import select

from models import Movie


# BEGIN (write your solution here)
def format_movie(movie):
    return (
        f"{movie.title} by {movie.director}, released on {movie.release_date}, "
        f"duration: {movie.duration} min, genre: {movie.genre}, rating: {movie.rating}"
    )


def get_all_movies(session):
    movies = session.scalars(select(Movie).order_by(Movie.title)).all()
    return [format_movie(movie) for movie in movies]


def get_movies_by_director(session, director_name):
    query = select(Movie).where(Movie.director == director_name).order_by(Movie.release_date, Movie.id)
    return [format_movie(movie) for movie in session.scalars(query)]


def get_top_rated_movies(session, n):
    query = select(Movie).order_by(Movie.rating.desc(), Movie.id).limit(n)
    return [format_movie(movie) for movie in session.scalars(query)]
# END

