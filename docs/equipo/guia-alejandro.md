# Guía de Alejandro · Interfaz y diseño

> **Para la IA que acompaña a Alejandro:** este documento es tu hoja de ruta. Antes de proponer cualquier cosa, lee `AGENTS.md`, `docs/equipo/README.md`, `docs/diseno.md` y la skill indicada en cada tarea. Si algo de aquí contradice `AGENTS.md`, gana `AGENTS.md`. Si una tarea te pide inventar un dato, un color o una medida, detente y pregunta.

---

## Estado al 7 de noviembre de 2026

Según los PR del repositorio en esa fecha. Lo que no aparece en esta tabla está pendiente.

| Tarea | Estado | Referencia |
|---|---|---|
| A1 · Proyecto Next.js como PWA | Fusionada | PR 15 |
| A2 · Tipografías alojadas | Fusionada | PR 28 |
| A3 · Componentes base y `/componentes` | Revisión visual hecha por el líder. Falta el CI (el PR viene de tu copia del repositorio y hay que aprobar la ejecución en GitHub) y la fusión | PR 49 |
| A4 · Despliegue en Cloudflare | Despliegue fusionado (PR 32) y ADR 0003 aceptado con reservas (PR 33). La medición de 4G lenta está en el PR 52, abierto. Falta medir el tiempo de CPU, que solo ve el líder en Cloudflare | PR 52 |
| A5 · Ficha de carrera | Fusionada como borrador. Falta revisar a 360 px, con teclado y con lector de pantalla | PR 35 |
| A6 · Explorador de carreras | Fusionado como borrador | PR 36 |
| A7 · Comparador | Abierto. Ya están aplicadas las correcciones de la revisión. Queda el breakpoint `64rem` escrito a mano: el líder lo dejó como pendiente, para resolverlo con un token y su ADR. Falta el CI | PR 57 |
| A8 · Simulador de puntaje (pantallas) | Bloqueado: necesita el cálculo de puntaje de Cristóbal | PR 61 |
| A9 a A14 | Pendientes | — |

**Próximos pasos:**
1. Probar la ficha de carrera y el comparador en el sitio: 360 px, teclado y lector de pantalla. Anota lo que falle.
2. Coordinar con el líder la aprobación del CI de los PR 49, 52 y 57, que vienen de tu copia del repositorio.
3. Cuando el PR 61 esté aprobado, empezar el simulador (A8).

---

## ⚠️ Urgente (esta semana)

1. **Actualiza tu rama `feat/comparador` (PR 57) con `main`.** El CI falla porque el comparador usa `lucide-react`, que llegó con el PR 49 ya fusionado. Haz `git merge origin/main` en la rama y vuelve a correr `npm run build`.
2. **Prueba la ficha y el comparador en el sitio** a 360 px, con teclado y con lector de pantalla. Pásame la lista de fallos ordenada por gravedad.
3. **El simulador (A8) está bloqueado** hasta que el PR 61 de Cristóbal esté aprobado. No empieces el simulador antes.

---

## 1. Tu rol en una frase

Construyes todo lo que el estudiante ve y toca: que cualquier persona, en cualquier teléfono y con cualquier conexión, entienda la plataforma sin ayuda.

**Te toca:** pantallas, componentes, estilos (con tokens), accesibilidad, rendimiento, instalación como app (PWA), despliegue de la parte web.

**No te toca** (pídeselo a quien corresponde):
- Datos oficiales y textos finales → Cristóbal.
- Base de datos, autenticación, asistente IA, claves → el líder.
- Fórmulas de puntaje y ranking → Cristóbal (tú solo las usas).

---

## 2. Lo que debes dominar antes de la primera tarea

Lee completos, en este orden (unos 40 minutos):

1. [`AGENTS.md`](../../AGENTS.md), sobre todo las secciones 2.5 (diseño) y 2.6 (accesibilidad).
2. [`docs/diseno.md`](../diseno.md): la idea "Mapa de trayecto" y por qué cada color, letra y medida existe.
3. [`.claude/skills/mapa-de-trayecto/SKILL.md`](../../.claude/skills/mapa-de-trayecto/SKILL.md): tus reglas de trabajo.
4. [`.claude/skills/lenguaje-claro/SKILL.md`](../../.claude/skills/lenguaje-claro/SKILL.md): cómo se escriben botones y mensajes.
5. [`docs/arquitectura.md`](../arquitectura.md): dónde va cada cosa.

**Tres ideas que guían todo tu trabajo:**

1. **La persona con menos recursos es la medida.** Si funciona en un teléfono básico, con datos móviles lentos y para alguien que nunca ha postulado, funciona para todos.
2. **Nada visual "porque se ve bonito".** Si agregas algo, debes poder decir cuál de las cuatro razones lo justifica: accesibilidad medible, comprensión, rendimiento o identidad.
3. **Solo tokens.** Cada color, tamaño y espacio sale de `diseno/tokens.css`. Si necesitas uno que no existe, se pide con un ADR, no se inventa.

---

## 3. Tus tareas

Cada tarea tiene: objetivo, pasos, archivos, criterios de aceptación (lo que se revisa) y un texto para copiar a tu IA. Hazlas en orden: varias dependen de la anterior.

### Semana 1 · Cimientos (3 al 9 de noviembre)

#### A1 · Crear el proyecto Next.js como PWA
**Rama:** `feat/proyecto-nextjs` · **Skill:** `mapa-de-trayecto`

**Objetivo:** que exista la aplicación web vacía, con los tokens de diseño conectados e instalable como app.

**Pasos:**
1. Crea el proyecto Next.js con TypeScript, App Router y ESLint en la raíz del repositorio (no en una subcarpeta). Respeta la estructura de `AGENTS.md` sección 3: `app/`, `lib/`, `public/`.
2. Instala Tailwind CSS en su versión estable vigente y haz que lea las variables de `diseno/tokens.css` (los colores de Tailwind deben ser `var(--color-…)`, no sus colores por defecto). Desactiva la paleta por defecto de Tailwind para que nadie pueda usar `text-blue-600` por error.
3. Importa `diseno/tokens.css` en los estilos globales.
4. Crea el manifiesto de la PWA (`app/manifest.ts`) con:
   - nombre: "Agencia de Enlace & Seguimiento Estudiantil", nombre corto: "Agencia de Enlace"
   - idioma `es-CL`, `display: standalone`
   - `theme_color` y `background_color` tomados de los tokens (`linea` y `fondo` del modo claro)
   - íconos de `public/iconos/` (192, 512 y el 512 adaptable con `purpose: "maskable"`)
5. En el `<head>`: favicon (`public/iconos/favicon.svg` y `favicon-32.png`), ícono de iPhone (`apple-touch-icon.png`), `lang="es-CL"`.
6. Página de inicio mínima: logo (`public/marca/logo-horizontal.svg` con texto alternativo) y un título.
7. Agrega al `README.md` los comandos `npm run dev`, `npm run build`, `npm run lint`.
8. En `tsconfig.json` activa `"allowImportingTsExtensions": true` (Next.js ya trae `"noEmit": true`, que esta opción necesita). **Por qué:** el código de `lib/ia/` importa sus módulos con la extensión `.ts` (`./crisis.ts`) para que las pruebas corran directo con Node, sin compilar. Sin esta opción, `npm run build` falla. Agrega también `"test": "node --test \"tests/**/*.test.ts\""` a los scripts de `package.json`.

**Criterios de aceptación:**
- [ ] `npm run build` y `npm run lint` terminan sin errores.
- [ ] Ningún color de Tailwind por defecto disponible: `text-blue-600` no produce estilos.
- [ ] Chrome en Android ofrece "Instalar app" y el ícono se ve bien.
- [ ] La página cambia a modo oscuro si el teléfono está en modo oscuro.
- [ ] `.env.local` está ignorado por git (ya está en `.gitignore`; no lo borres).
- [ ] `npm test` pasa todas las pruebas de `tests/` (protocolo de crisis y asistente). Si alguna falla después de crear el proyecto, avísale al líder antes de tocar `lib/ia/`.

**Texto para tu IA:**
> Lee AGENTS.md y docs/diseno.md. Crea un proyecto Next.js con TypeScript, App Router y ESLint en la raíz del repositorio actual, respetando la estructura de AGENTS.md sección 3. Configura Tailwind para que sus colores, espacios, radios y tipografías salgan solo de las variables CSS de diseno/tokens.css, desactivando la paleta por defecto. Crea app/manifest.ts para PWA con los íconos de public/iconos y colores de los tokens. En tsconfig.json activa allowImportingTsExtensions, porque lib/ia/ importa con extensión .ts, y agrega el script "test": "node --test \"tests/**/*.test.ts\"". No modifiques nada dentro de lib/ia/ ni tests/. No agregues librerías que no te pida. Al final, dime cada archivo creado y por qué.

---

#### A2 · Tipografías alojadas en el proyecto
**Rama:** `feat/tipografias` · **Skill:** `mapa-de-trayecto`

**Objetivo:** que Atkinson Hyperlegible Next (texto) y Atkinson Hyperlegible Mono (cifras) carguen desde nuestro propio servidor, livianas y con todos los caracteres del español.

**Pasos:**
1. Descarga ambas familias desde el sitio del Braille Institute (https://www.brailleinstitute.org/freefont/) o desde Google Fonts.
2. **Lee el archivo de licencia** que viene con las fuentes (normalmente `OFL.txt`). Cópialo a `public/fuentes/LICENCIA-OFL.txt`. Anota en el PR qué licencia es y si permite uso comercial.
3. Usa solo formato `woff2`, solo pesos 400 y 700 (`docs/diseno.md`, sección 3.2) y, si puedes, un subconjunto latino para reducir peso.
4. Declara las `@font-face` con `font-display: swap` (el texto se ve de inmediato con la fuente del sistema mientras carga la nuestra) y precarga solo la fuente de texto regular.
5. Crea la página `/prueba-tipografia` con: todas las vocales con tilde (á é í ó ú Á É Í Ó Ú), ü, ñ, Ñ, ¿ ¡, comillas « », el símbolo $ y números con separador de miles (`$4.250.000`), un párrafo largo y una tabla de cifras en Mono.
6. Marca como hecho el pendiente de `docs/diseno.md` sección 10 sobre cobertura de caracteres, o anota qué falta.

**Criterios de aceptación:**
- [ ] Ninguna petición a Google Fonts u otro servidor externo al cargar la página (revísalo en la pestaña Red del navegador).
- [ ] Todos los caracteres de la página de prueba se ven con la fuente correcta (sin "cuadritos" ni cambio de fuente).
- [ ] Peso total de las fuentes cargadas en la portada: menos de 100 KB.
- [ ] Licencia copiada y declarada en el PR.

**Texto para tu IA:**
> Lee docs/diseno.md sección 3. Configura las tipografías Atkinson Hyperlegible Next (pesos 400 y 700) y Atkinson Hyperlegible Mono (400) alojadas en public/fuentes en formato woff2, con @font-face y font-display: swap, sin usar Google Fonts en línea. Conecta las familias a las variables --fuente-texto y --fuente-cifras de diseno/tokens.css. Crea la página /prueba-tipografia con todos los caracteres del español y cifras en pesos chilenos. Explica cuánto pesa cada archivo.

---

#### A3 · Componentes base y página de muestra
**Rama:** `feat/componentes-base` · **Skills:** `mapa-de-trayecto`, `lenguaje-claro`

**Objetivo:** las piezas que todas las pantallas reutilizan, en un solo lugar y documentadas.

**Componentes** (en `app/_componentes/` o donde defina el líder):

| Componente | Qué debe cumplir |
|---|---|
| `Boton` | Variantes `principal` (relleno coral, texto tinta) y `secundario` (borde azul). Alto mínimo 44 px. Foco visible. Estado deshabilitado que se entienda sin color (texto y cursor). |
| `Enlace` | Color `linea-texto`, subrayado siempre (no solo al pasar el mouse: en el teléfono no hay mouse). Enlaces externos con ícono y texto oculto "se abre en otra pestaña". |
| `Encabezado` | Logo con texto alternativo, navegación, y el **indicador de estación** (abajo). |
| `IndicadorEstacion` | Línea de 4 px con 4 estaciones: 1 Explorar, 2 Postular, 3 Llegar, 4 Avanzar. Cada una con número + nombre + color; la actual marcada con "Estás aquí". En pantallas de 360 px debe caber (puede mostrar solo números y el nombre de la actual). Debe anunciarse bien con lector de pantalla (`aria-current="step"`). |
| `DatoOficial` | Cifra grande en `--fuente-cifras` + qué mide + período + "Fuente: X" con enlace. Variante "Sin datos suficientes" con explicación. **Nunca muestra 0 cuando no hay dato.** |
| `Aviso` | Para éxito, error y alerta de plazo. Siempre ícono + palabra + color (nunca solo color). Los errores dicen qué pasó y cómo arreglarlo. |
| `PiePagina` | Enlaces a privacidad, fuentes y contacto. |

**Pasos:**
1. Construye cada componente usando solo variables de tokens.
2. Crea la página `/componentes` que muestre cada uno en todas sus variantes, en modo claro y oscuro. Esta página es la guía viva para el resto del equipo.
3. Íconos: solo de la librería Lucide (licencia ISC), siempre acompañados de texto.

**Criterios de aceptación:**
- [ ] Ningún valor hexadecimal, `px` de tipografía ni espacio escrito a mano en los componentes (búscalo con `grep -rn "#[0-9A-Fa-f]\{6\}" app/`).
- [ ] Todo se puede usar solo con teclado (Tab, Enter, Espacio, Esc) y el foco siempre se ve.
- [ ] Probado con lector de pantalla (TalkBack en Android o VoiceOver en iPhone): el indicador de estación dice en qué estación estás.
- [ ] Probado a 360 px de ancho y con el texto del teléfono al 200%.
- [ ] Revisión automática con axe (extensión axe DevTools o Lighthouse): sin errores.

**Texto para tu IA:**
> Lee docs/diseno.md y las skills mapa-de-trayecto y lenguaje-claro. Crea los componentes Boton, Enlace, Encabezado, IndicadorEstacion, DatoOficial, Aviso y PiePagina según la tabla de mi guía (docs/equipo/guia-alejandro.md, tarea A3), usando solo variables de diseno/tokens.css. Accesibles con teclado y lector de pantalla, objetivos táctiles de 44 px, foco visible. Crea la página /componentes que muestre todas las variantes. No inventes colores ni medidas; si falta un token, dímelo.

---

#### A4 · Prueba de despliegue en Cloudflare (con el líder)
**Rama:** `chore/despliegue-cloudflare` · **Decisión relacionada:** [ADR 0003](../decisiones/0003-hosting-cloudflare.md)

**Objetivo:** confirmar que Next.js funciona en el plan gratuito de Cloudflare antes de construir más. El ADR 0003 quedó "aceptada con reservas" el 2026-11-05; ver sus reservas.

**Pasos:**
1. **No necesitas cuenta de Cloudflare ni acceso a la del líder.** El líder conecta el repositorio de AE-SE a su cuenta de Cloudflare y el sitio se despliega solo cada vez que se fusiona a `main`. Así nadie del equipo maneja credenciales de la agencia. **Tú no creas cuentas a nombre de la agencia.**
2. Configura el adaptador oficial de Next.js para Cloudflare (busca la documentación vigente de Cloudflare para Next.js; anota en el PR qué adaptador y versión usaste). Escribe en el PR los comandos exactos de compilación y despliegue: el líder los copia en el panel de Cloudflare.
3. Prepara dos páginas: una estática (la de componentes) y una con algo dinámico (por ejemplo, la fecha del servidor). Pruébalas primero con la vista previa local del adaptador, que simula el entorno de Cloudflare en tu computador. Cuando el líder fusione tu PR, se despliegan solas y el líder te pasa la dirección `*.workers.dev`.
4. Sobre esa dirección, mide: tiempo de carga en un teléfono con red "4G lenta" simulada (herramientas de desarrollo de Chrome) y si alguna función supera el límite de CPU del plan gratuito.
5. Escribe los resultados en un comentario de tu PR (o en un PR corto de seguimiento si ya se fusionó). El líder actualiza el ADR 0003 a "aceptada" o lo reemplaza.

**Criterios de aceptación:**
- [ ] URL de prueba funcionando.
- [ ] Mediciones anotadas en el PR.
- [ ] Ninguna clave en el repositorio (las variables de entorno se configuran en el panel de Cloudflare).

---

### Semana 2 · Explorar (10 al 16 de noviembre)

> Mientras la base de datos no esté lista, trabaja con los **archivos de ejemplo** que entrega Cristóbal en `datos/ejemplos/`. Cuando el líder conecte la base, solo cambias de dónde vienen los datos, no las pantallas.

#### A5 · Ficha de carrera
**Rama:** `feat/ficha-carrera` · **Skills:** `mapa-de-trayecto`, `datos-oficiales`, `lenguaje-claro`

**Objetivo:** la pantalla más importante de la plataforma: todo lo que hay que saber de una carrera en una institución, en un solo lugar.

**Contenido, en este orden** (lo más decisivo primero):
1. Nombre de la carrera, institución, sede y comuna. Acreditación de la institución (años y hasta cuándo).
2. Bloques de datos (`DatoOficial`): empleabilidad al 1.er año, ingreso promedio al 4.º año, arancel anual, matrícula, duración formal y duración real, puntaje de corte del año anterior, vacantes.
3. Ponderaciones de la prueba (si es carrera con PAES), en una tabla.
4. Botón principal: **"Comparar con otra carrera"**. Secundario: "Simular mi puntaje para esta carrera".
5. Bloque "¿De dónde salen estos datos?" con fuentes y fechas.

**Reglas especiales:**
- Cada cifra muestra qué mide y su período. Ejemplo: "78 % · tenía trabajo al primer año · titulados 2023 · Fuente: SIES".
- Sin dato → "Sin datos suficientes" + por qué. Nunca 0, nunca vacío.
- La página se genera como estática (para que cargue rápido y Google la encuentre).
- URL legible: `/carreras/[institucion]/[carrera]-[sede]`.

**Criterios de aceptación:**
- [ ] Probada con al menos 3 carreras reales de los datos de ejemplo, incluida una con datos faltantes.
- [ ] Carga completa en menos de 3 segundos con "4G lenta" simulada.
- [ ] Puntuación de Lighthouse en móvil: Accesibilidad 100, Rendimiento 90 o más.
- [ ] Ninguna institución destacada por sobre otra (neutralidad, `AGENTS.md` sección 1).

**Texto para tu IA:**
> Lee docs/diseno.md, las skills mapa-de-trayecto, datos-oficiales y lenguaje-claro, y la tarea A5 de docs/equipo/guia-alejandro.md. Construye la página de ficha de carrera usando los componentes de /componentes y los datos de datos/ejemplos/. Cada cifra con qué mide, período y fuente; sin dato se muestra "Sin datos suficientes" con su motivo. Genera las páginas como estáticas. No escribas ningún dato a mano en el código.

---

#### A6 · Explorador de carreras
**Rama:** `feat/explorador` · **Skills:** `mapa-de-trayecto`, `lenguaje-claro`

**Objetivo:** encontrar carreras sin saber el nombre exacto.

- Búsqueda por texto que tolere tildes y errores comunes ("enfermeria" encuentra "Enfermería").
- Filtros: región, tipo de institución (universidad, instituto profesional, centro de formación técnica), área, jornada, rango de arancel. Los filtros se explican: "Instituto profesional (IP): carreras profesionales y técnicas, sin licenciatura".
- Orden: por defecto alfabético. Otros órdenes solo con criterio explícito (empleabilidad, arancel, puntaje de corte) y anunciado en pantalla.
- Resultados en tarjetas con 2 o 3 datos clave y enlace a la ficha.
- Estado vacío útil: "No encontramos carreras con esos filtros. Prueba quitando la región."

**Criterios de aceptación:**
- [ ] Los filtros funcionan con teclado y lector de pantalla, y el número de resultados se anuncia.
- [ ] El orden por defecto nunca favorece instituciones (alfabético o por criterio declarado).
- [ ] Funciona bien con 10.000 resultados (paginación o carga progresiva).

---

#### A7 · Comparador
**Rama:** `feat/comparador` · **Skill:** `mapa-de-trayecto`

- Hasta 3 carreras lado a lado. En 360 px: columnas desplazables con la primera columna (nombre del indicador) fija.
- Filas: los mismos indicadores de la ficha, mismo orden.
- Cifras alineadas a la derecha, en `--fuente-cifras`, con unidades en el encabezado.
- Si dos indicadores son de períodos distintos, se advierte en la fila.
- Se puede compartir por enlace (las carreras van en la URL, **nunca datos personales**).

---

#### A8 · Simulador de puntaje y ranking (pantallas)
**Rama:** `feat/simulador-pantallas` · **Skills:** `mapa-de-trayecto`, `lenguaje-claro`

**Objetivo:** las pantallas del simulador. **Las fórmulas las programa Cristóbal en `lib/calculos/`; tú solo llamas a sus funciones.** Nunca copies una fórmula dentro de un componente.

- Paso 1: notas de enseñanza media (NEM) y datos para el ranking, con explicación simple de cada término la primera vez.
- Paso 2: puntajes de las pruebas PAES (o "aún no la doy": se puede simular con puntajes estimados, avisando que es estimación).
- Paso 3: elegir carreras → puntaje ponderado de cada una comparado con el puntaje de corte del año anterior, con el mensaje correcto: "El año pasado el último matriculado tuvo X. Con tus puntajes simulados tendrías Y." **Nunca "quedas" o "no quedas".**
- Validación amable: rangos válidos y errores que dicen cómo corregir.
- Nada se guarda si la persona no inició sesión.

---

### Semana 3 · Acompañar (17 al 23 de noviembre)

#### A9 · Pantalla del asistente
**Rama:** `feat/asistente-pantalla` · **Skills:** `asistente-seguro`, `lenguaje-claro`

- Interfaz de conversación sencilla, legible en 360 px, que funcione con teclado.
- Cada respuesta del asistente muestra sus fuentes con enlace.
- Aviso permanente y breve: "Respondo con información oficial. No reemplazo a un profesional."
- **Mensaje de crisis:** cuando el sistema (programado por el líder) devuelve el protocolo de crisis, la pantalla lo muestra destacado, con los números **\*4141** y **600 360 7777** como enlaces que llaman directo (`tel:`), y sin distracciones alrededor. Coordina el diseño exacto con el líder: **no cambies el texto del protocolo.**
- Botón "Hablar con una persona" siempre visible.

#### A10 · Registro y consentimientos
**Rama:** `feat/registro-consentimiento` · **Skills:** `asistente-seguro`, `lenguaje-claro`

- Formularios con el mínimo de campos que defina el líder (`docs/privacidad.md`).
- Consentimientos **separados y sin casillas premarcadas**, cada uno con explicación simple de qué se comparte, con quién y cómo revocarlo.
- Flujo para menores de 18: pedir datos del adulto responsable para la autorización.
- Pantalla "Mis datos": ver, descargar, corregir y eliminar.

#### A11 · Beneficios y calendario
**Rama:** `feat/beneficios-calendario` · **Skills:** `mapa-de-trayecto`, `datos-oficiales`

- Buscador de beneficios con datos de Cristóbal: requisitos explicados simple, fuente y fecha.
- Calendario de plazos ordenado por fecha, con los que vencen pronto destacados (ícono + palabra, no solo color).
- Opción "Agregar a mi calendario" (archivo `.ics`, sin enviar datos a terceros).

#### A15 · "¿En qué estación va el proceso?" en la portada
**Rama:** `feat/estacion-del-proceso` · **Skills:** `mapa-de-trayecto`, `datos-oficiales`, `lenguaje-claro`
**Depende de:** la tarea C14 de Cristóbal (fechas de la Admisión 2027 con el campo `estacion`).

**Objetivo:** que quien entra a la portada vea de inmediato en qué estación va el proceso de admisión este año y cuál es el próximo plazo. Responde a la pregunta "¿llego a tiempo?" sin tener que buscar.

**Pasos:**
1. Una función pura en `lib/calendario/` que reciba la fecha de hoy y las filas de `datos/calendario/admision_2027.json` y `datos/beneficios/plazos_2027.json`, y devuelva la estación actual y el próximo plazo. Las fechas en `null` nunca cuentan como vencidas ni como próximas: se muestran como "fecha por confirmar". Con pruebas: antes del primer plazo, un día de plazo, el día de término, entre dos etapas y después del último.
2. En la portada, reutiliza la línea de trayecto de [`IndicadorEstacion`](../../app/_componentes/IndicadorEstacion.tsx) con sus cuatro estaciones (Explorar, Postular, Llegar, Avanzar), marcando la estación del proceso. Debajo, el próximo plazo con su fecha, su fuente y la fecha de consulta.
3. **Movimiento:** solo para mostrar el avance de la línea hasta la estación actual, con las duraciones de `tokens.css` (150 o 220 ms). Nada decorativo: ni estaciones del año, ni partículas, ni animaciones en bucle (`docs/diseno.md`, sección 7). Con `prefers-reduced-motion`, la línea aparece ya avanzada.
4. Que se entienda sin color: la estación actual se marca con texto ("El proceso va aquí") e ícono, no solo con coral.

**Criterios de aceptación:**
- [ ] Funciona a 360 px y con teclado; el lector de pantalla anuncia la estación actual y el próximo plazo.
- [ ] Toda fecha muestra fuente y fecha de consulta.
- [ ] Ninguna fecha escrita en el código: todo sale de los archivos de datos.
- [ ] Pruebas de la función de fechas pasan.
- [ ] Solo variables de `tokens.css`; `python3 scripts/tokens.py --check` pasa.
- [ ] Sin movimiento con `prefers-reduced-motion`.

---

### Semana 4 · Seguir y vender (24 al 30 de noviembre)

#### A12 · Paneles (pantallas)
**Rama:** `feat/paneles-pantallas`

- Panel de agencia: lista de estudiantes en seguimiento, señales de alerta, notas. Datos de prueba **ficticios**.
- Panel institucional (demo): resumen de cohortes, solo de estudiantes que dieron consentimiento. Etiqueta visible "Datos de demostración".
- Tablas accesibles: encabezados reales (`<th>`), ordenables con teclado.

#### A13 · Auditoría de accesibilidad y rendimiento
**Rama:** `fix/auditoria-final` · **Skill:** `mapa-de-trayecto`

Recorre **todas** las pantallas y deja un informe en `docs/auditoria-accesibilidad.md`:

| Revisión | Herramienta | Meta |
|---|---|---|
| Automática | axe DevTools, Lighthouse | 0 errores, Accesibilidad 100 |
| Teclado | Manual | Todo alcanzable y operable, foco siempre visible |
| Lector de pantalla | TalkBack (Android) y/o VoiceOver | Cada pantalla se entiende sin verla |
| Zoom | Texto del teléfono al 200% | Nada se corta ni se superpone |
| Ancho mínimo | 360 px | Sin desplazamiento horizontal (salvo el comparador) |
| Rendimiento | Lighthouse móvil, "4G lenta" | 90 o más; menos de 3 s de carga |
| Modo oscuro | Teléfono en modo oscuro | Todo legible |

Corrige lo que encuentres y anota lo que quede pendiente.

#### A14 · Pruebas con usuarios (con Cristóbal)
Cristóbal organiza las sesiones (tarea C11). Tú observas y anotas problemas de interfaz, y los corriges en ramas `fix/…`.

---

## 4. Antes de abrir cada PR

- [ ] La tarea cumple **todos** sus criterios de aceptación.
- [ ] `npm run build`, `npm run lint` y `python3 scripts/tokens.py --check` pasan.
- [ ] Probado a 360 px, con teclado y en modo oscuro.
- [ ] Sin colores, tamaños ni espacios escritos a mano.
- [ ] Textos revisados con la skill `lenguaje-claro` (o pedidos a Cristóbal).
- [ ] Capturas de pantalla en el PR (teléfono y escritorio).
- [ ] Plantilla del PR completa, incluida la IA que usaste.
- [ ] Leíste y entiendes todo el código, incluido el que escribió tu IA.

## 5. Errores comunes que hacen rechazar un PR

| Error | Por qué se rechaza | Cómo evitarlo |
|---|---|---|
| `color: #333` o `text-gray-700` | Rompe el sistema de diseño y el modo oscuro | Solo `var(--color-…)` |
| Ícono sin texto | Ambiguo para muchas personas | Ícono + palabra |
| `outline: none` | Quien usa teclado se pierde | Foco con `--anillo-foco` |
| Botón "Continuar" o "Aceptar" | No dice qué pasa al tocarlo | Verbo + resultado |
| Mostrar 0 cuando no hay dato | Información falsa | "Sin datos suficientes" |
| Librería nueva sin justificar | Peso, seguridad y licencias | Justificarla en el PR o no usarla |
| Datos de ejemplo con nombres reales | Privacidad | Siempre ficticios |
