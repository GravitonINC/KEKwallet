import { Hyperliquid } from 'hyperliquid';
import { HyperliquidAgentConfig } from '../types/hyperliquid';

export class HyperliquidService {
  private client: Hyperliquid;

  /**
   * Creates a new HyperliquidService instance.
   * SDK automatically selects the appropriate endpoint:
   * - Production: https://api.hyperliquid.xyz
   * - Testnet: https://api.hyperliquid-testnet.xyz
   */
  constructor(config: HyperliquidAgentConfig) {
    this.client = new Hyperliquid(
      config.agentPrivateKey,
      config.isTestnet ?? false,
      config.walletAddress
    );
  }

  async connect() {
    await this.client.connect();
  }
}
