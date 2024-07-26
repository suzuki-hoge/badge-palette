import { createRoot } from 'react-dom/client'
import BadgePalette from './BadgePalette.tsx'

const element = document.createElement('div')
document.body.appendChild(element)

document.body.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'Space') {
    const active = document.activeElement
    const parent = active?.parentNode as HTMLElement

    if (
      active?.tagName.toLowerCase() === 'textarea' &&
      parent.classList.contains('CommentBox-container')
    ) {
      const left = active.getBoundingClientRect().left + window.scrollX
      const top = active.getBoundingClientRect().top + window.scrollY
      const height = active.getBoundingClientRect().height
      const root = createRoot(element)
      const textareaId = active.id
      root.render(
        <BadgePalette
          textareaId={textareaId}
          left={left}
          top={top + height + 16}
          unmount={() => root.unmount()}
        />,
      )
    } else {
      // do nothing
    }
  }
})
