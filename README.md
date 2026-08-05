# PortFolio

A modern Next.js portfolio project showcasing experience and selected projects.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open http://localhost:3000 in your browser.

## Cloudflare Workers deployment

This is a static site. `npm run build` exports it to `out/`, and the small
ES-module Worker in `src/worker.js` serves that directory through the Workers
Assets binding. This avoids deploying the Next.js Node server bundle to the
Workers runtime.

Install project dependencies, then run:

```bash
npm run deploy
```
