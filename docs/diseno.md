# Sistema de diseño · "Mapa de trayecto"

## Base visual vigente en la copia de rediseño

La rama local `rediseno-metro` aplica la alternativa **Andén urbano**, elegida
por Cristóbal el 11 de noviembre de 2026. Su base está registrada en el
[ADR 0029](decisiones/0029-base-visual-anden-urbano.md).

Los encabezados compartidos utilizan el azul marino del logo, su versión clara
y una línea coral. El contenido mantiene superficies claras. El tema oscuro
utiliza superficies azules. Los valores de neutros y movimiento de las secciones
históricas siguientes quedan reemplazados por ese ADR y `diseno/tokens.json`.
Las tipografías locales, los contratos de componentes y las reglas de
trazabilidad de datos siguen aplicándose.

La portada y las páginas de carreras, comparador y beneficios comparten ahora
el logo, la navegación, el tren y las ilustraciones originales del portal.
El ajuste de continuidad y movimiento se registra en el
[ADR 0030](decisiones/0030-continuidad-visual-y-movimiento.md).

### Continuidad visual y apariciones

La rama `fix/integrar-portal-backend` integra esta presentación con `main` de
AE-SE en `1bdf5ae`. Conserva el acceso existente a Supabase y las correcciones
del calendario del FUAS, incluido el aviso dinámico de cierre en la portada.
Los ADR visuales se proponen como 0029 y 0030 para conservar la numeración
del repositorio principal. La integración se comprobó con la oferta local de
pruebas del repositorio. El explorador, una ficha y el comparador del sitio
publicado también respondieron con datos en la comprobación del 11 de noviembre
de 2026. La publicación del diseño requiere la revisión y confirmación del
líder previstas en `AGENTS.md`.

La sección coral utiliza `--color-sobre-accion` para texto y foco. El mismo
par sobre coral ya se verifica con mínimo 4,5 en el generador de tokens.

Las cabeceras interiores prolongan la composición de la portada mediante
superficies azules, ilustraciones amplias y encuentros diagonales. El tren
identifica la página actual en la navegación. Las etapas de la trayectoria
se presentan dentro de la cabecera con los mismos colores de marca.
La ficha individual recibe esa cabecera y tarjetas de indicadores con el mismo
tratamiento, para continuar el recorrido al abrir una carrera del explorador.

Las tarjetas de carreras separan la identidad del programa, sobre azul marino,
de sus indicadores y fuentes. Las tarjetas de beneficios tienen una cabecera
azul clara con recorte diagonal. Las opciones seleccionadas del comparador
utilizan el mismo tratamiento de identidad y sus filas alternan superficies
para facilitar el seguimiento horizontal de los datos.

Las apariciones al recorrer el portal duran 850 ms. El escalonado de tarjetas
alterna dos posiciones separadas por 90 ms, con una demora máxima de 90 ms.
El movimiento acompaña el ingreso de un bloque a la pantalla y la reacción de
sus acciones. Los controles mantienen respuestas breves. Las tarjetas que se
desplazan fuera de la vista se preparan para entrar por el lado correspondiente
al volver a recorrerlas. Las tarjetas insertadas al filtrar reciben el mismo
tratamiento. El foco muestra el contenido
inmediatamente. La reducción de movimiento elimina las entradas espaciales y
presenta todos los bloques. Sin JavaScript, el contenido permanece visible.

Los encabezados dejan paso al foco de teclado para permitir leer los destinos
de navegación y las fuentes con texto ampliado. Las fuentes y los datos
conservan el tratamiento de cada componente. Las referencias de composición
y movimiento consultadas están documentadas en el ADR 0030.

### Explorador de carreras

El explorador reutiliza la cabecera compartida del portal.
El formulario conserva su envío GET y los filtros utilizan el control
desplegable nativo. Buscar concentra la acción coral. Aplicar filtros utiliza
el azul de línea para mantener una jerarquía de acciones reconocible.

Las tarjetas separan carrera e institución de sus indicadores. En escritorio,
empleabilidad y arancel ocupan columnas alineadas. En teléfono, la lectura sigue
una sola columna. Las cifras presentes usan Atkinson Mono. La ausencia de datos
usa texto y un separador discontinuo, conservando la explicación existente.
Las definiciones, los períodos, las fuentes y las fechas siguen junto a cada dato.

Durante el envío del formulario, tres tarjetas de espera reproducen las columnas
de los resultados y un estado anuncia «Buscando carreras…». Solo varía la opacidad,
con los tokens de movimiento del ADR 0029. La preferencia de movimiento reducido
deja las tarjetas estáticas. La navegación GET funciona también sin JavaScript.
Al restaurar una página desde el historial, se restablece su estado de espera.

El error de consulta muestra una explicación propia y el estado vacío permite
ajustar filtros. El conteo de resultados se presenta cuando la consulta responde.
Los cambios de esta página utilizan exclusivamente los tokens existentes.

### Comparador de carreras

El comparador comparte la cabecera azul y la búsqueda coral del explorador.
Las opciones elegidas separan carrera, institución, sede y jornada para reconocer
variantes del mismo programa. En escritorio, se disponen una junto a otra.

La tabla alinea los indicadores por carrera y conserva sus definiciones,
unidades, períodos, fuentes y fechas. Las cifras usan Atkinson Mono y se alinean
a la derecha. Las ausencias conservan su explicación y un separador discontinuo.
La cantidad de columnas se adapta a las opciones presentes. En teléfono se ven
las dos elegidas mediante el selector existente, según el ADR 0011.

Los encabezados acompañan la lectura al desplazarse por los indicadores.
Cuando el foco entra en la tabla, dejan de fijarse para permitir leer y activar
las fuentes con teclado y texto ampliado. Cada celda tiene un nombre accesible
con la carrera, institución, sede y jornada a las que corresponde.

El error de consulta se identifica con ícono y texto. La búsqueda sin resultados
mantiene una sugerencia para probar otra palabra. Los enlaces de agregar y quitar
carreras, el formulario GET y la dirección compartible mantienen su comportamiento.

### Beneficios y calendario

La página de beneficios utiliza la cabecera azul de las páginas interiores.
El acceso principal coral lleva al calendario para evitar recorrer todo el
catálogo antes de consultar un plazo. Un segundo enlace permite llegar al
buscador. Ambos destinos reciben el foco mediante navegación nativa.

Las tarjetas muestran nombre, explicación, requisitos, cobertura, postulación
y fuente completa. En escritorio se distribuyen en dos columnas. En teléfono
se leen en una columna. La búsqueda conserva su actualización al escribir y
anuncia el conteo de resultados. El estado vacío ofrece probar otro nombre.

El calendario se presenta como un recorrido con nodos y procesos identificados
por su nombre. Las fechas exactas y las pendientes conservan sus explicaciones,
referencias, fuentes y fechas de consulta. Se reutiliza el componente Aviso
para los plazos pendientes. La disposición de dos columnas en escritorio
separa el proceso de su fecha o aviso.

El catálogo completo y el calendario se renderizan en el servidor. La búsqueda
interactiva requiere JavaScript. Los valores, el orden de los plazos y las
reglas de búsqueda siguen procediendo de sus módulos y archivos existentes.

> Regla de este proyecto: **ningún elemento visual existe porque "se ve bonito"**. Cada color, letra, espacio y borde responde a una de estas cuatro razones, y aquí queda escrita cuál:
>
> 1. **Accesibilidad medible** (WCAG 2.2, daltonismo, legibilidad).
> 2. **Comprensión** (que una persona sin ayuda entienda qué hacer).
> 3. **Rendimiento** (teléfonos básicos, datos móviles limitados).
> 4. **Identidad** (el concepto propio y el logo de la agencia).
>
> Si una propuesta no puede justificarse con una de las cuatro, no entra.

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
| Coral `accion` | 2,73:1, no sirve como texto | usar `accion-texto` `#A93A22` → 5,93:1 |
| Rojo `alerta` | 6,15:1 | el mismo `#B42318` sirve como texto |
| Verde `exito` | 3,20:1 (vale para íconos y bordes) | usar `exito-texto` `#00785A` → 5,13:1 |

El botón coral es válido aunque el coral tenga 2,73:1 contra el fondo: lo que identifica al botón es su texto, en tinta sobre coral (5,90:1).

Regla práctica: **un color de relleno nunca se usa como texto si tiene variante `-texto`.**

### 2.5 Neutros con temperatura

| Token | Valor | Razón |
|---|---|---|
| `fondo` | `#FAF7F2` (papel) | Un blanco levemente cálido. Razón de identidad: evoca papel impreso y separa la plataforma del blanco puro de los portales genéricos. No atribuimos efectos sobre la fatiga visual porque no los podemos respaldar. |
| `superficie` | `#FFFFFF` | Tarjetas y formularios: se distinguen del fondo sin necesitar sombras. |
| `texto` | `#1C1B19` (tinta) | 16,11:1 sobre `fondo`. Negro cálido coherente con el papel. |
| `texto-suave` | `#5E5A53` | 6,42:1: texto secundario que sigue cumpliendo AA con margen. |
| `borde` | `#8F887D` | 3,28:1: cumple el 3:1 que WCAG 1.4.11 exige a los bordes de componentes. |

### 2.6 Modo oscuro

Se activa según la preferencia del sistema operativo y puede forzarse con `data-tema`. El azul marino casi desaparece sobre fondo oscuro (1,4:1), así que en modo oscuro la línea pasa a un azul claro del mismo tono (`#8DB2E6`, 8,38:1); el coral se mantiene. Todos los pares están verificados en ambos modos (36 de 36 cumplen; ver `python3 scripts/tokens.py --check`). Razón: accesibilidad (personas con fotofobia o baja visión) y respeto por la configuración del usuario.

### 2.7 Reglas de uso

- **Nunca solo color para transmitir información** (WCAG 1.4.1 y regla 2 de Okabe-Ito). Cada estación lleva color **+ número + nombre**; cada estado lleva color **+ ícono + palabra**.
- **El coral se gasta poco:** una sola acción principal por pantalla. Si todo es coral, nada lo es.
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
| Interlineado del texto | 1,5 | Coincide con el espaciado que WCAG 1.4.12 exige que el texto soporte sin romperse. |
| Interlineado de títulos | 1,2 | Los títulos son cortos; más espacio separaría líneas que deben leerse como una unidad. |
| Largo de línea máximo | 68 caracteres | Dentro del rango de 45 a 75 caracteres que la tipografía editorial (Bringhurst) considera cómodo para leer. |
| Pesos | 400 y 700 | Dos pesos bastan para jerarquía; cada peso extra es otra descarga. |

---

## 4. Espacio y tamaño de toque

| Decisión | Valor | Razón |
|---|---|---|
| Unidad base | 4 px, escala 4·8·12·16·24·32·48·64 | Un solo sistema evita decisiones arbitrarias ("¿13 o 15 px?") y mantiene alineación. |
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

- Duraciones de 150 y 220 ms: lo suficiente para entender qué cambió, sin hacer esperar.
- Solo para explicar un cambio (algo aparece, se abre, avanza la línea). Nunca decorativo.
- Con `prefers-reduced-motion`, las duraciones pasan a 0 (WCAG 2.3.3). Ya está en `tokens.css`.

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
- Valores hexadecimales de la paleta Okabe-Ito (documentación del paquete `see`, R): https://rdrr.io/cran/see/man/palette_okabeito.html
- Elliot, A. J. (2015). *Color and psychological functioning: a review of theoretical and empirical work.* Frontiers in Psychology, 6. https://doi.org/10.3389/fpsyg.2015.00368
- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2.* https://www.w3.org/TR/WCAG22/ — criterios 1.4.1, 1.4.3, 1.4.4, 1.4.11, 1.4.12, 2.3.3, 2.5.5, 2.5.8.
- Braille Institute. *Atkinson Hyperlegible Next y Mono.* https://www.brailleinstitute.org/freefont/ · reseña: https://christiantietze.de/posts/2025/02/atkinson-hyperlegible-font-next-mono/
- Bringhurst, R. *The Elements of Typographic Style* (largo de línea de 45–75 caracteres).
- Lucide. https://lucide.dev (licencia ISC).
- Machado, G. M., Oliveira, M. M. y Fernandes, L. A. F. (2009). *A Physiologically-based Model for Simulation of Color Vision Deficiency.* IEEE Transactions on Visualization and Computer Graphics, 15(6). Matrices usadas para simular daltonismo (severidad máxima).
