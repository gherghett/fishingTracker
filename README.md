# fishingTracker — ToFish 🎣

A simple **ToFish** app — like a ToDo list, but for fishing. Add the fish you want to catch and the places you want to fish.

## Project structure

```
fishingTracker/
├── backend/       # Node.js + Express REST API (port 3001)
├── frontend/      # Vite + React SPA (port 5173)
└── package.json   # Root convenience scripts
```

## Getting started

### 1. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 2. Start the backend

```bash
cd backend && npm start
# or, with auto-reload:
cd backend && npm run dev
```

The API will be available at `http://localhost:3001`.

### 3. Start the frontend

```bash
cd frontend && npm run dev
```

Open `http://localhost:5173` in your browser. Vite proxies all `/api` requests to the backend automatically.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/fishes` | List all fishes |
| POST | `/api/fishes` | Add a fish `{ name }` |
| DELETE | `/api/fishes/:id` | Remove a fish |
| GET | `/api/places` | List all places |
| POST | `/api/places` | Add a place `{ name }` |
| DELETE | `/api/places/:id` | Remove a place |

## Production build

```bash
cd frontend && npm run build
```
