# 📋 PRD - RingTheBell

## 🎯 1. Visión del producto

App web PWA para gestionar visitantes mediante QR en instalaciones (edificios, casas, oficinas, barrios).

---

## 🚀 2. Problema

* Gestión manual de visitas (libretas, WhatsApp, llamadas).
* Falta de trazabilidad.
* No hay autorizaciones digitales.

---

## 💡 3. Solución

QR → solicitud → autorización → card → finalización.

---

## 👤 4. Usuarios objetivo

### Visitante
Escanea QR desde cámara.

### Residente
Acepta/rechaza, chatea, llama, finaliza.

### Administrador / Encargado
Gestiona instalaciones, unidades, QR y visitas.

---

## 🧩 5. Funcionalidades (MVP)

### QR
* General / individual.
* Generar, descargar (PDF/PNG), imprimir, revocar, reemplazar.

### Visitas
* Identificación del visitante.
* Solicitud.
* Notificaciones.
* Aceptar / rechazar.
* Expiración automática (5 min).
* Card de autorización.
* Finalización.

### Comunicación
* Chat por visita.
* Llamadas WebRTC.

---

## 🔄 6. Flujo principal

1. Visitante escanea QR.
2. Selecciona destinatario (o QR individual).
3. Completa identificación.
4. Envía solicitud.
5. Residente acepta/rechaza.
6. Card de autorización.
7. Residente finaliza.

---

## 🎨 7. UX/UI

* Minimalista, estilo Apple.
* Mobile-first (cámara del visitante).

---

## ⚙️ 8. Requisitos técnicos

React + TS + Vite + styled-components + React Router. Node + TS + Express. Socket.IO. WebRTC.

---

## 📦 9. Datos principales

Installation, Unit, User/Resident, QrCode, Visit, Authorization, Message, CallLog, Notification.

---

## ⚠️ 10. Fuera de alcance (MVP)

Hardware físico, push nativo, email, geolocalización avanzada.

---

## 🚀 15. Principio clave

La simplicidad del flujo de visita define el éxito.
