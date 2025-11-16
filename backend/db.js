import mysql from "mysql2";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database!");
    connection.release();
  }
});

// Optional: listen for pool errors (e.g., disconnects)
db.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was lost. Attempting to reconnect...');
    // No need for manual reconnect with pool, but you can log or alert here.
  }
});

export default db.promise();
