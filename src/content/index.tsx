import { createRoot } from 'react-dom/client'
import BadgePalette from './BadgePalette.tsx'
import { createPreview, Label, match } from '../component/data.ts'
import { restoreMessages } from '../store/MessageStore.ts'
import { restoreKeyConfig } from '../store/KeyConfigStore.ts'

const element = document.createElement('div')
document.body.appendChild(element)

const labels = fetchLabels()

restoreKeyConfig().then((keyConfig) => {
  console.log(`Badge Palette: Found key config. Push [ ${createPreview(keyConfig)} ] key on <textarea>.`)

  document.body.addEventListener('keydown', (e) => {
    if (match(keyConfig, e)) {
      const active = document.activeElement
      const parent = active?.parentNode as HTMLElement

      const isTextarea = active?.tagName.toLowerCase() === 'textarea'
      if (isTextarea && (parent.classList.contains('CommentBox-container') || active?.closest('form.js-inline-comment-form'))) {
        const textarea = active as HTMLTextAreaElement
        const left = textarea.getBoundingClientRect().left + window.scrollX
        const top = textarea.getBoundingClientRect().top + window.scrollY
        const height = textarea.getBoundingClientRect().height
        const root = createRoot(element)
        const textareaId = textarea.id
        Promise.all([labels, restoreMessages()]).then(([labels, messages]) =>
          root.render(
            <BadgePalette
              textareaId={textareaId}
              left={left}
              top={top + height + 16}
              labels={labels}
              messages={messages}
              unmount={() => {
                root.unmount()
                textarea.focus()
              }}
            />,
          ),
        )
      } else if (isTextarea) {
        console.error('Badge Palette: Parent is not .CommentBox-container and no ancestor form.js-inline-comment-form found. GitHub UI may have changed.')
      } else {
        console.log('Badge Palette: Active element is not a <textarea>')
      }
    }
  })
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
