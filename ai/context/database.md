# 🗄️ Database Rules - RingTheBell

## 🎯 Objetivo

Base de datos simple para:

* Instalaciones.
* Unidades.
* Usuarios / Residentes.
* Visitas.
* Mensajes.
* Llamadas.
* Notificaciones.

---

## 📊 Tablas principales

### installation

* id
* name
* type (building | house | office | neighborhood)
* config (QR mode, retention, etc.)

### unit

* id
* installation_id
* code (ej. 4B)
* floor
* resident_ids

### user / resident

* id
* installation_id
* email
* password_hash
* role (ADMIN_PRINCIPAL | ADMIN | ENCARGADO | RESIDENT)
* status

### qr_code

* id
* token (opaco, sin PII)
* installation_id
* unit_id (opcional para QR general)
* mode (GENERAL | SINGLE)
* status (ACTIVE | REVOKED | REPLACED)

### visit

* id
* installation_id
* unit_id
* visitor_name
* visitor_photo
* reason
* company
* status (PENDING | ACCEPTED | REJECTED | EXPIRED | FINALIZED)
* requested_at
* responded_at

### authorization / message / call_log / notification

* visit_id
* datos asociados

---

## 🧱 Reglas

* Relaciones simples.
* No sobre-normalizar.
* Evitar joins complejos.

---

## ⚡ Lógica de datos

* Un visitante sin cuenta se identifica en la solicitud.
* El residente autoriza.

---

## 🚫 Evitar

* Relaciones complejas.
* Normalización excesiva.
* Optimización prematura.

---

## 🚀 Principio clave

La consistencia de los estados de visita es crítica.
