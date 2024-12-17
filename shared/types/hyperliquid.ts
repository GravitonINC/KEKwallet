/**
 * Hyperliquid API Agent Wallet Configuration
 */
export interface HyperliquidAgentConfig {
  agentPrivateKey: string;
  walletAddress: string;
  isTestnet?: boolean;
}

/**
 * Trading operation options
 */
export interface HyperliquidTradeOptions {
  coin: string;
  isBuy: boolean;
  size: number;
  limitPrice: number;
  reduceOnly?: boolean;
}

/**
 * Order status response
 */
export interface HyperliquidOrderStatus {
  orderId: string;
  status: 'open' | 'filled' | 'cancelled';
  filledSize: number;
  remainingSize: number;
}
