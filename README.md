# MagicBook.vue

MagicBook.vue is a Vue 3 library management application with authentication, role-based dashboards, and book inventory workflows for admins and readers.

## Highlights

- User signup and login flows
- Role-based navigation (admin and user experiences)
- Admin dashboard for creating, editing, and deleting books
- User dashboard for browsing and borrowing books
- Firebase integration for data services
- Modern UI built with Vue, Element Plus, Tailwind CSS, and SweetAlert2

## Tech Stack

- Vue 3 + Vite
- Vue Router + Vuex
- XState
- Firebase
- Element Plus + Tailwind CSS

## Project Structure

- `/test` — main application source and Vite project
- `/test/src/views` — page-level views
- `/test/src/router` — app routing and route guards
- `/test/src/state` — state machine and related services

## Getting Started

### 1) Install dependencies

From repository root:

```bash
npm install
npm --prefix test install
```

### 2) Start the development server

```bash
npm run dev
```

The app runs from the `/test` workspace using the root script wrappers.

## Scripts

Run from repository root:

- `npm run dev` — start local development server
- `npm run build` — create production build
- `npm run lint` — run ESLint with auto-fixes
- `npm run format` — format source files with Prettier

You can also run scripts directly in `/test` with `npm --prefix test run <script>`.

## Build for Production

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Notes

- Ensure your Firebase configuration is set correctly for your environment.
- JSON server utilities are included in the project for local mock workflows.
