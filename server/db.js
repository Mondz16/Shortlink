import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  connectionString: process.env.SUPABASE_CONNECTION,
  ssl: { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => console.log(`Connected to Postgres`))
  .catch((e) => console.error("DB connection failed:", e.message));

export default client;
