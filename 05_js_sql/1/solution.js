import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "js_sql_user",
  password: "js_sql_password",
  database: "js_sql_db",
  port: 5432,
};

// BEGIN (write your solution here)
export default async () => {
  const sql = postgres(config);
  try {
    await sql`CREATE TABLE articles (title VARCHAR(255), description VARCHAR(255))`;
    await sql`INSERT INTO articles (title, description) VALUES (${'Первая статья'}, ${'Пример текста'})`;
  } finally {
    await sql.end();
  }
};
// END
