import { useEffect, useState } from 'react'

import { restoreMessages } from '../store/MessageStore.ts'

import { Message } from '../component/data.ts'
import Edit from './Edit.tsx'
import BulkEdit from './BulkEdit.tsx'

const Option = () => {
  const [isBulk, setIsBulk] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    restoreMessages().then((messages) => setMessages(messages))
  }, [])

  return isBulk ? (
    <BulkEdit messages={messages} setMessages={setMessages} setIsBulk={setIsBulk} />
  ) : (
    <Edit messages={messages} setMessages={setMessages} setIsBulk={setIsBulk} />
  )
}
export default Option
