import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  // User internal id (can be different from external auth provider id)
  internal_id: varchar('internal_id', { length: 191 }).primaryKey().notNull(),
  // Clerk user id
  external_auth_provider_user_id: varchar('external_auth_provider_user_id', {
    length: 191,
  }).notNull(),
  // Turnkey data to identify wallet with user
  turnkey_suborg: varchar('turnkey_suborg', { length: 191 }),
  turnkey_user_id: varchar('turnkey_user_id', { length: 191 }),
  turnkey_private_key_id: varchar('turnkey_private_key_id', { length: 191 }),
  turnkey_private_key_public_address: varchar(
    'turnkey_private_key_public_address',
    { length: 191 },
  ),
  turnkey_passkey_name: varchar('turnkey_passkey_name', { length: 191 }),
  // Push notification subscription for PWA
  web_push_subscription: varchar('subscription', { length: 2048 }),
  // Timestamps for record keeping
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

// Define types for database operations
export type User = {
  internal_id: string
  external_auth_provider_user_id: string
  turnkey_suborg: string | null
  turnkey_user_id: string | null
  turnkey_private_key_id: string | null
  turnkey_private_key_public_address: string | null
  turnkey_passkey_name: string | null
  web_push_subscription: string | null
  created_at: Date
  updated_at: Date
}

export type NewUser = Omit<User, 'created_at' | 'updated_at'>
