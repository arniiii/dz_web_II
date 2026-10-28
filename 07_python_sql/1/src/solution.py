import psycopg


conn = psycopg.connect(
    host="127.0.0.1",
    port=5432,
    user="python_sql_user",
    password="python_sql_password",
    dbname="python_sql_db",
)


# BEGIN (write your solution here)
def add_movies(conn):
    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO movies (title, release_year, duration) VALUES (%s, %s, %s)",
            [("Godfather", 1972, 175), ("The Green Mile", 1999, 189)],
        )


def get_all_movies(conn):
    with conn.cursor() as cur:
        cur.execute("SELECT id, title, release_year, duration FROM movies ORDER BY id")
        return cur.fetchall()
# END
