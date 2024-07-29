import { Message } from './data.ts'

import './dot-message.css'

interface Props {
  message: Omit<Message, 'id'>
}

const DotMessage = (props: Props) => {
  return (
    <div className={'dot-message-component'}>
      <span className={'dot-message-dot'} style={{ backgroundColor: `#${props.message.color}` }} />
      <span>{props.message.value}</span>
    </div>
  )
}
export default DotMessage
