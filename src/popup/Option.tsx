import { useEffect, useState } from 'react'

import { restoreMessages, storeMessages } from '../store/MessageStore.ts'

import './option.css'
import { FiPlusCircle } from 'react-icons/fi'

import DotMessage from '../component/DotMessage.tsx'
import { Message } from '../component/data.ts'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { TwitterPicker } from 'react-color'

const Option = () => {
  const [value, setValue] = useState('')
  const [color, setColor] = useState('ABB8C3')

  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    restoreMessages().then((messages) => setMessages(messages))
  }, [])

  return (
    <div className={'option-edit-component'}>
      <p>Messages</p>
      <div className={'option-edit-items'}>
        {messages.map((message) => (
          <div key={message.id} className={'option-edit-item'}>
            <DotMessage message={message} />
            <RiDeleteBin2Line
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const newMessages = messages.filter((x) => x.id !== message.id)
                storeMessages(newMessages).then(() => setMessages(newMessages))
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
                const newMessages = [...messages, { id: crypto.randomUUID().split('-')[0], value, label: value, color }]
                storeMessages(newMessages).then(() => setMessages(newMessages))
                setValue('')
                setColor('ABB8C3')
              }
            }}
          />
        </div>

        <input type={'input'} value={value} placeholder={'new message'} onChange={(e) => setValue(e.target.value)} />
        <TwitterPicker
          color={color}
          width={'204px'}
          triangle={'hide'}
          onChange={(color) => setColor(color.hex.replace('#', ''))}
        />
      </div>
    </div>
  )
}
export default Option
