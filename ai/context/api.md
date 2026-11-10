# 🔗 API - RingTheBell

## 🎯 Objetivo

Endpoints simples para:

* Instalaciones.
* Unidades.
* QR.
* Visitas.
* Mensajes.
* Llamadas.

---

## 📌 Endpoints

### POST /auth/login

### POST /installations

### GET /installations/:id

### POST /units

### POST /qr

### POST /visits

### GET /visits/:id

### POST /visits/:id/respond

### POST /visits/:id/finalize

### POST /messages

### POST /calls

---

## 📦 Formato de respuesta

```json
{
  "success": true,
  "data": {}
}
```

o

```json
{
  "success": false,
  "error": "mensaje"
}
```

---

## 🚀 Principio clave

Endpoints simples, rápidos y predecibles.
