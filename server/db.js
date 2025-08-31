
import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();
// For local dev, hardcode creds OR read from env
const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "pern_blog",
  password: process.env.PGPASSWORD || "yourpassword",
  port: +(process.env.PGPORT || 5432),
});
export function query(text, params) {
  return pool.query(text, params);
}