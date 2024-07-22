import { createRoot } from 'react-dom/client'

const root = document.getElementById('partial-discussion-header')!
const my = document.createElement('div')
root.append(my)
createRoot(my).render(<p>foo</p>)
