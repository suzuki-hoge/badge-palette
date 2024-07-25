import { createRoot } from 'react-dom/client'
import BadgePalette from './BadgePalette.tsx'

const root = document.getElementsByClassName('js-previewable-comment-form')[1]
const my = document.createElement('div')
root.append(my)
createRoot(my).render(<BadgePalette />)
