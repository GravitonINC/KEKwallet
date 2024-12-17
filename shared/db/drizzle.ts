import { createConnection } from './cloud-sql'
import { MySql2Database, drizzle } from 'drizzle-orm/mysql2'
import * as schema from './schema'

let db: MySql2Database<typeof schema> | null = null

export async function getDb(): Promise<MySql2Database<typeof schema>> {
  if (!db) {
    const connection = await createConnection()
    db = drizzle(connection, { schema, mode: 'default' })
  }
  return db
}
