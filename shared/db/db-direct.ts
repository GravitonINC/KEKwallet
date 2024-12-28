// This file provides direct database access for cases where async initialization isn't practical
// Use with caution and prefer getDb() from './drizzle' when possible
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: true,
  },
})

export const db = drizzle(connection)
