import { defineManifest } from '@crxjs/vite-plugin'
import { version } from '../package.json'

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: 'Badge Palette',
  description: 'GitHub でバッヂを入力するポップアップをひらく',
  version,
  icons: {
    '16': 'image/logo.png',
    '32': 'image/logo.png',
    '48': 'image/logo.png',
    '128': 'image/logo.png',
  },
  action: {
    default_popup: 'popup/index.html',
    default_icon: {
      '16': 'image/logo.png',
      '32': 'image/logo.png',
      '48': 'image/logo.png',
      '128': 'image/logo.png',
    },
  },
  content_scripts: [
    {
      matches: ['https://github.com/*/*/pull/*', 'https://github.com/*/*/issues/*'],
      js: ['content/index.tsx'],
    },
  ],
  permissions: ['storage'],
}))

export default manifest
