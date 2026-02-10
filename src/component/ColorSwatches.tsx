import './color-swatches.css'

const DEFAULT_COLORS = [
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF',
]

interface Props {
  colors?: string[]
  color: string
  width: string
  onChange: (color: string) => void
}

const ColorSwatches = ({ colors = DEFAULT_COLORS, color, width, onChange }: Props) => {
  const selected = `#${color}`.toUpperCase()

  return (
    <div className="color-swatches-component" style={{ width }}>
      {colors.map((c) => (
        <button
          key={c}
          className="color-swatches-swatch"
          style={{ backgroundColor: c, color: c }}
          data-selected={c.toUpperCase() === selected}
          onClick={() => onChange(c.replace('#', ''))}
          type="button"
          aria-label={c}
        />
      ))}
    </div>
  )
}

export default ColorSwatches
