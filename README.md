# RingTheBell

Sistema de gestión de visitantes mediante QR. App web PWA + API REST.

## Estructura

- `frontend/` — React + TypeScript + Vite + styled-components.
- `backend/` — Node + TypeScript + Express + Socket.IO + SQLite.
- `ai/context/` — Especificaciones SDD.

## Desarrollo local

```bash
# Backend
cd backend && npm install && npm run dev   # http://localhost:3001

# Frontend
cd frontend && npm install && npm run dev  # http://localhost:5173
```

O desde la raíz:

```bash
npm install
npm run dev
```

## Credenciales iniciales

- Admin: `admin@mail.com` / `admin123` (creado automáticamente al arrancar el backend).

## Variables de entorno (backend)

Ver `backend/.env.example`. Principales:

- `PORT` (default 3001)
- `JWT_SECRET`
- `VISIT_EXPIRATION_MINUTES` (default 5)
- `EXPIRATION_CHECK_INTERVAL_MS` (default 60000)
- `RETENTION_DAYS` (default 90)
- `RETENTION_CHECK_INTERVAL_MS` (default 86400000)
- `TURN_URL`, `TURN_USERNAME`, `TURN_CREDENTIAL` (opcional, para WebRTC)

## Tests

```bash
cd backend && npm test
cd frontend && npm test
```

## Build

```bash
cd backend && npm run build
cd frontend && npm run build
```
EOF
echo "written"