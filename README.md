# Muhammad Ibrahim Khan — Portfolio

Personal developer portfolio built with React 19, TypeScript, Vite, and Tailwind CSS. Deployed on Cloudflare Pages.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS v4, Framer Motion, Wouter
- **Testing**: Vitest, Testing Library
- **Linting**: ESLint 9 (flat config), TypeScript ESLint
- **Deployment**: Cloudflare Pages + Cloudflare Functions
- **Media**: Cloudinary (image optimization), Resend (contact form), Cloudflare Turnstile (bot protection)

## Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5000`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server on port 5000 |
| `npm run build` | Production build to `dist/` |
| `npm run check` | TypeScript type check (no emit) |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI mode) |
| `npm run lint` | Lint `client/src` with ESLint |
| `npm run ci` | Type check + tests + lint + build |

## Project Structure

```
client/
  src/
    components/
      layout/       # Navbar
      project/      # GalleryModal, ProjectSection
      sections/     # Hero, Experience, Projects, Skills, Contact, Credentials
      ui/           # Shared primitives, DeferredCustomCursor, animations
    data/           # projects.ts, project-cards.ts, experiences.ts, …
    lib/            # cloudinary.ts, utils.ts
    pages/          # home.tsx, project-detail.tsx
    test/           # Vitest test files
functions/          # Cloudflare Functions (SSR meta, contact API)
```

## CI

GitHub Actions runs on every push/PR to `main`: type check → tests → lint → build.
