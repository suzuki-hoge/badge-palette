import { useEffect, useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'
import CreatableSelect from 'react-select/creatable'
import SelectBase from 'react-select/base'

import './badge-palette.css'
import { Label, Message } from '../component/data.ts'
import DotMessage from '../component/DotMessage.tsx'

interface Props {
  textareaId: string
  left: number
  top: number
  labels: Label[]
  unmount: () => void
}

const BadgePalette = (props: Props) => {
  const [label, setLabel] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('white')
  const url = `https://img.shields.io/badge/${label}-${message}-${color}?style=plastic&logo=${label}&logoColor=white`

  const messages = [
    { id: 'foo', value: 'ask', label: 'ask', color: '8ED1FC' },
    { id: 'foo', value: 'must', label: 'must', color: 'EB144C' },
  ]

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
    const textarea = document.getElementById(props.textareaId)!! as HTMLTextAreaElement
    const lines = textarea.value.split('\n')

    if (lines[0].startsWith('![](https://img.shields.io/badge')) {
      lines[0] = `![](${url})`
    } else {
      lines.unshift(`![](${url})`)
    }

    textarea.value = lines.join('\n')
  }, [props.textareaId, url])

  const labelRef = useRef<SelectBase<Label>>(null)
  useEffect(() => {
    if (labelRef.current) labelRef.current.focus()
  }, [labelRef])

  const messageRef = useRef<SelectBase<Message>>(null)

  return (
    <div
      className={'badge-palette-component'}
      style={{ position: 'absolute', left: `${props.left}px`, top: `${props.top}px` }}
      onKeyDown={(e) => {
        if (e.code === 'Escape') {
          props.unmount()
          e.preventDefault()
        }
      }}
    >
      <div className={'badge-palette-input'}>
        <CreatableSelect
          options={props.labels}
          onChange={(label) => {
            setLabel(label?.value || '')
            messageRef.current!.focus()
          }}
          formatCreateLabel={(input) => `${input} ( no logo )`}
          ref={labelRef}
        />
        <CreatableSelect
          options={messages}
          onChange={(message) => {
            setMessage(message?.value || '')
            setColor(message?.color || 'white')
          }}
          formatCreateLabel={(input) => input}
          formatOptionLabel={(input) => <DotMessage message={input} />}
          ref={messageRef}
        />
        <TwitterPicker
          color={color}
          width={'385px'}
          triangle={'hide'}
          styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
          onChange={(color) => setColor(color.hex.replace('#', ''))}
        />
      </div>
    </div>
  )
}

export default BadgePalette
