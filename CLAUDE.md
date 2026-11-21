# CLAUDE.md

Landing personal de Héctor Martín (CX & AI Solutions Architect). Una sola página
estática: HTML + Tailwind CSS + JS vanilla. Sin npm, sin framework JS, sin backend.
Contenido y comentarios en español.

> ⚠️ **Migración a Tailwind pendiente.** Los estilos actuales son CSS escrito a mano
> en `estilos/style.css`. Las reglas de abajo describen cómo debe quedar el
> proyecto. Hasta completar la migración, cualquier cambio de estilos se hace ya
> con Tailwind o se deja anotado para la migración; no añadas CSS nuevo a mano.

## Antes de tocar nada

Cada fichero empieza con "NOTAS DE TRASPASO": léelas primero, son la fuente de verdad.

- `index.html` → todo el contenido (textos, secciones, SEO/OG) y las clases de Tailwind
- `estilos/input.css` → entrada de Tailwind: `@import "tailwindcss"`, tema (`@theme`),
  variante oscura, `@font-face` y los pocos componentes propios (`@layer components`)
- `estilos/style.css` → CSS COMPILADO por Tailwind. No se edita a mano.
- `js/main.js` → extras: tema, menú móvil, sección activa, animaciones, volver arriba

## Compilar y ver en local

- Tailwind v4 con el **CLI standalone** (un único ejecutable, sin npm ni
  `node_modules`). El binario no se sube al repo (va en `.gitignore`).
- Compilar: `./tailwindcss -i estilos/input.css -o estilos/style.css --minify`
  (en desarrollo, `--watch` en lugar de `--minify`).
- Ver: `python3 -m http.server` en la raíz → http://localhost:8000.
- No hay tests ni linter. Comprueba los cambios en el navegador: móvil y escritorio,
  claro y oscuro, y con JS desactivado.

## Reglas que no se rompen

- **Tailwind**: los estilos se implementan con clases de utilidad de Tailwind en el
  HTML. Nada de CSS a mano fuera de `estilos/input.css`. Prohibido el CDN de
  Tailwind (`cdn.tailwindcss.com`): se compila en local.
- **Colores**: solo los tokens del tema (`bg-bg`, `text-text-muted`, `text-accent`…),
  definidos en `@theme` a partir de variables CSS. Nunca hex a mano ni valores
  arbitrarios tipo `bg-[#123456]`. Un color nuevo va en el tema claro Y en el oscuro.
  Contraste mínimo de 4.5:1.
- **Tema oscuro**: lo controla `data-theme="dark"` en `<html>`, NO
  `prefers-color-scheme` (decisión intencionada). En `input.css`:
  `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`
  y en el HTML se usa `dark:`. La clave `"tema"` de localStorage se usa en el script
  inline del `<head>` y en `main.js`: deben coincidir.
- **Mobile first**: clases sin prefijo = móvil; `md:` (48rem) y `lg:` (56rem,
  redefinido en `@theme` con `--breakpoint-lg: 56rem`). No uses `max-*:`.
- **Mejora progresiva**: todo visible y navegable sin JS. Lo que depende de JS se
  activa con la clase `js` en `<html>` (variante propia `js:` en `input.css`).
- **Accesibilidad**: no borres aria-\*, alt, skip-link ni textos para lectores de
  pantalla (`sr-only`) sin entender para qué sirven. Respeta
  `prefers-reduced-motion` (`motion-safe:` / `motion-reduce:`).
  Texto visible y aria-label siempre sincronizados.
- **Clases**: utilidades de Tailwind en el HTML. Si un patrón se repite mucho
  (p. ej. botones), se crea en `@layer components` con nombre BEM (`btn`,
  `btn--inverse`). Las clases e ids que usa `main.js` se mantienen aunque no
  tengan estilos.
- **Ids de sección** = anclas del menú + JS. Si renombras un id o una clase, búscalo
  en `index.html`, `input.css` y `main.js`.
- No borres `fuentes/OFL-*.txt` (lo exige la licencia).
- Sin dependencias externas ni CDNs en la web publicada (fuentes locales por
  privacidad/RGPD).

## Datos duplicados (cambiar en todos los sitios)

- CV `imagenes/CV-Hector-Martin.pdf`: mismo nombre de fichero, enlazado en el hero y
  en contacto.
- Email: 2 veces en Contacto.
- Título y descripción: en `<title>`/meta description Y en las meta og:\*.
- Año del copyright del footer: escrito a mano.

## Publicación

- Publicada con GitHub Pages (rama `main`, raíz) en
  https://hectormargar.github.io/mi-landing/ — cada push a `main` actualiza la web.
- GitHub Pages no compila: **compila Tailwind (`--minify`) y sube `estilos/style.css`
  en el mismo commit** que los cambios de HTML/`input.css`.
- `og:url` y `og:image` usan esa URL absoluta: si cambia el dominio, cámbialas.
- El repo es PÚBLICO: nunca subas contraseñas, claves de API ni datos de clientes
  (el historial de git es permanente). Casos siempre sin nombres de clientes.

## Forma de trabajar

- Explica qué vas a hacer y espera mi confirmación antes de modificar ficheros.
- Repo git público en GitHub (hectormargar/mi-landing, rama `main`): haz commit
  antes de cambios grandes y no hagas push sin que te lo pida.

## Requisitos de la landing page

- La página está desplegada y accesible desde una URL pública.
- La estructura HTML es semántica.
- El diseño es responsive.
- Los estilos deben ser implementados con Tailwind.
- El código está subido a un repositorio de GitHub.
- La página incluye las secciones mínimas.
