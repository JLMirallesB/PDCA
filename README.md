# PDCA Lab

Sitio estático para GitHub Pages con selector común de simuladores de formación en mejora de la calidad educativa.

## Estado actual

- Simulador principal: `Parasuraman` en modo paso a paso frase por frase con animación.
- Simulador adicional: `Parasuraman Avanzado` con contraseña `demo`.
- Simulador activo: `PDCA` con definición guiada, visual principal y malfuncionamientos.
- Simulador activo: `PVCA` con modo definición y modo malfuncionamiento por ausencia de fase.
- Idiomas disponibles: español (`es`), valencià (`ca`) y english (`en`).

## Arquitectura

- Frontend: HTML + CSS + JavaScript modular (sin backend).
- Navegación multipágina con shell común (header, selector de idioma y navegación activa).
- i18n centralizado en `assets/js/core/i18n.js`.
- Lógica por página en `assets/js/pages/`.
- Publicación automática en GitHub Pages con `.github/workflows/pages.yml`.

## Estructura de carpetas

```text
.
├── .github/workflows/pages.yml
├── index.html
├── simulators/
│   ├── parasuraman.html
│   ├── parasuraman-avanzado.html
│   ├── pdca-equipo.html
│   └── pvca.html
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── home.css
│   │   ├── pdca.css
│   │   ├── pvca.css
│   │   ├── simulator.css
│   │   └── parasuraman-simple.css
│   └── js/
│       ├── core/
│       │   ├── app-shell.js
│       │   └── i18n.js
│       └── pages/
│           ├── home.js
│           ├── pdca.js
│           ├── pvca.js
│           ├── parasuraman.js
│           ├── parasuraman-advanced.js
│           └── placeholder.js
└── .nojekyll
```

## Despliegue en GitHub Pages

1. Sube el repositorio a GitHub con rama principal `main`.
2. En GitHub, activa `Settings > Pages > Build and deployment > Source: GitHub Actions`.
3. Cada push a `main` publica automáticamente.

URL esperada:

- `https://<tu-usuario>.github.io/PDCA/`

## Cómo ampliar con nuevos modelos

1. Crea una nueva página en `simulators/`.
2. Añade la tarjeta de acceso en `index.html`.
3. Añade los textos de los 3 idiomas en `assets/js/core/i18n.js`.
4. Crea la lógica específica en `assets/js/pages/`.
5. Reutiliza el shell común con `initShell()`.

## Accesibilidad aplicada (base)

- Navegación y controles compatibles con teclado.
- Contraste visual funcional en tema claro.
- Etiquetado de controles y estructura semántica principal.
