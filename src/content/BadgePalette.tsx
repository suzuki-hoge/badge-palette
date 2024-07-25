import { useEffect, useState } from 'react'
import Select from 'react-select'
import { TwitterPicker } from 'react-color'
import CreatableSelect from 'react-select/creatable'
import './badge-palette.css'

const BadgePalette = () => {
  const [label, setLabel] = useState('github')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('white')
  const url = `https://img.shields.io/badge/${label}-${message}-${color}?style=plastic&logo=${label}&logoColor=white`

  const labels = [
    { value: 'github', label: 'github' },
    { value: 'springboot', label: 'springboot' },
    { value: 'kotlin', label: 'kotlin' },
  ]
  const messages = [
    { value: 'ask', label: 'ask', color: '8ED1FC' },
    { value: 'must', label: 'must', color: 'EB144C' },
  ]

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
    const textarea = document.getElementById('new_comment_field')!! as HTMLTextAreaElement
    const lines = textarea.value.split('\n')

    if (lines[0].startsWith('![](https://img.shields.io/badge')) {
      lines[0] = `![](${url})`
    } else {
      lines.unshift(`![](${url})`)
    }

    textarea.value = lines.join('\n')
  }, [url])

  return (
    <div className={'component'}>
      <div className={'input'}>
        <Select
          className={'input-label'}
          defaultValue={{ value: 'github', label: 'github' }}
          options={labels}
          onChange={(label) => setLabel(label!.value)}
        />
        <CreatableSelect
          className={'input-message'}
          options={messages}
          onChange={(option) => {
            setMessage(option!.value)
            setColor(option!.color)
          }}
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
          formatCreateLabel={(input) => input}
        />
        <TwitterPicker
          className={'input-color'}
          color={color}
          triangle={'hide'}
          styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
          onChange={(color) => setColor(color.hex.replace('#', ''))}
        />
      </div>
    </div>
  )
}

export default BadgePalette
