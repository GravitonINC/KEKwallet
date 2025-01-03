# Database Configuration

## Google Cloud SQL Setup

The KEKwallet application uses Google Cloud SQL for its database infrastructure. This document outlines the setup and configuration process.

### Prerequisites

1. Google Cloud SDK installed
2. Access to Google Cloud project (lordkekwallet-prod)
3. Service account with necessary permissions

### Instance Details

- **Instance Name**: kekwallet-db
- **Connection Name**: lordkekwallet-prod:us-central1:kekwallet-db
- **Region**: us-central1
- **Database Version**: MySQL 8.0
- **Project ID**: lordkekwallet-prod

### Configuration

1. **Database Connection String**
   The application uses a MySQL connection string in the following format:
   ```
   mysql://user:password@lordkekwallet-prod:us-central1:kekwallet-db/kekwallet?ssl=true
   ```
   Where:
   - `user`: Database user
   - `password`: Database password
   - `kekwallet`: Database name

2. **Environment Variables**
   Set the following in your `.env` file:
   ```
   DATABASE_URL=mysql://user:password@lordkekwallet-prod:us-central1:kekwallet-db/kekwallet?ssl=true
   ```

3. **Service Account**
   - Use the provided service account key file for authentication
   - File: `lordkekwallet-prod-e58d5b12b6a1.json`
   - Service account email: lordkekwallet-prod@appspot.gserviceaccount.com

### Development Commands

```bash
# Push schema changes to database
pnpm db:push

# Open database management studio
pnpm db:studio
```

### Schema Management

The database schema is managed using Drizzle ORM and can be found in `shared/db/schema.ts`. The schema includes:

- User management
- Wallet associations
- Push notification subscriptions
- Timestamps for record keeping

### Security Notes

1. Always use SSL for database connections
2. Keep service account keys secure
3. Follow principle of least privilege for database users
4. Regular backup and monitoring recommended

### Deployment

When deploying to production:
1. Ensure proper firewall rules are configured
2. Use production-ready connection pool settings
3. Monitor connection limits and usage
4. Configure automated backups

### Local Development

For local development:
1. Install Google Cloud SQL Auth proxy:
   ```bash
   gcloud components install cloud_sql_proxy
   ```
2. Start the proxy:
   ```bash
   cloud_sql_proxy lordkekwallet-prod:us-central1:kekwallet-db
   ```
3. Use localhost in your connection string when running with the proxy
