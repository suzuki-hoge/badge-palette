export interface Label {
  value: string
  label: string
}

export interface Message {
  id: string
  value: string
  label: string
  color: string
}

export function dumpMessages(messages: Message[]): string {
  return messages.map((message) => `${message.id}:${message.value}:${message.color}`).join('\n')
}

export function loadMessages(lines: string): Message[] {
  return lines
    .split('\n')
    .filter((line) => line.trim().length !== 0)
    .map((line) => {
      const cols = line.split(':')
      return { id: cols[0], value: cols[1], label: cols[1], color: cols[2] }
    })
}
