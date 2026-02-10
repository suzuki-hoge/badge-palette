import { Dispatch, SetStateAction, useState } from 'react'

import { storeMessages } from '../store/MessageStore.ts'

import './edit.css'
import { FiPlusCircle } from 'react-icons/fi'

import DotMessage from '../component/DotMessage.tsx'
import { Message } from '../component/data.ts'
import { RiDeleteBin2Line, RiFileEditLine } from 'react-icons/ri'
import ColorSwatches from '../component/ColorSwatches.tsx'

interface Props {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  setIsBulk: Dispatch<SetStateAction<boolean>>
}

const Edit = (props: Props) => {
  const [value, setValue] = useState('')
  const [color, setColor] = useState('ABB8C3')

  return (
    <div className={'option-edit-component'}>
      <p>
        Messages
        <button onClick={() => props.setIsBulk(true)}>
          <span>
            Bulk
            <RiFileEditLine />
          </span>
        </button>
      </p>
      <div className={'option-edit-items'}>
        {props.messages.map((message) => (
          <div key={message.id} className={'option-edit-item'}>
            <DotMessage message={message} />
            <RiDeleteBin2Line
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const newMessages = props.messages.filter((x) => x.id !== message.id)
                storeMessages(newMessages).then(() => props.setMessages(newMessages))
              }}
            />
          </div>
        ))}
      </div>

      <div className={'option-edit-inputs'}>
        <div className={'option-edit-item'}>
          <DotMessage message={{ value, label: value, color }} />
          <FiPlusCircle
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (value.length !== 0) {
                const newMessages = [
                  ...props.messages,
                  { id: crypto.randomUUID().split('-')[0], value, label: value, color },
                ]
                storeMessages(newMessages).then(() => props.setMessages(newMessages))
                setValue('')
                setColor('ABB8C3')
              }
            }}
          />
        </div>

        <input type={'input'} value={value} placeholder={'new message'} onChange={(e) => setValue(e.target.value)} />
        <ColorSwatches
          color={color}
          width={'204px'}
          onChange={(color) => setColor(color)}
        />
      </div>
    </div>
  )
}

export default Edit
