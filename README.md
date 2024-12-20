# KEKwallet - Mobile PWA with Embedded Wallet

A mobile-focused Progressive Web Application (PWA) with embedded wallet functionality, push notifications, and secure authentication.

## Features

- Mobile-focused PWA with service worker support
- Push notifications for iOS (>=16.4) and Android
- Embedded non-custodial wallet via mobile passkey (with opt-in iCloud recovery)
- Web2 Auth/Social integration layer
- Support for EVM chains
- Automatic PWA updates with user prompts
- User management with Clerk: social auth (Twitter, Discord), username, or phone number
- Mobile-first design using Tailwind with Konsta UI components

## Set up

### Prerequisites

- Node.js with pnpm package manager
- Google Cloud account with SQL instance
- Clerk account for authentication
- Turnkey account for wallet infrastructure

### Installation

1. Clone the repository:
```sh
git clone https://github.com/GravitonINC/KEKwallet.git
cd KEKwallet
```

2. Install dependencies:
```sh
pnpm i
```

3. Copy `.env.sample` to `.env` and configure the following:

### Configuration

#### Push Notifications

Generate push notification keys:
```sh
pnpm webpush:generate-keys
```

Configure in `.env`:
```
WEB_PUSH_EMAIL=mailto:your-email@domain.com
WEB_PUSH_SUBJECT=your-production-domain
WEB_PUSH_PRIVATE_KEY=generated-private-key
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=generated-public-key
```

#### Wallet (Turnkey)

1. Create a Turnkey Organization and get your Organization ID
2. Configure Turnkey:
```sh
pnpm turnkey:install
pnpm turnkey:create:api-key
pnpm turnkey:create:private-key
```

3. Add to `.env`:
```
TURNKEY_ORGANIZATION_ID=your-org-id
TURNKEY_API_PUBLIC_KEY=generated-public-key
TURNKEY_API_PRIVATE_KEY=generated-private-key
```

#### Database (Google Cloud SQL)

See [Database Documentation](./docs/DATABASE.md) for detailed setup instructions.

1. Configure your database connection string in `.env`:
```
DATABASE_URL=mysql://user:password@instance-connection-name/kekwallet?ssl=true
```

2. Push the database schema:
```sh
pnpm db:push
```

3. Optional: Use database studio for visual management:
```sh
pnpm db:studio
```

#### Authentication (Clerk)

1. Set up a Clerk application
2. Add to `.env`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
CLERK_SECRET_KEY=your-secret-key
```

#### Web3 Configuration

Generate web3 code:
```sh
pnpm web3:codegen
```

If you're using anything on Ethereum, be sure to add your RPC to the .env

#### Hyperliquid Configuration

The application uses Hyperliquid's official API endpoints with built-in rate limiting:
- Mainnet: https://api.hyperliquid.xyz
- Testnet: https://api.hyperliquid-testnet.xyz

Configure the environment using HYPERLIQUID_TESTNET in your .env file.

### Development

Start the development server:
```sh
pnpm dev
```

Access the application at `http://localhost:3000`

### Mobile Testing

Two options for mobile device testing:
1. Use local IP if on same network
2. Use ngrok for secure tunnel:
```sh
ngrok http 3000
```

## Project Structure

- `app/`: Next.js application routes and pages
- `pages/`: Legacy page routes and API endpoints
- `shared/`: Shared utilities and database configuration
- `hooks/`: Custom React hooks
- `worker/`: Service worker implementation

## Technologies

- Next.js 13 (Page and App Router support)
- Turnkey for passkey non-custodial wallets
- Clerk for authentication
- Tailwind CSS with Konsta UI
- Google Cloud SQL for database
- Drizzle ORM
- Viem and Wagmi for Web3
