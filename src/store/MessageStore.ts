import { getBucket } from '@extend-chrome/storage'
import { loadMessages, Message } from '../component/data.ts'

const bucket = getBucket<{ values: Message[] }>('message-bucket')

export async function storeMessages(messages: Message[]) {
  await bucket.set({ values: messages })
}

export async function restoreMessages(): Promise<Message[]> {
  const keys = await bucket.getKeys()
  return keys.includes('values')
    ? await bucket.get('values').then((object) => object.values)
    : loadMessages(`
        b83ab59d:eb144c:must
        a316ae90:f78da7:should
        07600fd1:fcb900:suggest
        9fc06b2b:abb8c3:nits
        c2fef737:7bdcb5:imo
        25d6a61a:ff6900:ask
        2614b25f:00D084:good
        23234714:8ed1fc:tweet
  `)
}
