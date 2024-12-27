import { isMobile } from 'react-device-detect'

type RuntimeEnv = 'not-mobile' | 'mobile-not-installed' | 'pwa'

const useDetectRuntimeEnvironment = () => {
  const isStandaloneMode = (global.navigator as any)?.standalone === true

  let envMode: RuntimeEnv = 'pwa'
  if (isMobile === false) {
    envMode = 'not-mobile'
  } else if (isMobile === true && isStandaloneMode === false) {
    envMode = 'mobile-not-installed'
  } else if (isMobile === true && isStandaloneMode === true) {
    envMode = 'pwa'
  }
  // Override environment mode for local desktop testing
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'local') {
    envMode = 'pwa'
  }

  return envMode
}

export { useDetectRuntimeEnvironment }
