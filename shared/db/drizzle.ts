import { createConnection } from './cloud-sql'
import type { MySql2Database } from 'drizzle-orm/mysql2'

let db: MySql2Database | null = null

export async function getDb() {
  if (!db) {
    db = await createConnection()
  }
  return db
}
