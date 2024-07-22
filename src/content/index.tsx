import { createRoot } from 'react-dom/client'
import BadgePalette from './BadgePalette.tsx'

const root = document.getElementById('partial-discussion-header')!
const my = document.createElement('div')
root.append(my)
createRoot(my).render(<BadgePalette />)
