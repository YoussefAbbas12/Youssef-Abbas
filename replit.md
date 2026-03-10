# Zain Portfolio

A modern personal portfolio website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber, Spline
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM v7

## Running the Project

```bash
npm run dev
```

The dev server runs on port 5000 and is accessible at `http://localhost:5000`.

## Project Structure

```
src/
  App.jsx                 - Main app component
  main.jsx               - Entry point
  components/            - UI components
  pages/                 - Page components
  contexts/              - React context providers
  data/                  - Static data (projects, certificates)
  assets/                - Images and static files
  contextslib/           - Utility libraries
```

## Data

This portfolio uses **static data** instead of a database:

- **Projects**: `src/data/projects.js` - 13 featured projects
- **Certificates**: `src/data/certificates.js` - 13 certificates

To add new projects or certificates, edit these files directly.

## Features Removed (March 2026)

- Supabase database integration
- Admin authentication system
- Gallery page with comments
- Contact form submissions
- Dynamic data fetching

## Migration Notes

- Migrated from Vercel to Replit
- Removed all database dependencies for simplicity
- Converted database-driven content to static data
- Simplified Contact section to display social links only
- Dev server configured for Replit compatibility (port 5000, host 0.0.0.0)

## Building for Production

```bash
npm run build
```

The production build outputs to the `dist/` directory.
