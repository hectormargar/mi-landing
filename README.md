# Héctor Martín · CX & AI Solutions Architect

Landing personal: arquitectura de Contact Center e IA conversacional, del reto de
negocio a la solución en producción.

**🌐 Web:** https://hectormargar.github.io/mi-landing/

## Qué contiene

- **Inicio**: presentación y descarga del CV.
- **Qué hago**: áreas de trabajo.
- **Casos**: proyectos reales (sin nombres de clientes; esquemas conceptuales).
- **Cómo trabajo** y **Trayectoria**.
- **Contacto**: email, LinkedIn y CV.

## Tecnología

Una sola página 100 % estática, sin framework JS, sin npm y sin backend:

- **HTML** semántico con todo el contenido (`index.html`).
- **Tailwind CSS v4**, mobile first: clases de utilidad en el HTML y un tema
  propio con colores para el modo claro y oscuro (`estilos/input.css`).
  Se compila en local con el CLI standalone de Tailwind (sin npm ni CDN) y se
  publica el CSS ya compilado (`estilos/style.css`).
- **JavaScript vanilla** solo para extras: tema, menú móvil, sección activa,
  animaciones y botón "volver arriba" (`js/main.js`).
- Fuentes **Inter** y **Fraunces** alojadas en local (sin Google Fonts ni CDNs,
  por privacidad).

Principios que sigue:

- **Mejora progresiva**: la página se ve y se navega entera sin JavaScript.
- **Accesibilidad**: skip-link, textos para lectores de pantalla, contraste
  mínimo 4.5:1 y respeto a `prefers-reduced-motion`.
- **Sin rastreo**: no hay analítica, cookies ni peticiones a terceros.

## Estructura

```
index.html          contenido, SEO, Open Graph y clases de Tailwind
estilos/input.css   entrada de Tailwind: tema, estilos base y componentes
estilos/style.css   CSS compilado por Tailwind (no se edita a mano)
js/main.js          comportamiento opcional
fuentes/            tipografías (.woff2) y sus licencias OFL
imagenes/           foto, imagen para redes, favicon, fondo y CV en PDF
```

Cada fichero empieza con unas **notas de traspaso** que explican cómo está
organizado y qué tener en cuenta antes de editarlo.

## Compilar y ver en local

Descarga el [CLI standalone de Tailwind v4](https://github.com/tailwindlabs/tailwindcss/releases)
para tu sistema, renómbralo a `tailwindcss` en la raíz del proyecto (no se sube
al repo) y:

```bash
./tailwindcss -i estilos/input.css -o estilos/style.css --watch   # desarrollo
./tailwindcss -i estilos/input.css -o estilos/style.css --minify  # para publicar
python3 -m http.server
```

Y abre http://localhost:8000.

## Publicación

Se publica con **GitHub Pages** desde la rama `main`: cada push actualiza la web.
GitHub Pages no compila: sube `estilos/style.css` compilado (`--minify`) en el
mismo commit que los cambios de HTML o `input.css`.

## Licencias

- Fuentes Inter y Fraunces: [SIL Open Font License 1.1](fuentes/) (ver `fuentes/OFL-*.txt`).
- Contenido, textos, foto y CV: © Héctor Martín. Todos los derechos reservados.
