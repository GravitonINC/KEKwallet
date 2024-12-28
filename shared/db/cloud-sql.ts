import mysql from 'mysql2/promise'

export async function createConnection() {
  const pool = mysql.createPool({
    host: process.env.CLOUD_SQL_HOST,
    user: process.env.CLOUD_SQL_USER,
    password: process.env.CLOUD_SQL_PASSWORD,
    database: process.env.CLOUD_SQL_DATABASE,
    socketPath: process.env.CLOUD_SQL_CONNECTION_NAME
      ? `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
      : undefined,
  })

  return pool
}
