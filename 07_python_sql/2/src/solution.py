import psycopg


conn = psycopg.connect(
    host="127.0.0.1",
    port=5432,
    user="python_sql_user",
    password="python_sql_password",
    dbname="python_sql_db",
)


# BEGIN (write your solution here)
def make_cars_table(conn):
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE cars (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                brand VARCHAR(255),
                model VARCHAR(255)
            )
        """)


def populate_cars_table(conn, cars):
    with conn.cursor() as cur:
        cur.executemany("INSERT INTO cars (brand, model) VALUES (%s, %s)", cars)


def get_all_cars(conn):
    with conn.cursor() as cur:
        cur.execute("SELECT id, brand, model FROM cars ORDER BY brand, id")
        return cur.fetchall()
# END
