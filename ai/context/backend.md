# ⚙️ Backend Rules - RingTheBell

## 🎯 Objetivo

Backend simple que:

* Gestione instalaciones, unidades, usuarios.
* Procese solicitudes de visita.
* Valide QR.
* Maneje autorizaciones.

---

## 📁 Estructura

* routes/
* db/
* services/
* middleware/
* sockets/ (cuando aplique)

---

## 🔗 Endpoints

* REST simples.

Ej:

* /auth
* /installations
* /units
* /qr
* /visits
* /messages
* /calls

---

## 🧠 Lógica

* Lógica de negocio en services.
* Evitar lógica en múltiples lugares.

---

## 🔄 Visitas

Regla principal:

* Estado único por visita.
* Update atómico para evitar respuestas simultáneas.

---

## 📦 Respuestas

Formato SIEMPRE:

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

## 🔐 Auth

* JWT simple.
* Proteger endpoints críticos.

---

## 🧾 Validaciones

* Validar datos de entrada.
* Validar QR válido.

---

## 🗄️ Base de datos

* SQLite (MVP).

---

## 🧠 Services

Ej:

* installation.service
* visit.service
* qr.service

---

## 🚫 Evitar

* Arquitectura compleja.
* Abstracciones prematuras.

---

## 🚀 Principio clave

Si la respuesta a una visita no es rápida y confiable → el sistema falla.
