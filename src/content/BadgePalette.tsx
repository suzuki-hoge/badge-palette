import { useState } from 'react'

const BadgePalette = () => {
  const [label, setLabel] = useState('review')
  const [message, setMessage] = useState('ask')
  const [color, setColor] = useState('lightcyan')
  const url = `https://img.shields.io/badge/${label}-${message}-${color}`

  return (
    <div>
      <input value={label} onChange={(e) => setLabel(e.target.value)} />
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <img src={url} alt={'badge'} />
    </div>
  )
}

export default BadgePalette
