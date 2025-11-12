import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool(process.env.DB_URL);

pool.getConnection()
  .then((conn) => {
    console.log("Connected to MySQL database!");
    conn.release(); // release connection back to pool
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

export default pool;
