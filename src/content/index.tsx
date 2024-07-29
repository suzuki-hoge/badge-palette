import { createRoot } from 'react-dom/client'
import BadgePalette from './BadgePalette.tsx'
import { Label } from '../component/data.ts'
import { restoreMessages } from '../store/MessageStore.ts'

const element = document.createElement('div')
document.body.appendChild(element)

const labels = fetchLabels()

document.body.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'Space') {
    const active = document.activeElement
    const parent = active?.parentNode as HTMLElement

    if (active?.tagName.toLowerCase() === 'textarea' && parent.classList.contains('CommentBox-container')) {
      const left = active.getBoundingClientRect().left + window.scrollX
      const top = active.getBoundingClientRect().top + window.scrollY
      const height = active.getBoundingClientRect().height
      const root = createRoot(element)
      const textareaId = active.id
      Promise.all([labels, restoreMessages()]).then(([labels, messages]) =>
        root.render(
          <BadgePalette
            textareaId={textareaId}
            left={left}
            top={top + height + 16}
            labels={labels}
            messages={messages}
            unmount={() => root.unmount()}
          />,
        ),
      )
    } else {
      // do nothing
    }
  }
})

async function fetchLabels(): Promise<Label[]> {
  const md = await fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/master/slugs.md')
  const text = await md.text()
  const values = text
    .split('\n')
    .filter((line) => line.startsWith('|'))
    .slice(2)
    .map((line) => line.split('|')[2].replace(/`/g, '').trim())

  return values.map((value) => ({ value, label: value }))
}
