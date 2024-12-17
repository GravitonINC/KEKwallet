import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { getDb } from '@shared/db/drizzle'
import { users, type User, type NewUser } from '@shared/db/schema'
import { eq } from 'drizzle-orm'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: User | null }>,
) {
  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ user: null })
  }

  const db = await getDb()

  // Insert or update user record
  const newUser: NewUser = {
    internal_id: userId,
    external_auth_provider_user_id: userId,
    turnkey_suborg: null,
    turnkey_user_id: null,
    turnkey_private_key_id: null,
    turnkey_private_key_public_address: null,
    turnkey_passkey_name: null,
    web_push_subscription: null,
  }

  // Add timestamps for insert
  await db
    .insert(users)
    .values({
      ...newUser,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .onDuplicateKeyUpdate({
      set: {
        external_auth_provider_user_id: userId,
        updated_at: new Date(),
      },
    })

  // Query user record
  const dbUsers = await db
    .select({
      internal_id: users.internal_id,
      external_auth_provider_user_id: users.external_auth_provider_user_id,
      turnkey_suborg: users.turnkey_suborg,
      turnkey_user_id: users.turnkey_user_id,
      turnkey_private_key_id: users.turnkey_private_key_id,
      turnkey_private_key_public_address: users.turnkey_private_key_public_address,
      turnkey_passkey_name: users.turnkey_passkey_name,
      web_push_subscription: users.web_push_subscription,
      created_at: users.created_at,
      updated_at: users.updated_at,
    })
    .from(users)
    .where(eq(users.external_auth_provider_user_id, userId))

  return res.status(200).json({ user: dbUsers[0] || null })
}
