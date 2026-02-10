# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the Chrome extension source in TypeScript + React.
  - `src/manifest.ts` defines the extension manifest.
  - `src/popup/` contains the popup UI.
  - `src/content/` contains content scripts that run on pages.
  - `src/component/` shared UI components.
  - `src/store/` state and storage utilities.
- `public/` holds static assets copied into builds (e.g. `public/image/`).
- `dist/` is the build output used when loading the unpacked extension.
- `doc/` contains screenshots and documentation assets for the README.

## Build, Test, and Development Commands
- `yarn dev` starts the Vite dev server and generates `dist/` for local extension development (hot reload).
- `yarn build` runs TypeScript build and Vite production build, outputting `dist/`.
- `yarn preview` serves the production build locally.
- `yarn lint` runs ESLint on `src/`.
- `yarn format` formats `src/` with Prettier.

## Coding Style & Naming Conventions
- Indentation: 2 spaces (Prettier default).
- Language: TypeScript + React (TSX in UI folders).
- Prefer PascalCase for React components (e.g. `ColorPicker.tsx`).
- Use camelCase for variables/functions and kebab-case for asset filenames.
- Run `yarn lint` before pushing; keep warnings at zero.

## Testing Guidelines
- No automated test suite is configured.
- If you add tests, document the framework and commands here and keep test files next to code (e.g. `src/popup/__tests__/` or `*.test.tsx`).

## Commit & Pull Request Guidelines
- Recent commits use short, lowercase, action-first messages like `update 1.3.0`.
- Keep commits focused and include version bumps when updating releases.
- PRs should include: a short summary, screenshots for UI changes, and a note on manual testing (e.g. “loaded `dist/` in `chrome://extensions` and verified popup”).

## Security & Configuration Tips
- The extension is loaded as an unpacked build from `dist/` (see README installation steps).
- Avoid checking in secrets; keep any API keys out of the repo.
