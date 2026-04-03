# Vinyl Record Library

A full-stack web application for cataloging and managing your personal vinyl record collection. Built with a FastAPI backend and a Next.js frontend featuring a modern zinc and orange UI.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Tech Stack](https://img.shields.io/badge/FastAPI-0.135-009688?logo=fastapi) ![Tech Stack](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql&logoColor=white) ![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)

## Features

- Add and delete vinyl records from your collection
- Upload album artwork images via Cloudinary
- Search and filter records by artist, album, year, genre, label, format, and condition
- Track record condition and format details
---
## Tech Stack

### Backend
- **FastAPI** — Python REST API framework
- **SQLAlchemy** — ORM for database management
- **PostgreSQL** — Primary database (deployed on [Railway](https://railway.app/))
- **Cloudinary** — Image hosting for album artwork
- **Pydantic** — Data validation

### Frontend
- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS v4** — Utility-first CSS framework
- **shadcn/ui** — Accessible UI components (Card, Input, Select, Button, Badge, etc.)
- **Lucide React** — Icon library
- **next-themes** — Dark/light theme toggling

## Project Structure

```
vinyl-record-library/
├── backend/
│   ├── main.py          # FastAPI app, API routes, CORS config
│   ├── models.py        # SQLAlchemy database models
│   ├── schema.py        # Pydantic schemas for validation
│   ├── database.py      # Database connection configuration
│   ├── .env             # Environment variables
│   └── pyproject.toml   # Python dependencies (uv)
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── components/  # React components (ClientRecords, ThemeToggle, ThemeProvider, ui/)
│   │   ├── lib/         # Utility functions
│   │   └── types/       # TypeScript type definitions
│   ├── public/          # Static assets
│   ├── components.json  # shadcn/ui configuration
│   ├── package.json     # Node.js dependencies (bun)
│   └── tsconfig.json    # TypeScript configuration
└── README.md
```

## Prerequisites

- Python 3.12+
- [uv](https://docs.astral.sh/uv/) package manager
- Node.js 20+
- [Bun](https://bun.sh/) package manager
- PostgreSQL database
- Cloudinary account (for image uploads)

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   uv venv
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   uv sync
   ```

4. Set up PostgreSQL:
   - Create a database named `VinylRecordLibrary`
   - Create a database user and password

5. Create a `.env` file:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/VinylRecordLibrary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

6. Start the server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at http://localhost:8000

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```
   The application will be available at http://localhost:3000

## Running Both Servers

Open two terminals:

```bash
# Terminal 1 — Backend
cd backend
source .venv/bin/activate
uvicorn main:app --reload

# Terminal 2 — Frontend
cd frontend && bun run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health check |
| GET | `/records/` | Get all vinyl records |
| GET | `/records/{id}` | Get a specific record by ID |
| POST | `/records/` | Create a new record with artwork upload |
| PUT | `/records/{id}` | Update an existing record |
| DELETE | `/records/{id}` | Delete a record |

## License

MIT
