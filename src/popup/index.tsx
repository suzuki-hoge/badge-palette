import React from 'react'
import { createRoot } from 'react-dom/client'
import Option from './Option.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Option />
  </React.StrictMode>,
)
