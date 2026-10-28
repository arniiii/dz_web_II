import psycopg


conn = psycopg.connect(
    host="127.0.0.1",
    port=5432,
    user="python_sql_user",
    password="python_sql_password",
    dbname="python_sql_db",
)


# BEGIN (write your solution here)
def batch_insert(conn, products):
    rows = [(product["name"], product["price"], product["quantity"]) for product in products]
    with conn.cursor() as cur:
        cur.executemany("INSERT INTO products (name, price, quantity) VALUES (%s, %s, %s)", rows)


def get_all_products(conn):
    with conn.cursor() as cur:
        cur.execute("SELECT id, name, price, quantity FROM products ORDER BY price DESC, id")
        return cur.fetchall()
# END
