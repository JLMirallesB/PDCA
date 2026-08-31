# PDCA Lab

Sitio estático para GitHub Pages con un selector común de simuladores de formación en mejora de la calidad educativa.

## Simuladores

- **Parasuraman**: recorrido paso a paso, frase por frase, con animación sincronizada del punto percibido, el esperado y la distancia entre ambos.
- **Parasuraman Avanzado**: simulación dinámica con parámetros ponderados, ciclos automáticos y un caso guiado con evaluación.
  Se conserva de una versión anterior, pero resulta demasiado densa para la exposición: por eso no aparece en el selector de la portada.
  El único acceso es un botón dentro de la página de Parasuraman, y pide la contraseña `demo`.
- **PDCA**: definición guiada, visual principal del ciclo, tipologías de malfuncionamiento y dos juegos de repaso.
- **PVCA**: modo definición y modo malfuncionamiento por ausencia de fase.

Idiomas: español (`es`), valencià (`ca`) e inglés (`en`).

## Arquitectura

- Frontend: HTML + CSS + JavaScript modular. Sin backend ni dependencias.
- Navegación multipágina con un shell común (cabecera, selector de idioma y navegación activa).
- i18n centralizado en `assets/js/core/i18n.js`.
- Lógica por página en `assets/js/pages/`.
- Publicación automática en GitHub Pages con `.github/workflows/pages.yml`.

## Estructura de carpetas

```text
.
├── .github/workflows/pages.yml
├── .nojekyll
├── index.html
├── simulators/
│   ├── parasuraman.html
│   ├── parasuraman-avanzado.html
│   ├── pdca-equipo.html
│   └── pvca.html
└── assets/
    ├── favicon.svg
    ├── css/
    │   ├── base.css
    │   ├── home.css
    │   ├── parasuraman-simple.css
    │   ├── pdca.css
    │   ├── pvca.css
    │   └── simulator.css
    └── js/
        ├── core/
        │   ├── app-shell.js
        │   └── i18n.js
        └── pages/
            ├── home.js
            ├── parasuraman.js
            ├── parasuraman-advanced.js
            ├── pdca.js
            └── pvca.js
```

## Desarrollo local

Las páginas cargan sus scripts como módulos ES, y el navegador los bloquea bajo `file://`.
Abrir el `index.html` con doble clic muestra la maqueta, pero sin nada vivo: hace falta servirlo por `http://`.

```bash
./dev.sh          # levanta el servidor y abre el navegador
./dev.sh 8080     # en un puerto concreto
```

`dev.sh` es un fichero local, ignorado por git: no se versiona ni llega a GitHub Pages.
Si no está en tu copia, cualquier servidor estático sirve igual:

```bash
python3 -m http.server 8000
```

## Despliegue en GitHub Pages

1. Rama principal `main`.
2. En GitHub: `Settings > Pages > Build and deployment > Source: GitHub Actions`.
3. Cada push a `main` publica automáticamente.

URL publicada: <https://jlmirallesb.github.io/PDCA/>

## Cómo ampliar con nuevos modelos

1. Crea una página nueva en `simulators/`.
2. Añade la tarjeta de acceso en `index.html` (salvo que quieras un acceso discreto, como el de Parasuraman Avanzado).
3. Añade los textos de los 3 idiomas en `assets/js/core/i18n.js`.
4. Crea la lógica específica en `assets/js/pages/`.
5. Reutiliza el shell común con `initShell()`.

## Accesibilidad aplicada

- Navegación y controles operables con teclado; las pestañas siguen el patrón ARIA (`tab`/`tabpanel`, movimiento con flechas).
- El modal de PVCA atrapa el foco mientras está abierto y lo devuelve al cerrarse.
- Etiquetado de controles y estructura semántica de encabezados y regiones.
- Contraste visual funcional en tema claro.
- Se respeta `prefers-reduced-motion`.
