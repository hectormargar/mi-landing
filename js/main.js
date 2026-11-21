/* =========================================================
   main.js · Comportamiento de la landing
   ---------------------------------------------------------
   LÉEME PRIMERO (notas de traspaso)

   - JavaScript "vanilla": sin frameworks, sin librerías, sin build.
     Se edita este archivo y se recarga el navegador. Nada más.
   - Se carga desde <head> con `defer` (ver index.html), así que
     cuando se ejecuta el HTML ya está completo: no hace falta
     esperar a DOMContentLoaded.
   - La página FUNCIONA SIN JS (mejora progresiva). Este archivo
     solo añade extras: tema oscuro, menú móvil plegable, enlace
     activo en el menú y animaciones de aparición. Si algo de aquí
     falla, el contenido sigue siendo visible y navegable.
   - Secciones de este archivo:
       1. Tema claro / oscuro
       2. Menú móvil
       3. Sección activa en el menú
       4. Aparición suave al hacer scroll
       5. Botón "Volver arriba"
   - Si renombras clases o ids en el HTML, búscalas también aquí
     (querySelector) y en estilos/style.css.
   ========================================================= */

// La clase "js" en <html> (la que hace que el CSS muestre los botones Menú
// y ☀/☾ y pliegue el menú móvil) la pone el script inline del <head> de
// index.html, no este archivo: así se aplica antes del primer pintado y el
// menú no "parpadea" desplegado. Ver ".js .theme-toggle" y ".js .menu-toggle"
// en style.css.

/* ========== 1. TEMA CLARO / OSCURO ==========
   Cómo funciona:
   - El tema se guarda como atributo en <html>: data-theme="dark" | "light".
   - El CSS cambia las variables de color con :root[data-theme="dark"].
   - La elección se guarda en localStorage con la clave "tema".
   - OJO: hay un <script> pequeño en el <head> de index.html que lee esa
     misma clave ANTES de pintar la página, para evitar el "parpadeo"
     (ver la página en claro un instante y luego saltar a oscuro).
     Si cambias el nombre de la clave "tema", cámbialo en los DOS sitios.
   - Decisión de diseño: NO seguimos el modo oscuro del sistema operativo
     (prefers-color-scheme). Por defecto siempre es claro; oscuro solo si
     el visitante pulsa el botón.
*/
const root = document.documentElement; // el elemento <html>
const themeBtn = document.querySelector(".theme-toggle");

// Devuelve el tema activo. Si no hay atributo, es claro (el valor por defecto).
function temaActual() {
  return root.dataset.theme || "light";
}

// Actualiza el icono y el texto accesible del botón.
// El botón muestra el modo AL QUE vas a cambiar (en claro muestra ☾, la luna).
// El aria-label es lo que lee un lector de pantalla: mantenlo en sincronía
// con el icono, porque el icono por sí solo no se "lee" bien.
function pintarBoton() {
  const oscuro = temaActual() === "dark";
  themeBtn.textContent = oscuro ? "☀" : "☾";
  themeBtn.setAttribute(
    "aria-label",
    oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
  );
}

themeBtn.addEventListener("click", () => {
  const nuevo = temaActual() === "dark" ? "light" : "dark";
  root.dataset.theme = nuevo; // esto dispara el cambio de colores vía CSS
  try {
    localStorage.setItem("tema", nuevo); // se recuerda en la próxima visita
  } catch (e) {
    // localStorage puede fallar (modo incógnito estricto, cookies bloqueadas…).
    // No es grave: el tema cambia igual, solo que no se recordará.
    // Por eso el catch está vacío a propósito.
  }
  pintarBoton();
});

// Al cargar, ajusta el botón al tema que haya dejado el script del <head>.
pintarBoton();

/* ========== 2. MENÚ MÓVIL ==========
   Solo tiene efecto visual en pantallas estrechas (< 48rem ≈ 768px).
   En escritorio el botón "Menú" está oculto por CSS y la lista siempre visible.

   El estado abierto/cerrado se guarda en el atributo aria-expanded del botón
   ("true" / "false"). No hay variable JS ni clase "open": el propio CSS
   muestra la lista con las clases de Tailwind del HTML:
       botón:  class="peer …"
       lista:  class="… js:peer-aria-expanded:flex"
   ("peer-aria-expanded" = cuando un hermano anterior con la clase "peer"
   tiene aria-expanded="true"). OJO: en el HTML el <button class="menu-toggle">
   tiene que ir ANTES de <ul id="menu"> y dentro del mismo <nav>; si no, el
   menú dejará de abrirse.
*/
const menuBtn = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

// abrir = true abre el menú, false lo cierra.
// El texto visible y el aria-label se cambian SIEMPRE juntos: si no
// coinciden, el lector de pantalla diría una cosa y se vería otra
// (incumple WCAG 2.5.3 "Label in Name").
function abrirCerrarMenu(abrir) {
  const texto = abrir ? "Cerrar" : "Menú";
  menuBtn.setAttribute("aria-expanded", String(abrir));
  menuBtn.textContent = texto;
  menuBtn.setAttribute("aria-label", texto);
}

// Alterna: si estaba abierto lo cierra y viceversa.
menuBtn.addEventListener("click", () => {
  abrirCerrarMenu(menuBtn.getAttribute("aria-expanded") !== "true");
});

// Se cierra al elegir una sección…
// (Un único listener en la lista en vez de uno por enlace: "delegación de
// eventos". closest("a") cubre el caso de pulsar sobre un hijo del enlace.)
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) abrirCerrarMenu(false);
});

// …o con la tecla Escape (y el foco vuelve al botón).
// Devolver el foco es importante para quien navega con teclado:
// si no, el foco se "pierde" dentro de un menú que ya no se ve.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
    abrirCerrarMenu(false);
    menuBtn.focus();
  }
});

// …o al pulsar en cualquier sitio fuera del menú.
// Los clics DENTRO de la <nav> (el propio botón y la lista) se ignoran:
// de esos ya se encargan los listeners de arriba.
// Aquí no se devuelve el foco al botón: quien hace clic fuera ya ha
// elegido dónde quiere estar.
document.addEventListener("click", (e) => {
  if (
    menuBtn.getAttribute("aria-expanded") === "true" &&
    !e.target.closest(".nav")
  ) {
    abrirCerrarMenu(false);
  }
});

/* ========== 3. SECCIÓN ACTIVA EN EL MENÚ ==========
   Resalta en el menú el enlace de la sección que se está viendo.

   Cómo funciona: un IntersectionObserver vigila todas las
   <section id="..."> dentro de <main>. Cuando una cruza el centro de la
   pantalla, se busca el enlace del menú cuyo href sea "#<id de la sección>"
   y se le pone aria-current="true". El CSS colorea ese enlace
   (clase "aria-[current=true]:text-accent-text" en los enlaces del menú).

   Para añadir una sección nueva al menú:
     1. Dale un id a la <section> en index.html (ej. id="blog").
     2. Añade <li><a href="#blog">Blog</a></li> en <ul id="menu">.
   No hace falta tocar este JS. Las secciones con id que no tienen enlace
   en el menú (inicio, como-trabajo, contacto) simplemente quitan el
   resaltado a los demás, y eso es lo esperado.
*/
const enlaces = [...menu.querySelectorAll("a")];

const observadorSecciones = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      enlaces.forEach((a) => {
        if (a.getAttribute("href") === "#" + entrada.target.id) {
          a.setAttribute("aria-current", "true");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    });
  },
  // rootMargin recorta la "ventana de detección": quita el 45% de arriba y
  // el 50% de abajo, dejando una franja fina en el centro de la pantalla.
  // Así solo cuenta la sección que cruza el centro, no cualquiera que asome.
  // Si el resaltado cambia "demasiado pronto o tarde", ajusta estos valores.
  { rootMargin: "-45% 0px -50% 0px" }
);

document
  .querySelectorAll("main section[id]")
  .forEach((s) => observadorSecciones.observe(s));

/* ========== 4. APARICIÓN SUAVE AL HACER SCROLL ==========
   Los bloques aparecen con un fundido + leve desplazamiento hacia arriba
   cuando entran en pantalla por primera vez.

   Reparto de trabajo JS / CSS:
   - El JS añade la clase "reveal" (estado inicial: invisible) y, cuando el
     elemento entra en pantalla, la clase "is-visible" (estado final).
   - La animación en sí (opacity, transform, duración) está en style.css,
     "Parte 5". Para cambiar velocidad o efecto, toca el CSS, no esto.

   Solo se activa si el usuario no ha pedido reducir el movimiento
   (ajuste de accesibilidad del sistema operativo). Respétalo siempre.

   El hero (lo primero que se ve) no se anima a propósito: lo que se ve al
   cargar debe aparecer al instante, sin esperas.

   Para animar un elemento nuevo: añade su selector CSS a la lista de abajo.
*/
const sinMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!sinMovimiento) {
  const elementos = document.querySelectorAll(
    [
      ".credibility__list > div",
      ".section h2",
      ".section__intro",
      ".card",
      ".case",
      ".steps li",
      ".quote",
      ".timeline__legend",
      ".timeline__item",
      ".now",
      ".contact > *",
    ].join(",")
  );

  const observadorAparicion = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("is-visible");
        // Dejamos de vigilarlo: la animación ocurre solo la primera vez
        // (si vuelves a subir, el elemento no desaparece y reaparece).
        observadorAparicion.unobserve(entrada.target);
      });
    },
    // -8% abajo: el elemento empieza a aparecer cuando ya ha entrado un
    // poco en pantalla, no justo al asomar por el borde inferior.
    { rootMargin: "0px 0px -8% 0px" }
  );

  elementos.forEach((el) => {
    // Lo que ya está a la vista al cargar no se anima: como este archivo
    // lleva defer, el navegador puede haberlo pintado ya, y ocultarlo para
    // luego hacerlo aparecer produciría un parpadeo (se ve, desaparece y
    // vuelve). getBoundingClientRect().top < innerHeight = asoma en pantalla.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    // Cascada: tarjetas, pasos y bloques de la franja entran uno tras otro.
    // Se calcula la posición del elemento entre sus hermanos y se le da un
    // retraso de 80ms por posición. Math.min(…, 3) limita el retraso máximo
    // a 240ms para que el 5º, 6º… elemento no tarde demasiado.
    const hermanos = [...el.parentElement.children];
    const posicion = hermanos.indexOf(el);
    if (el.matches(".card, .steps li, .credibility__list > div")) {
      el.style.transitionDelay = `${Math.min(posicion, 3) * 80}ms`;
    }
    el.classList.add("reveal");
    observadorAparicion.observe(el);
  });
}

/* ========== 5. BOTÓN "VOLVER ARRIBA" ==========
   El botón (<a class="to-top"> en index.html) solo tiene sentido cuando ya
   no se ve el principio de la página. Un IntersectionObserver vigila el
   hero (#inicio): mientras asoma en pantalla, el botón está oculto; cuando
   sale, se le añade .to-top--visible y el CSS lo muestra ("Parte 7").

   El scroll suave y el salto a #inicio no son cosa del JS: el botón es un
   enlace normal y el desplazamiento animado lo da scroll-behavior en el CSS.
   Por eso sin JS funciona igual (solo que se ve siempre).
*/
const botonArriba = document.querySelector(".to-top");
const hero = document.getElementById("inicio");

new IntersectionObserver(([entrada]) => {
  botonArriba.classList.toggle("to-top--visible", !entrada.isIntersecting);
}).observe(hero);
