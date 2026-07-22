# Portofolio Project

Project portfolio berbasis API-first. Frontend dibangun dengan Next.js dan backend dengan Laravel.

## Tech Stack
- **Frontend**: Next.js (TypeScript, Tailwind CSS, App Router)
- **UI Components**: shadcn/ui
- **Backend**: Laravel 10 (PHP)

## Directory Structure
- `frontend/` - Next.js React application
- `backend/` - Laravel API
- `.claude/` - Konfigurasi Claude Code (agents, skills, rules)
- `graphify-out/` - Graphify AST & data clustering

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Buka `http://localhost:3000`

### Backend
```bash
cd backend
composer install
php artisan serve
```
API berjalan di `http://localhost:8000/api`

## Architecture Rules
1. **Frontend-Backend Split**: Pola decoupled. Frontend (Next.js) murni berinteraksi dengan Backend (Laravel) via REST API.
2. **Styling**: Tailwind CSS. Hindari custom CSS kecuali terpaksa.
3. **Routing**: Next.js App Router (`app/` directory).
4. **Backend API**: Response selalu gunakan JSON terstandarisasi. Route di `routes/api.php`.
5. **Icons**: Gunakan aset/referensi dari [Simple Icons](https://simpleicons.org/) untuk logo brand/teknologi.

## AI Tools Integration
- **Graphify**: Jalankan `graphify . --code-only` di root untuk update AST graph.
- **Claude MCP**: `skills-over-mcp` (superpowers) & `graphify-mcp` terkoneksi.
