# Movie Vault — React + Vite

Modern, lightweight React app for discovering and saving movies. This project
uses Vite for fast development and a small TMDB-powered service layer — with
a local fallback so the UI works even without an API key.

**Status:** Build passes locally. Development server available with `npm run dev`.

**Key features**
- Fast React + Vite setup with React Router and a simple context-based store
- Search and browse popular movies (TMDB integration)
- Save favorites to `localStorage` for offline persistence
- Polished, responsive UI with modern visuals and defensive data handling

**Table of contents**
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [How it works / notes](#how-it-works--notes)
- [Contributing](#contributing)
- [License](#license)

## Quick Start

1. Install dependencies (from the project root):

```bash
cd React-Project
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

Open http://localhost:5173 (or the port printed by Vite) to view the app.

## Environment variables

The app supports a TMDB API key via Vite environment variables. Create a file
named `.env` in the `React-Project` folder and add:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

If the API key is not provided, the app falls back to a small local catalog so
the UI remains usable and does not crash.

## Available scripts

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Project structure

- `src/` — application source
	- `components/` — reusable UI components (NavBar, MovieCard)
	- `pages/` — route pages (Home, Favorites)
	- `contexts/` — React context for favorites state
	- `services/api.js` — TMDB client and fallback logic
	- `css/` — styles
	- `main.jsx`, `App.jsx` — app entry and routing
- `public/` — static assets

See [src/services/api.js](src/services/api.js#L1) for the exact fetch logic and
the fallback dataset used when `VITE_TMDB_API_KEY` is empty.

## How it works / notes

- The app fetches popular movies on the Home page. If the TMDB API key is
	missing or the request fails, a built-in fallback array is used instead.
- Favorites are stored in `localStorage` under the `favorites` key by the
	`MovieContext` provider.
- The `MovieCard` component gracefully handles missing poster images and
	renders a fallback tile.

## Contributing

1. Fork the repo and create a feature branch
2. Make changes and run the dev server locally
3. Open a pull request with a clear description of your changes

## License

This project does not include a license file. Add one (for example `MIT`) if
you intend to make the repository open-source.

---

If you want, I can also:
- add a short `CONTRIBUTING.md` and a `LICENSE` file
- wire up a `.env.example` with a placeholder `VITE_TMDB_API_KEY`

File: [React-Project/README.md](React-Project/README.md)
