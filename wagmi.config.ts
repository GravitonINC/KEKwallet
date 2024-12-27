import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'shared/generated.ts',
  plugins: [
    react({
      useContractRead: true,
      useContractWrite: true,
      useContractEvent: true,
    })
  ]
})
