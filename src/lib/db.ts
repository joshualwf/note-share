import { Pool } from "pg";

// Load environment variables
const pool = new Pool({
  user: process.env.PG_USER || "myuser",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DB || "mydatabase",
  password: process.env.PG_PASSWORD || "mypassword",
  port: Number(process.env.PG_PORT) || 5432,
});

// Function to query the database
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
};

export default pool;
