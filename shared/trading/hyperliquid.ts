import { Hyperliquid } from 'hyperliquid'

export class HyperliquidService {
  private client: Hyperliquid

  constructor(privateKey: string | null = null, testnet: boolean = false) {
    this.client = new Hyperliquid(privateKey, testnet)
  }

  async connect() {
    await this.client.connect()
  }
}
