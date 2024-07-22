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
  content_scripts: [
    {
      matches: ['https://github.com/*/*/pull/*', 'https://github.com/*/*/issues/*'],
      js: ['content/index.tsx'],
    },
  ],
}))

export default manifest
