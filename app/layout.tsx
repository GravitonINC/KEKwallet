import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { headers } from 'next/headers'

import '../globals.css'

const APP_NAME = 'KEK Wallet | A Hyperliquid trading experience'
const APP_DESCRIPTION = 'A Hyperliquid trading experience'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: '%s - KEK Wallet',
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  themeColor: '#FFFFFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/frog.png',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '192x192' }],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Force dynamic rendering to ensure Clerk context is available
  headers();
  
  return (
    <ClerkProvider>
      <html lang="en" dir="ltr">
        <head>
          <style>{`
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `}</style>
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
