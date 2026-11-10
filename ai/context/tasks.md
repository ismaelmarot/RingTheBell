# 🤖 Tasks - RingTheBell

## 🧩 Crear nueva funcionalidad

Instrucción:
Crear una funcionalidad nueva siguiendo:

* /ai/context/project.md
* reglas correspondientes

Priorizar:

* simplicidad
* código claro
* MVP

---

## 📱 Experiencia pública

Implementar:

* Escaneo QR.
* Identificación de instalación.
* Buscador de destinatario.
* Formulario de identificación.
* Solicitud de visita.

---

## 👤 Panel residente

Implementar:

* Solicitudes pendientes.
* Historial de visitas.
* Card de autorización.
* Finalización.

---

## 🛠️ Panel administrativo

Implementar:

* Instalaciones.
* Unidades.
* Residentes.
* QR.
* Configuración.

---

## 🔌 Backend endpoint

Crear endpoints simples REST:

* Formato respuesta SIEMPRE:

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

## 🗄️ Base de datos

Diseñar tablas simples:

* installation
* unit
* user / resident
* qr_code
* visit
* authorization
* message
* call_log
* notification

---

## 🔐 Roles y permisos

Definir:

* ADMIN_PRINCIPAL
* ADMIN
* ENCARGADO
* RESIDENT

---

## 🚀 Mejora futura (no MVP)

* Push.
* Email.
* Geolocalización.
* Auditoría avanzada.
