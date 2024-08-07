import React from 'react'

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

export interface KeyConfig {
  key: string
  code: string
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

export function dumpMessages(messages: Message[]): string {
  return messages.map((message) => `${message.id}:${message.color}:${message.value}`).join('\n')
}

export function loadMessages(lines: string): Message[] {
  return lines
    .split('\n')
    .filter((line) => line.trim().length !== 0)
    .map((line) => {
      const cols = line.split(':')
      return { id: cols[0], value: cols[2], label: cols[2], color: cols[1] }
    })
}

export function parseKeyConfig(e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent): KeyConfig {
  return { key: e.key, code: e.code, ctrl: e.ctrlKey, shift: e.shiftKey, alt: e.altKey, meta: e.metaKey }
}

export function createPreview(keyConfig: KeyConfig): string {
  return [
    ['Control', keyConfig.ctrl],
    ['Shift', keyConfig.shift],
    ['Alt', keyConfig.alt],
    ['Meta', keyConfig.meta],
    [keyConfig.code === 'Space' ? keyConfig.code : keyConfig.key, true],
  ]
    .filter((def) => def[1])
    .map((def) => def[0])
    .join(' + ')
}

export function match(keyConfig: KeyConfig, e: KeyboardEvent): boolean {
  const k1 = keyConfig
  const k2 = parseKeyConfig(e)
  const a1 = [k1.key, k1.code, k1.ctrl, k1.shift, k1.alt, k1.meta]
  const a2 = [k2.key, k2.code, k2.ctrl, k2.shift, k2.alt, k2.meta]
  return JSON.stringify(a1) === JSON.stringify(a2)
}
