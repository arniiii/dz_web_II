import psycopg
from psycopg.rows import dict_row


conn = psycopg.connect(
    host="127.0.0.1",
    port=5432,
    user="python_sql_user",
    password="python_sql_password",
    dbname="python_sql_db",
    row_factory=dict_row,
)


# BEGIN (write your solution here)
def create_post(conn, post):
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute(
            "INSERT INTO posts (title, content, author_id) VALUES (%s, %s, %s) RETURNING id",
            (post["title"], post["content"], post["author_id"]),
        )
        return cur.fetchone()["id"]


def add_comment(conn, comment):
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute(
            "INSERT INTO comments (post_id, author_id, content) VALUES (%s, %s, %s) RETURNING id",
            (comment["post_id"], comment["author_id"], comment["content"]),
        )
        return cur.fetchone()["id"]


def get_latest_posts(conn, count):
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("SELECT * FROM posts ORDER BY created_at DESC, id DESC LIMIT %s", (count,))
        posts = cur.fetchall()
        for post in posts:
            cur.execute("SELECT * FROM comments WHERE post_id = %s ORDER BY id", (post["id"],))
            post["comments"] = cur.fetchall()
        return posts
# END
