import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { storeMessages } from '../store/MessageStore.ts'

import './bulk-edit.css'
import { dumpMessages, loadMessages, Message } from '../component/data.ts'

interface Props {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  setIsBulk: Dispatch<SetStateAction<boolean>>
}

const BulkEdit = (props: Props) => {
  const [lines, setLines] = useState('')

  useEffect(() => {
    setLines(dumpMessages(props.messages))
  }, [props.messages])

  return (
    <div className={'option-bulk-edit-component'}>
      <p>
        Bulk Edit
        <button
          onClick={() => {
            const newMessages = loadMessages(lines)
            storeMessages(newMessages).then(() => props.setMessages(newMessages))
            props.setIsBulk(false)
          }}
        >
          <span>
            Back
            <IoMdArrowRoundBack />
          </span>
        </button>
      </p>
      <textarea value={lines} onChange={(e) => setLines(e.target.value)} />
    </div>
  )
}

export default BulkEdit
