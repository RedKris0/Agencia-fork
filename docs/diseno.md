# Sistema de diseño · "Mapa de trayecto", base visual Andén urbano

> Regla de este proyecto: **ningún elemento visual existe porque "se ve bonito"**. Cada color, letra, espacio y borde responde a una de estas cuatro razones, y aquí queda escrita cuál:
>
> 1. **Accesibilidad medible** (WCAG 2.2, daltonismo, legibilidad).
> 2. **Comprensión** (que una persona sin ayuda entienda qué hacer).
> 3. **Rendimiento** (teléfonos básicos, datos móviles limitados).
> 4. **Identidad** (el concepto propio y el logo de la agencia).
>
> Si una propuesta no puede justificarse con una de las cuatro, no entra.

> **Decisión del líder (11-nov-2026): el indicador mantiene las 4 estaciones** («Explorar → Postular → Llegar → Avanzar»). El alcance vigente ([ADR 0031](decisiones/0031-producto-y-organizacion.md)) cubre «Explorar» y «Postular»; «Llegar» y «Avanzar» quedan como etapas futuras, sin pantallas por ahora, y se mostrarán como próximas (con texto, no solo color) hasta que exista el trabajo de permanencia. Los tokens `estacion-*` y el componente `IndicadorEstacion` no cambian.

La idea (la línea de metro) está en la sección 1. La base visual vigente, **Andén urbano** (fondo blanco, superficies azul marino en modo oscuro, tokens de movimiento), se decidió en el [ADR 0029](decisiones/0029-base-visual-anden-urbano.md) y reemplaza la paleta crema anterior.

Fuente de verdad de los valores: [`diseno/tokens.json`](../diseno/tokens.json). El CSS se genera y verifica con `python3 scripts/tokens.py`.

---

## 1. La idea central

**La trayectoria del estudiante es una línea de transporte con estaciones.**

La señalética del transporte público está hecha para que cualquier persona, sin importar su edad, escolaridad o de dónde venga, sepa dónde está, hacia dónde va y qué viene después, sin preguntarle a nadie. Ese es exactamente nuestro problema: que una persona de Santiago y una de un sector rural entiendan lo mismo, igual de rápido.

De la idea salen reglas concretas:

| Elemento del metro | En la plataforma | Razón |
|---|---|---|
| Línea continua | Barra vertical de 4 px que recorre el flujo del estudiante | Comprensión: muestra progreso y orden sin leer |
| Estaciones | Las 4 etapas: **Explorar → Postular → Llegar → Avanzar** | Comprensión: el estudiante siempre sabe en qué etapa está |
| "Usted está aquí" | Estación actual marcada en el encabezado de cada página | Comprensión: orientación inmediata |
| Letreros con una sola instrucción | Una acción principal por pantalla | Comprensión: menos decisiones, menos abandono |
| Placas de señalética | Esquinas de 4 px, bordes nítidos | Identidad (ver sección 5) |

La idea también encaja con el logo: un **enlace** (la conexión, nuestro nombre) y una **flecha** (avanzar). El enlace se traduce en la *línea*; la flecha, en la *acción*.

---

## 2. Color

### 2.1 Por qué NO partimos de la "psicología del color"

Sería fácil escribir "el azul transmite confianza". No lo hacemos porque la evidencia no lo sostiene con la solidez que exige este proyecto: una revisión de Andrew Elliot en *Frontiers in Psychology* (2015) concluye que la investigación sobre color y funcionamiento psicológico está en una etapa incipiente y recomienda prudencia al aplicarla al mundo real. Usar esas afirmaciones como justificación sería justamente lo que queremos evitar: decidir por intuición disfrazada de ciencia.

Nuestras razones para el color son verificables: **contraste medido**, **distinción para personas con daltonismo** y **coherencia con el logo**.

### 2.2 Colores de marca: salen del logo

El logo ya existía y se usa en redes sociales, así que la marca manda: el azul y el coral se tomaron midiendo los píxeles del archivo original (`diseno/marca/logo-original.jpg`). Al ser un JPG, los valores pueden variar en ±2 por canal. Decisión registrada en el [ADR 0006](decisiones/0006-colores-desde-el-logo.md).

| Token | Valor (claro) | Origen | Uso |
|---|---|---|---|
| `linea` | `#0D325F` | Azul marino del logo (el enlace) | La línea de trayecto, enlaces, encabezados de estación, botón secundario |
| `accion` | `#F46E52` | Coral del logo (la flecha) | Botón de la acción principal |

**Por qué este par funciona con daltonismo aunque no venga de una paleta especial:** su diferencia de luminosidad es enorme (L\* 21 el azul, 62 el coral). La luminosidad se conserva con todos los tipos de daltonismo, así que en la simulación (Machado et al., 2009) los dos colores siguen muy separados: diferencia de color ΔE 68 en protanopía, 91 en deuteranopía y 96 en tritanopía, cuando una diferencia sobre 10 ya se nota claramente.

### 2.3 Colores de apoyo

Para lo que el logo no define, partimos de la paleta de Diseño Universal del Color de Masataka Okabe y Kei Ito, pensada para que la distingan personas con todos los tipos de visión del color. El daltonismo rojo-verde afecta a cerca del 8% de los hombres de origen europeo y al 5% de los de origen asiático, según su guía.

| Token | Valor (claro) | Origen | Uso |
|---|---|---|---|
| `exito` | `#009E73` | Verde azulado Okabe-Ito | Confirmaciones, requisito cumplido |
| `estacion-avanzar` | `#CC79A7` | Púrpura rojizo Okabe-Ito | Estación 4 |
| `alerta` | `#B42318` | Rojo oscuro (propio) | Errores, plazos que vencen |

**Por qué el error es rojo oscuro y no coral ni bermellón:** el coral ya es la acción principal. Un error del mismo tono confundiría "haz esto" con "algo salió mal". El rojo oscuro (L\* 40) se separa del coral (L\* 62) por luminosidad, que resiste el daltonismo (ΔE 23 a 25 en las tres simulaciones), y además todo error lleva ícono y palabra (regla 2.7).

**Limitación conocida:** con protanopía, el coral de "Postular" y el verde de "Llegar" quedan cerca (ΔE 13). Por eso las estaciones nunca se distinguen solo por color: siempre llevan número y nombre.

### 2.4 Variantes "texto": el mismo tono, ajustado para leerse

Algunos colores no alcanzan el contraste mínimo de WCAG para texto (4,5:1) sobre fondo claro. Esos tienen una variante **solo para texto**:

| Color | Como relleno | Como texto sobre `fondo` |
|---|---|---|
| Azul `linea` | 11,99:1 | el mismo `#0D325F` sirve como texto |
| Coral `accion` | 2,92:1, no sirve como texto | usar `accion-texto` `#A93A22` → 6,33:1 |
| Rojo `alerta` | 6,15:1 | el mismo `#B42318` sirve como texto |
| Verde `exito` | 3,42:1 (vale para íconos y bordes) | usar `exito-texto` `#00785A` → 5,48:1 |

El botón coral es válido aunque el coral tenga 2,92:1 contra el fondo: lo que identifica al botón es su texto, en tinta sobre coral (5,90:1).

Regla práctica: **un color de relleno nunca se usa como texto si tiene variante `-texto`.**

### 2.5 Neutros con temperatura

| Token | Valor | Razón |
|---|---|---|
| `fondo` | `#FFFFFF` | Blanco puro: el máximo contraste posible con el texto y con los colores de marca, y un lienzo neutro para el recorrido. Reemplaza el crema `#FAF7F2` anterior (ADR 0029). |
| `superficie` | `#FFFFFF` | Tarjetas y formularios. Se separan del fondo con borde, no con sombra. |
| `superficie-suave` | `#EFF4FB` | Bandas y bloques de apoyo. `texto` 15,57:1 y `texto-suave` 6,31:1 sobre ella. |
| `texto` | `#1C1B19` (tinta) | 17,21:1 sobre `fondo`. |
| `texto-suave` | `#4B5B6C` | 6,97:1: texto secundario que sigue cumpliendo AA con margen. |
| `borde` | `#718198` | 3,97:1: cumple el 3:1 que WCAG 1.4.11 exige a los bordes de componentes. |
| `marca-fondo` / `marca-texto` / `marca-linea` | `#0D325F` / `#FFFFFF` / `#8DB2E6` | Cabecera azul marino, igual en ambos temas. Texto 12,82:1 y línea 5,89:1 sobre ella. |

### 2.6 Modo oscuro

Se activa según la preferencia del sistema operativo y puede forzarse con `data-tema`. El fondo oscuro es azul marino (`#0A1D33`, superficie `#102B48`, apoyo `#173859`), de la misma familia que el logo. El azul marino de la línea casi desaparece sobre él (1,33:1), así que en modo oscuro la línea pasa a un azul claro del mismo tono (`#8DB2E6`, 7,80:1); el coral se mantiene. Todos los pares están verificados en ambos modos (44 de 44 cumplen; ver `python3 scripts/tokens.py --check`). Razón: accesibilidad (personas con fotofobia o baja visión) y respeto por la configuración del usuario.

### 2.7 Reglas de uso

- **Nunca solo color para transmitir información** (WCAG 1.4.1 y regla 2 de Okabe-Ito). Cada estación lleva color **+ número + nombre**; cada estado lleva color **+ ícono + palabra**.
- **El coral se gasta poco:** una sola acción principal por pantalla. Si todo es coral, nada lo es. **Decisión del líder (11-nov-2026):** el coral se usa solo en (1) el botón de la acción principal y (2) la sección de beneficios de la portada con fondo coral que describe el [ADR 0029](decisiones/0029-base-visual-anden-urbano.md). Los adornos (tren, rieles, parada o estación activa, indicadores del carrusel, subrayados de navegación, bordes de cabecera) usan `--color-linea` o los tokens de marca, nunca `--color-accion`.
- **Sin degradados ni sombras decorativas:** no aportan información, cuestan rendimiento en equipos básicos y son una señal de plantilla genérica.

---

## 3. Tipografía

### 3.1 Familia: Atkinson Hyperlegible Next + Atkinson Hyperlegible Mono

| Uso | Familia | Razón |
|---|---|---|
| Todo el texto | **Atkinson Hyperlegible Next** | Diseñada por el Braille Institute para lectores con baja visión: diferencia formas que suelen confundirse (l, I, 1; O, 0; b, d). Si funciona para baja visión, funciona para todos. |
| Cifras: puntajes, montos, porcentajes | **Atkinson Hyperlegible Mono** | Dígitos de ancho fijo: las columnas de puntajes y aranceles se alinean y se comparan de un vistazo. Es la misma familia, así que se ve coherente. |

**Por qué solo una familia (con su versión mono):** cada familia extra es una descarga más. En un teléfono con datos limitados, cada kilobyte cuenta (razón de rendimiento).

**Fuentes alojadas por nosotros, no cargadas desde Google Fonts:** el navegador del estudiante no le avisa a un tercero que visitó el sitio (privacidad) y no depende de otra conexión (rendimiento). Verificar la licencia (archivo `OFL.txt`) al descargar los archivos.

Cobertura verificada en A2: Next 400 y 700, y Mono 400 incluyen los caracteres del
español (ñ, Ñ, á, é, í, ó, ú, ü, ¿, ¡ y sus mayúsculas), comillas « » y el signo $.
`python scripts/fuentes.py --check` comprueba los archivos WOFF2. La página
`/prueba-tipografia` permite revisar texto normal, negrita y cifras en Mono.
En el navegador se verificaron las tres fuentes, sin recursos de servidores externos
y sin desbordamiento a 360 px. Los archivos conservan la cobertura completa del ZIP;
suman 51.236 bytes. Procedencia y licencias en `public/fuentes/README.md`.

### 3.2 Tamaños

| Decisión | Valor | Razón |
|---|---|---|
| Tamaño base | `1rem` (16 px por defecto) | Se expresa en `rem` para respetar el tamaño de letra que la persona configuró en su teléfono (WCAG 1.4.4: el texto debe poder ampliarse al 200%). En campos de formulario, menos de 16 px hace que iPhone haga zoom automático. |
| Escala | razón 1,25 (tercera mayor) | Una escala moderada: los títulos se distinguen del cuerpo sin desbordar pantallas de 360 px. |
| Texto pequeño | `0.875rem` (14 px) | Sube desde `0.8rem` para que fechas y fuentes sigan legibles en teléfono. |
| Titular de escritorio | `4rem` (`--texto-5`) | Solo para el titular de la portada en pantallas anchas. |
| Interlineado del texto | 1,5 | Coincide con el espaciado que WCAG 1.4.12 exige que el texto soporte sin romperse. |
| Interlineado de títulos | 1,2 | Los títulos son cortos; más espacio separaría líneas que deben leerse como una unidad. |
| Largo de línea máximo | 68 caracteres | Dentro del rango de 45 a 75 caracteres que la tipografía editorial (Bringhurst) considera cómodo para leer. |
| Pesos | 400 y 700 | Dos pesos bastan para jerarquía; cada peso extra es otra descarga. |

---

## 4. Espacio y tamaño de toque

| Decisión | Valor | Razón |
|---|---|---|
| Unidad base | 4 px, escala 4·8·12·16·24·32·48·64·80·96 | Un solo sistema evita decisiones arbitrarias ("¿13 o 15 px?") y mantiene alineación. |
| Objetivo táctil mínimo | **44 × 44 px** | WCAG 2.2 exige 24 px como mínimo (2.5.8, AA) y recomienda 44 px (2.5.5, AAA). Elegimos 44: pantallas pequeñas, dedos en movimiento, personas con temblor. |
| Anillo de foco | 3 px, color `foco` | Quien navega con teclado o lector de pantalla siempre ve dónde está. Contraste ≥ 3:1. |

---

## 5. Forma

| Decisión | Valor | Razón |
|---|---|---|
| Radio de esquinas | 4 px | Identidad: las placas de señalética son rectángulos de esquinas casi rectas. También diferencia la plataforma del estilo genérico de esquinas muy redondeadas. Es una razón de identidad, no de usabilidad, y así se declara. |
| Borde de componentes | 1 px `borde` | Separa sin sombras; cumple 3:1. |
| Línea de trayecto | 4 px `linea` | Debe verse como una línea de metro: gruesa y continua. |
| Sombras | Ninguna, salvo menús flotantes | No aportan información y cuestan rendimiento. |

---

## 6. Íconos

- **Librería:** Lucide (licencia ISC, permite uso comercial). Una sola librería = estilo consistente.
- **Siempre con texto al lado.** Un ícono solo es ambiguo: la lupa puede ser "buscar" o "ampliar". Excepción: botón de cerrar, con `aria-label`.
- Tamaño 20 o 24 px, trazo de 2 px, dentro de un objetivo táctil de 44 px.
- Prohibidos: emojis como íconos o viñetas.

---

## 7. Movimiento

- Duraciones de 150 y 220 ms para respuestas (botones, estados). Para la aparición de contenido hay tokens propios: `entrada` 850 ms, `escalon` 90 ms entre elementos, `fundido` 180 ms y `carga` 1600 ms. La curva común es `--mov-curva`.
- Solo para explicar un cambio (algo aparece, se abre, avanza la línea). Nunca decorativo.
- Con `prefers-reduced-motion`, todas las duraciones pasan a 0 (WCAG 2.3.3). `tokens.py` lo genera desde `tokens.json`, así que un token de movimiento nuevo queda cubierto solo.

---

## 8. Escritura (también es diseño)

- **Tuteo, español de Chile, frases cortas** (menos de 20 palabras cuando se pueda).
- **Siglas explicadas la primera vez:** "Formulario Único de Acreditación Socioeconómica (FUAS)".
- **Botones con verbo y resultado:** "Comparar carreras", no "Continuar" ni "Enviar".
- **Errores que dicen qué pasó y cómo arreglarlo:** "Falta tu puntaje de Matemática 1. Escríbelo para calcular", no "Error de validación".
- **Nunca culpar ni etiquetar** al estudiante (AGENTS.md, sección 2.4).

---

## 9. Logo

Archivos en `public/marca/`, redibujados como vectores a partir del único original disponible (`diseno/marca/logo-original.jpg`, 1600 × 1600 px). El procedimiento queda en `scripts/marca/vectorizar_logo.py` para poder repetirlo.

| Archivo | Uso |
|---|---|
| `logo-horizontal.svg` | Encabezado del portal, documentos, presentaciones. Cambia solo a su versión clara cuando el sistema está en modo oscuro. |
| `logo-horizontal-oscuro.svg` | Fondos oscuros fijos (videos, presentaciones con fondo oscuro). |
| `simbolo.svg` | Espacios pequeños donde el texto no se leería. |
| `public/iconos/` | Favicon e íconos de la PWA (192, 512, 512 adaptable y 180 para iPhone). |

**Reglas de uso:**

- **Nunca el logo azul marino sobre fondo negro u oscuro:** su contraste es de 1,6:1 y prácticamente no se ve. Ese es el caso del archivo original (fondo negro): en fondos oscuros usar `logo-horizontal-oscuro.svg`.
- **Tamaño mínimo del logo horizontal:** 160 px de ancho en pantalla. Bajo eso, el texto "ESTUDIANTIL" deja de leerse con claridad; usar el símbolo.
- **Espacio libre alrededor:** al menos la altura de la flecha del símbolo en cada lado, para que nada lo tape ni lo confunda.
- **No deformar, rotar, recolorear ni agregar sombras.**
- **La tipografía del logo es parte de la imagen**, no se usa en la interfaz. La interfaz usa Atkinson Hyperlegible por legibilidad (sección 3).

**Accesibilidad:** el logo es una imagen, así que en la página lleva un texto alternativo con el nombre completo ("Agencia de Enlace & Seguimiento Estudiantil"). WCAG exime a los logotipos del requisito de contraste del texto (criterio 1.4.3), pero igual elegimos versiones que se vean bien en cada fondo.

---

## 10. Pendientes

- [x] Colores del logo medidos y tokens ajustados (ADR 0006).
- [ ] Pedir al diseñador original del logo (si existe) los valores exactos, para eliminar el margen de ±2 del JPG.
- [x] Verificar cobertura de caracteres del español en ambas familias (A2, comprobación de WOFF2 y página `/prueba-tipografia`).
- [ ] Probar la paleta con al menos una persona con daltonismo (recomendación de Okabe e Ito: los simuladores son solo aproximaciones).
- [ ] Prueba con 5 usuarios reales, al menos uno de zona rural.

---

## Fuentes

- Okabe, M. e Ito, K. *Color Universal Design: How to make figures and presentations that are friendly to colorblind people.* https://jfly.uni-koeln.de/color/
- Elliot, A. J. (2015). *Color and psychological functioning: a review of theoretical and empirical work.* Frontiers in Psychology, 6. https://doi.org/10.3389/fpsyg.2015.00368
- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2.* https://www.w3.org/TR/WCAG22/ — criterios 1.4.1, 1.4.3, 1.4.4, 1.4.11, 1.4.12, 2.3.3, 2.5.5, 2.5.8.
- Braille Institute. *Atkinson Hyperlegible Next y Mono.* https://www.brailleinstitute.org/freefont/
- Bringhurst, R. *The Elements of Typographic Style* (largo de línea de 45–75 caracteres).
- Lucide. https://lucide.dev (licencia ISC).
- Machado, G. M., Oliveira, M. M. y Fernandes, L. A. F. (2009). *A Physiologically-based Model for Simulation of Color Vision Deficiency.* IEEE Transactions on Visualization and Computer Graphics, 15(6). Matrices usadas para simular daltonismo (severidad máxima).
