import { getBucket } from '@extend-chrome/storage'
import { KeyConfig } from '../component/data.ts'

const bucket = getBucket<KeyConfig>('key-config-bucket')

export async function storeKeyConfig(keyConfig: KeyConfig) {
  await bucket.set(keyConfig)
}

export async function restoreKeyConfig(): Promise<KeyConfig> {
  const keys = await bucket.getKeys()
  return keys.length !== 0
    ? await bucket.get()
    : {
        key: 'b',
        code: 'KeyB',
        ctrl: true,
        shift: false,
        alt: false,
        meta: false,
      }
}
