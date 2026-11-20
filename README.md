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

Una sola página 100 % estática, sin framework, sin dependencias y sin paso de build:

- **HTML** semántico con todo el contenido (`index.html`).
- **CSS** propio, mobile first, con variables para el tema claro y oscuro
  (`estilos/style.css`).
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
index.html          contenido, SEO y Open Graph
estilos/style.css   todo el diseño
js/main.js          comportamiento opcional
fuentes/            tipografías (.woff2) y sus licencias OFL
imagenes/           foto, imagen para redes, favicon, fondo y CV en PDF
```

Cada fichero empieza con unas **notas de traspaso** que explican cómo está
organizado y qué tener en cuenta antes de editarlo.

## Ver en local

```bash
python3 -m http.server
```

Y abre http://localhost:8000 (o directamente `index.html` en el navegador).

## Publicación

Se publica con **GitHub Pages** desde la rama `main`: cada push actualiza la web.

## Licencias

- Fuentes Inter y Fraunces: [SIL Open Font License 1.1](fuentes/) (ver `fuentes/OFL-*.txt`).
- Contenido, textos, foto y CV: © Héctor Martín. Todos los derechos reservados.
