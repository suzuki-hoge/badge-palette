import { useEffect, useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'
import CreatableSelect from 'react-select/creatable'
import SelectBase from 'react-select/base'

import './badge-palette.css'

export interface Label {
  value: string
  label: string
}

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
    { value: 'ask', label: 'ask', color: '8ED1FC' },
    { value: 'must', label: 'must', color: 'EB144C' },
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

  const ref = useRef<SelectBase<Label>>(null)
  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [ref])

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
          classNamePrefix={'badge-palette-label'}
          options={props.labels}
          onChange={(label) => setLabel(label?.value || '')}
          formatCreateLabel={(input) => `${input} ( no logo )`}
          isClearable
          ref={ref}
        />
        <CreatableSelect
          classNamePrefix={'badge-palette-message'}
          options={messages}
          onChange={(option) => {
            setMessage(option?.value || '')
            setColor(option?.color || '')
          }}
          formatCreateLabel={(input) => input}
          styles={{
            option: (base, { data }) => ({
              ...base,
              ...{
                alignItems: 'center',
                display: 'flex',
                ':before': {
                  backgroundColor: `#${data.color}`,
                  borderRadius: 10,
                  content: '" "',
                  display: 'block',
                  marginRight: 8,
                  height: 10,
                  width: 10,
                },
              },
            }),
          }}
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
