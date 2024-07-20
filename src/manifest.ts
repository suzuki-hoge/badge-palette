import { defineManifest } from '@crxjs/vite-plugin'
import { version } from '../package.json'

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: 'Badge Palette',
  description: 'GitHub でバッヂを入力するポップアップをひらく',
  version,
  action: {
    default_popup: 'popup/index.html',
  },
}))

export default manifest
