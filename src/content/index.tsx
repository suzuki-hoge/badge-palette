import { createRoot } from 'react-dom/client'
import BadgePalette from './BadgePalette.tsx'
import { Label } from '../component/data.ts'
import { restoreMessages } from '../store/MessageStore.ts'

const element = document.createElement('div')
document.body.appendChild(element)

const labels = fetchLabels()

const textareaId = 'new_comment_field'
const textarea = document.getElementById(textareaId) as HTMLTextAreaElement
const left = textarea.getBoundingClientRect().left + window.scrollX
const top = textarea.getBoundingClientRect().top + window.scrollY
const height = textarea.getBoundingClientRect().height
const root = createRoot(element)

Promise.all([labels, restoreMessages()]).then(([labels, messages]) =>
  root.render(
    <BadgePalette textareaId={textareaId} left={left} top={top + height + 16} labels={labels} messages={messages} />,
  ),
)

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
