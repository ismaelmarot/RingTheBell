# 📄 RingTheBell

## 🎯 Objetivo

Aplicación web responsive para la gestión de visitantes mediante códigos QR en múltiples instalaciones, permitiendo identificar, solicitar, autorizar e informar visitas de forma digital.

---

## 💡 Propuesta de valor

Sistema moderno y simple para gestionar visitas sin hardware adicional:
* El visitante escanea un QR, se identifica y envía una solicitud.
* El residente autoriza desde su panel.
* La visita queda registrada digitalmente (card de autorización).

---

## 🧱 Stack

* Frontend: React + TypeScript + Vite + styled-components + React Router
* Backend: Node + TypeScript + Express
* Database: SQLite (MVP) → PostgreSQL/Supabase (fases avanzadas)

---

## 🧩 Modelo conceptual

### Instalación
Entidad base multiinstalación (edificio, casa particular, oficina, barrio).

### Unidad / Vivienda / Oficina
Pertenece a una instalación. Puede tener residentes.

### Visitante / Residente
Visitante sin cuenta (identificado en solicitud). Residente con cuenta (invitado por admin).

### Visita
Solicitud con estados: pendiente, aceptada, rechazada, expirada, finalizada.

---

## 🔥 MVP (alcance inicial)

* QR general / individual.
* Solicitud de visita.
* Aceptar / rechazar.
* Respuesta automática (5 min).
* Card de autorización digital.
* Finalización de visita.

---

## 🚀 Principio clave

Si el flujo de visita no es rápido, claro y confiable → el producto falla.
