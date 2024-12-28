import Image from 'next/image'
import React from 'react'

export const HyperliquidLogo: React.FC = () => {
  return (
    <Image
      src="/images/hl-logo-dark.png"
      alt="Hyperliquid"
      width={120}
      height={24}
      className="inline-block align-middle"
    />
  )
}
