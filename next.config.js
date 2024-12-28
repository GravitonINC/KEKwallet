const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: false,
  register: true,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /\/icons\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'icon-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 // 24 hours
          }
        }
      }
    ]
  },
})

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_PUBLIC_DEPLOYMENT_ENV: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },
}

module.exports = withPWA(nextConfig)
