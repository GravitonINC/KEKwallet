import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { getDb } from '../../../shared/db/drizzle'
import { hyperliquidAgentWallets, type HyperliquidAgentWallet } from '../../../shared/db/schema'
import { eq } from 'drizzle-orm'
import { InferModel } from 'drizzle-orm'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ wallets: HyperliquidAgentWallet[] } | { message: string }>
) {
  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const db = await getDb()

  if (req.method === 'GET') {
    const wallets = await db
      .select({
        id: hyperliquidAgentWallets.id,
        user_id: hyperliquidAgentWallets.user_id,
        wallet_address: hyperliquidAgentWallets.wallet_address,
        wallet_name: hyperliquidAgentWallets.wallet_name,
        created_at: hyperliquidAgentWallets.created_at,
        updated_at: hyperliquidAgentWallets.updated_at,
      })
      .from(hyperliquidAgentWallets)
      .where(eq(hyperliquidAgentWallets.user_id, userId))
    return res.status(200).json({ wallets })
  }

  if (req.method === 'POST') {
    const { wallet_address, wallet_name } = req.body

    // Check wallet limit (max 4 per user)
    const existingWallets = await db
      .select({
        id: hyperliquidAgentWallets.id,
      })
      .from(hyperliquidAgentWallets)
      .where(eq(hyperliquidAgentWallets.user_id, userId))

    if (existingWallets.length >= 4) {
      return res.status(400).json({ message: 'Maximum wallet limit reached' })
    }

    // Validate wallet_address format
    if (!wallet_address || typeof wallet_address !== 'string' || wallet_address.length > 191) {
      return res.status(400).json({ message: 'Invalid wallet address' })
    }

    const now = new Date()
    await db.insert(hyperliquidAgentWallets).values({
      id: crypto.randomUUID(),
      user_id: userId,
      wallet_address,
      wallet_name: wallet_name || null,
      created_at: now,
      updated_at: now,
    })

    return res.status(201).json({ message: 'Wallet added successfully' })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
