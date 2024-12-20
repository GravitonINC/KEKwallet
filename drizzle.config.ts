import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

const requireEnv = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export default {
  driver: 'mysql2',
  dbCredentials: {
    host: requireEnv('CLOUD_SQL_HOST'),
    user: requireEnv('CLOUD_SQL_USER'),
    password: requireEnv('CLOUD_SQL_PASSWORD'),
    database: requireEnv('CLOUD_SQL_DATABASE'),
  },
  schema: './shared/db/schema.ts',
  out: './drizzle',
} satisfies Config
