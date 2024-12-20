# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.local .

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Start the application
EXPOSE 3000
CMD ["pnpm", "start"]
