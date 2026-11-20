# CLAUDE.md

Landing personal de Héctor Martín (CX & AI Solutions Architect). Una sola página
estática: HTML + CSS + JS vanilla. Sin npm, sin framework, sin build, sin backend.
Contenido y comentarios en español.

## Antes de tocar nada
Cada fichero empieza con "NOTAS DE TRASPASO": léelas primero, son la fuente de verdad.
- `index.html` → todo el contenido (textos, secciones, SEO/OG)
- `estilos/style.css` → todo el diseño, ordenado en "Parte 1…7" (busca "Parte N")
- `js/main.js` → extras: tema, menú móvil, sección activa, animaciones, volver arriba

## Ver en local
`python3 -m http.server` en la raíz → http://localhost:8000 (o abrir index.html).
No hay tests ni linter. Comprueba los cambios en el navegador: móvil y escritorio,
claro y oscuro, y con JS desactivado.

## Reglas que no se rompen
- **Colores**: siempre `var(--…)`. Nunca hex a mano. Una variable nueva va en los
  DOS bloques (`:root` y `:root[data-theme="dark"]`). Contraste mínimo de 4.5:1.
- **Tema oscuro**: lo controla `data-theme` en `<html>`, NO `prefers-color-scheme`
  (decisión intencionada). La clave `"tema"` de localStorage se usa en el script
  inline del `<head>` y en `main.js`: deben coincidir.
- **Mobile first**: estilos base para móvil; `@media (min-width: 48rem | 56rem)`.
- **Mejora progresiva**: todo visible y navegable sin JS.
- **Accesibilidad**: no borres aria-*, alt, skip-link ni textos para lectores de
  pantalla sin entender para qué sirven. Respeta `prefers-reduced-motion`.
  Texto visible y aria-label siempre sincronizados.
- **BEM** en las clases (`bloque__elemento--modificador`).
- **Ids de sección** = anclas del menú + JS. Si renombras un id o una clase, búscalo
  en los tres ficheros.
- No borres `fuentes/OFL-*.txt` (lo exige la licencia).
- Sin dependencias externas ni CDNs (fuentes locales por privacidad/RGPD).

## Datos duplicados (cambiar en todos los sitios)
- CV `imagenes/CV-Hector-Martin.pdf`: mismo nombre de fichero, enlazado en el hero y
  en contacto.
- Email: 2 veces en Contacto.
- Título y descripción: en `<title>`/meta description Y en las meta og:*.
- Año del copyright del footer: escrito a mano.

## Pendiente
- `og:url` y `og:image` están comentados hasta tener dominio (sustituir `TU-DOMINIO`).

## Forma de trabajar
- Explica qué vas a hacer y espera mi confirmación antes de modificar ficheros.
- No es un repo git: no hay historial para deshacer, ve con cuidado al editar.
