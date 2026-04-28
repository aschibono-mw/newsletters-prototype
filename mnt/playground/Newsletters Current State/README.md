# Newsletters — Current State Prototype

A standalone React prototype of the Meltwater Newsletters feature (current state).

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` — starts directly on the Newsletters landing page.

## Pages

| Route | Description |
|-------|-------------|
| `/mw-newsletters-current` | Landing page — newsletter grid with Create New menu |
| `/mw-newsletters-current/create?type=manual` | Template picker — Manual Newsletter |
| `/mw-newsletters-current/create?type=automated` | Template picker — Automated Newsletter |
| `/mw-newsletters-current/editor/new?type=...&template=...` | Full-screen editor |

## Stack

- React 19
- Vite 7
- Material UI 7
- React Router 7

## Notes

- All data is mocked — no backend required
- The Create and Editor pages are full-screen overlays (position: fixed, zIndex: 1300)
- Template previews use CSS transform scaling to render miniature newsletter thumbnails
