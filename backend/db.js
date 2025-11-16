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

// Log connection success or failure
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database!");
    connection.release();
  }
});

// Log pool errors (e.g., connection lost)
db.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was lost. Attempting to reconnect...');
  }
});

const promisePool = db.promise();

// Keep connection alive by pinging every 60 seconds
setInterval(async () => {
  try {
    await promisePool.query('SELECT 1');
  } catch (err) {
    console.error('Ping error:', err);
  }
}, 60000);

export default promisePool;
