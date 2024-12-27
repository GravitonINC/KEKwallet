import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
  regions: ['us-central1'],
}

export default function middleware(request: NextRequest) {
  return NextResponse.next()
}
