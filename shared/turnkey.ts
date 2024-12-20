import { getWebAuthnAttestation, TSignedRequest, TurnkeyClient } from '@turnkey/http'
import { base64UrlEncode, generateRandomBuffer } from './client-utils'
import { createActivityPoller } from '@turnkey/http/dist/async'
import { ApiKeyStamper } from '@turnkey/api-key-stamper'
import axios from 'axios'

export type Registration = {
  subOrganizationId: string
  privateKeyId: string
  publicKey: string
}

export async function proxy<T>(signedRequest: TSignedRequest): Promise<T> {
  const response = await fetch('/api/turnkey/proxy', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signedRequest),
  })
  return await response.json()
}

export const attestUserAndCreateSubOrg = async (args: {
  subOrgName: string
  passKeyIdName: string
}) => {
  const { subOrgName, passKeyIdName } = args
  const challenge = generateRandomBuffer()
  const authenticatorUserId = generateRandomBuffer()

  const attestation = await getWebAuthnAttestation({
    publicKey: {
      attestation: 'none',
      authenticatorSelection: {
        requireResidentKey: true,
        residentKey: 'required',
        userVerification: 'preferred',
      },
      excludeCredentials: [],
      extensions: {
        credProps: true,
      },
      rp: {
        id: global.location?.hostname,
        name: passKeyIdName,
      },
      challenge,
      pubKeyCredParams: [
        {
          type: 'public-key',
          // All algorithms can be found here: https://www.iana.org/assignments/cose/cose.xhtml#algorithms
          // Turnkey only supports ES256 at the moment.
          alg: -7,
        },
      ],
      user: {
        id: authenticatorUserId,
        name: subOrgName,
        displayName: subOrgName,
      },
    },
  })

  // Proxy signed attestation request to backend to create suborg
  const res = await axios.post('/api/turnkey/create-user', {
    subOrgName: subOrgName,
    attestation,
    challenge: base64UrlEncode(challenge),
  })

  return res.data.subOrgId
}

export const importExternalPrivateKey = async (args: {
  subOrgId: string
  privateKeyName: string
  privateKey: string
}) => {
  const { subOrgId, privateKeyName, privateKey } = args

  const turnkeyClient = new TurnkeyClient(
    { baseUrl: process.env.NEXT_PUBLIC_TURNKEY_API_BASE_URL! },
    new ApiKeyStamper({
      apiPublicKey: process.env.TURNKEY_API_PUBLIC_KEY!,
      apiPrivateKey: process.env.TURNKEY_API_PRIVATE_KEY!,
    }),
  )

  const activityPoller = createActivityPoller({
    client: turnkeyClient,
    requestFn: turnkeyClient.createPrivateKeys,
  })

  try {
    // Create a new private key in Turnkey
    const completedActivity = await activityPoller({
      type: 'ACTIVITY_TYPE_CREATE_PRIVATE_KEYS_V2',
      organizationId: subOrgId,
      timestampMs: String(Date.now()),
      parameters: {
        privateKeys: [{
          privateKeyName,
          curve: 'CURVE_SECP256K1',
          addressFormats: ['ADDRESS_FORMAT_ETHEREUM'],
          privateKeyTags: ['imported', 'hyperliquid'],
        }],
      },
    })

    const createdKey = completedActivity.result.createPrivateKeysResultV2?.privateKeys[0]
    if (!createdKey) {
      throw new Error('Failed to import private key: No key created')
    }

    return {
      privateKeyId: createdKey.privateKeyId,
      addresses: createdKey.addresses,
    }
  } catch (error) {
    console.error('Failed to import private key:', error)
    throw new Error('Failed to import private key into EVM wallet')
  }
}
