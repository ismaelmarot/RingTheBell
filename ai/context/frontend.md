# 🎨 Frontend Rules - RingTheBell

## 🎯 Objetivo

UI simple enfocada en:

* Escaneo QR.
* Solicitud de visita.
* Panel residente.
* Panel administrativo.

---

## 📁 Estructura general

* components/
* pages/
* services/
* hooks/ (solo si es necesario)

---

## 🧩 Estructura de componentes

Cada componente:

* Component.tsx
* Component.styles.ts
* useComponent.ts (solo si aplica)
* index.ts
* Component.test.tsx

---

## 🔗 Importación

Alias `@/` → `src`.

```ts
import { Home } from '@/pages/Home';
```

---

## 🪝 Hooks

* Separar lógica del UI.
* Evitar lógica en JSX.

---

## 📦 API

* Centralizar en `/services/api.ts`.
* No usar fetch/axios en componentes.

---

## 🧠 Estado

* useState / useEffect.
* No usar Redux en MVP.

---

## 🎨 Estilos

* styled-components.
* Separar en `.styles.ts`.

---

## 🧪 Testing

* `Component.test.tsx`.

---

## 🚫 Evitar

* Componentes grandes.
* Lógica compleja en JSX.
* Imports relativos.
* Sobreingeniería.

---

## 🚀 Principio clave

Si el escaneo no es rápido, claro y confiable → la app falla.
