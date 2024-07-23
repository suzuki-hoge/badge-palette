import { useState } from 'react'
import Select from 'react-select'
import { TwitterPicker } from 'react-color'
import CreatableSelect from 'react-select/creatable'

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

  return (
    <div>
      <Select
        defaultValue={{ value: 'github', label: 'github' }}
        options={labels}
        onChange={(label) => setLabel(label!.value)}
      />
      <CreatableSelect
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
        color={color}
        triangle={'hide'}
        onChange={(color) => setColor(color.hex.replace('#', ''))}
      />
      <img src={url} alt={'badge'} />
      <p>{url}</p>
      <button
        onClick={(e) => {
          console.log(url)
          e.preventDefault()
        }}
      >
        Insert
      </button>
    </div>
  )
}

export default BadgePalette
