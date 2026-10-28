import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "js_sql_user",
  password: "js_sql_password",
  database: "js_sql_db",
  port: 5432,
};

// BEGIN (write your solution here)
export default async (articles) => {
  if (articles.length === 0) return [];
  const sql = postgres(config);
  try {
    const rows = await sql`INSERT INTO articles ${sql(articles, 'title', 'description')} RETURNING id`;
    return rows.map(({ id }) => id);
  } finally {
    await sql.end();
  }
};
// END
