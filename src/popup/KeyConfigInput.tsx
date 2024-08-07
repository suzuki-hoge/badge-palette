import './key-config.css'
import { useEffect, useState } from 'react'
import { restoreKeyConfig, storeKeyConfig } from '../store/KeyConfigStore.ts'
import { createPreview, parseKeyConfig } from '../component/data.ts'

const KeyConfigInput = () => {
  const [preview, setPreview] = useState('')

  useEffect(() => {
    restoreKeyConfig().then((keyConfig) => setPreview(keyConfig ? createPreview(keyConfig) : ''))
  }, [])

  return (
    <div className={'option-key-config-component'}>
      <p>Key Config</p>
      <input
        type={'input'}
        value={preview}
        placeholder={'popup key'}
        readOnly={true}
        onKeyDown={(e) => {
          if (!['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
            const keyConfig = parseKeyConfig(e)
            storeKeyConfig(keyConfig).then(() => setPreview(createPreview(keyConfig)))
          }
        }}
      />
    </div>
  )
}

export default KeyConfigInput
