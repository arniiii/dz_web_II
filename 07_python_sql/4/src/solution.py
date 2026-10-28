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
def get_order_sum(conn, month):
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("""
            SELECT customers.customer_name, SUM(orders.total_amount) AS total
            FROM customers JOIN orders USING (customer_id)
            WHERE EXTRACT(MONTH FROM orders.order_date) = %s
            GROUP BY customers.customer_id, customers.customer_name
            ORDER BY customers.customer_id
        """, (month,))
        return "\n".join(
            f"Покупатель {row['customer_name']} совершил покупок на сумму {row['total']}"
            for row in cur.fetchall()
        )
# END
