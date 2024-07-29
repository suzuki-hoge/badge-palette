import { getBucket } from '@extend-chrome/storage'
import { Message } from '../component/data.ts'

const bucket = getBucket<{ values: Message[] }>('message-bucket')

export async function storeMessages(messages: Message[]) {
  await bucket.set({ values: messages })
}

export async function restoreMessages(): Promise<Message[]> {
  return await bucket.get('values').then((object) => object.values)
}
