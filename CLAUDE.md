# Portofolio Project

## Tech Stack
- **Frontend**: Next.js (TypeScript, TailwindCSS, App Router) di `/frontend`
- **Backend**: Laravel 10 (PHP) di `/backend`

## Directory Structure
- `frontend/` - Next.js React application
- `backend/` - Laravel API
- `.claude/` - Claude Code harness configuration (agents, skills, rules)
- `graphify-out/` - Graphify AST and clustering data

## Getting Started
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
composer install
php artisan serve
```

## AI Tools
- **Graphify**: `graphify . --code-only` to update AST graph.
- **Claude MCP**: `skills-over-mcp` (superpowers) & `graphify-mcp` connected.