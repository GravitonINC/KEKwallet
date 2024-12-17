import { Hyperliquid } from 'hyperliquid';
import { HyperliquidAgentConfig } from '../types/hyperliquid';

export class HyperliquidService {
  private client: Hyperliquid;

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
