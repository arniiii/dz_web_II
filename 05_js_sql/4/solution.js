import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "js_sql_user",
  password: "js_sql_password",
  database: "js_sql_db",
  port: 5432,
};

// BEGIN (write your solution here)
export default async (user, roomNumber, price) => {
  const sql = postgres(config);
  try {
    await sql.begin(async (transaction) => {
      const [room] = await transaction`SELECT id, status FROM rooms WHERE room_number = ${roomNumber} FOR UPDATE`;
      if (!room || room.status !== 'free') throw new Error('Room is unavailable');
      const [created] = await transaction`
        INSERT INTO users (username, phone) VALUES (${user.username}, ${user.phone}) RETURNING id
      `;
      await transaction`INSERT INTO orders (user_id, room_id, price) VALUES (${created.id}, ${room.id}, ${price})`;
      await transaction`UPDATE rooms SET status = 'reserved' WHERE id = ${room.id}`;
    });
  } finally {
    await sql.end();
  }
};
// END
