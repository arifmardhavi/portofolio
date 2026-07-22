# Portofolio Project

Project portfolio berbasis API-first. Frontend dibangun dengan Next.js dan backend dengan Laravel.

## Tech Stack
- **Frontend**: Next.js (TypeScript, Tailwind CSS, App Router)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React & Simple Icons
- **i18n**: next-intl (ID/EN)
- **Theme**: next-themes (Light/Dark)
- **Backend**: Laravel 10 (PHP, MySQL)

## Directory Structure
- `frontend/` - Next.js React application
- `backend/` - Laravel API
- `.claude/` - Konfigurasi Claude Code (agents, skills, rules)

## Getting Started

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Sesuaikan DB_DATABASE=portofolio, DB_USERNAME, DB_PASSWORD di .env
php artisan migrate
php artisan serve
```
API berjalan di `http://localhost:8000/api`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Buka `http://localhost:3000`

## Architecture Rules
1. **Frontend-Backend Split**: Pola decoupled. Frontend (Next.js) murni berinteraksi dengan Backend (Laravel) via REST API.
2. **Styling**: Tailwind CSS. Hindari custom CSS kecuali terpaksa.
3. **Routing**: Next.js App Router (`app/` directory).
4. **Backend API**: Response selalu gunakan JSON terstandarisasi. Route di `routes/api.php`.
5. **Models**: Introduction, Career, CareerDetail, Education.
6. **Icons**: Gunakan aset/referensi dari [Simple Icons](https://simpleicons.org/) untuk logo brand/teknologi, dan [Lucide](https://lucide.dev/) untuk UI icons.

## AI Tools Integration
- **Graphify**: Jalankan `graphify . --code-only` di root untuk update AST graph.
- **Claude MCP**: `skills-over-mcp` (superpowers) & `graphify-mcp` terkoneksi.