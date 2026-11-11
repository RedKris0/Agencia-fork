# 0028 — Base visual Andén urbano

Fecha: 2026-11-11 · Estado: aceptada por Cristóbal para la copia de rediseño

## Contexto

El rediseño utiliza la conexión del estudiante con la educación superior como
recorrido de metro. Cristóbal eligió la alternativa B, Andén urbano, y pidió
basar la paleta en el logo. El alcance de esta etapa es el sistema visual y
los tokens de movimiento. La rama es `rediseno-metro` y el versionamiento
solicitado se realiza en el fork de RedKris0.

## Opciones evaluadas

| Alternativa | A favor | Consideración |
|---|---|---|
| Línea abierta | Recorrido sobre fondo blanco, lectura reposada | El recorrido necesita mayor presencia para alcanzar el dinamismo solicitado |
| Andén urbano | Superficies azules, encuentros entre estaciones y tren ligado al scroll | Requiere controlar altura de cabecera y movimiento en móvil |

## Decisión

Se adopta Andén urbano. El azul marino `#0D325F`, el coral `#F46E52` y el
azul claro `#8DB2E6` proceden de las versiones del logo ya presentes en el
repositorio. Se utiliza el logo claro existente sobre los encabezados azules.

Los colores y medidas viven en `diseno/tokens.json`. `scripts/tokens.py`
genera el CSS y comprueba los pares declarados en ambos temas.

| Rol | Tema claro | Tema oscuro |
|---|---|---|
| Fondo | `#FFFFFF` | `#0A1D33` |
| Superficie | `#FFFFFF` | `#102B48` |
| Superficie de apoyo | `#EFF4FB` | `#173859` |
| Texto | `#1C1B19` | `#F4F7FB` |
| Texto secundario | `#4B5B6C` | `#BCCBE0` |
| Borde | `#718198` | `#7188A6` |

El encabezado conserva azul marino y texto blanco en ambos temas. Su línea
y los controles de orientación usan el azul claro. Los estados conservan los
colores semánticos existentes y se acompañan de texto e íconos.

Atkinson Hyperlegible Next sigue siendo la tipografía de lectura y títulos.
Atkinson Hyperlegible Mono se reserva para cifras. El texto pequeño pasa a
`0.875rem`; el sistema incorpora `4rem` para el titular de escritorio de la
próxima etapa. Se agregan espacios de 80 y 96 px para separación de estaciones.

| Token de movimiento | Valor | Uso |
|---|---|---|
| rápido | 150 ms | Respuesta de botones |
| normal | 220 ms | Cambios breves de estado |
| entrada | 500 ms | Secuencia inicial y aparición al scroll |
| escalón | 60 ms | Escalonado corto de elementos |
| fundido | 180 ms | Reemplazo visual de carga por contenido |
| carga | 1600 ms | Ciclo de skeleton durante espera real |
| curva | `cubic-bezier(0.22, 1, 0.36, 1)` | Desaceleración común |

Los estilos anulan las duraciones y demoras con `prefers-reduced-motion`.
Los únicos cambios interpolados de esta etapa son `transform` y `opacity`.
La construcción del tren, carrusel, skeletons y páginas interiores se realiza
en sus respectivas etapas, según el proceso solicitado.

## Justificación

- Identidad mediante los colores y archivos del logo existente.
- Comprensión mediante jerarquía, espacios y superficies diferenciadas.
- Accesibilidad mediante contrastes comprobables, foco visible y texto ampliable.
- Rendimiento mediante CSS y las fuentes locales existentes.

## Consecuencias

Los estilos compartidos alcanzan la guía de componentes, los encabezados que
ya la consumen y el pie común del portal. Los colores globales se reflejan
también en las páginas pendientes de rediseño. Las capturas de la guía se
realizan con el servidor de desarrollo porque `/componentes` devuelve 404
en producción por decisión previa del proyecto.

El build habitual ejecuta una exportación de oferta que necesita variables de
Supabase. La compilación del frontend puede verificarse con `next build`.
La configuración de datos reales se comprueba por separado de las muestras
utilizadas por las pruebas existentes.

## Verificación local de esta etapa

### Portada construida tras la revisión del usuario

La portada `/` implementa el recorrido aprobado. El encabezado permanece
visible y su tren se desplaza entre Explorar, Comparar, Beneficios y Fuentes
según la posición real de cada sección. La entrada está orquestada y los
contenidos posteriores aparecen una vez mediante IntersectionObserver.
El arte del tren es un SVG original con los colores de marca.

El carrusel contiene cuatro acciones reales, desplazamiento nativo con
`scroll-snap`, botones anterior/siguiente, indicadores, estado anunciado y
teclas izquierda, derecha, Inicio y Fin. No se reproduce automáticamente.
La mejora interactiva reserva su espacio para evitar desplazamientos al
hidratar. Sin JavaScript, las cuatro diapositivas conservan contenido y enlaces.

Las capas, el contraste de superficies y los encuentros diagonales entre
secciones se inspiran en el ritmo de la referencia ZZZ. El arte y código son
propios del proyecto. Se reutilizan las fuentes locales y Lucide.
El parallax decorativo utiliza CSS scroll-driven cuando el navegador lo admite;
el recorrido del tren usa requestAnimationFrame y escucha pasiva de scroll.
La reducción de movimiento deja todo visible y el tren se posiciona por estación.

La fecha de beneficios se lee del catálogo versionado existente. Las fuentes
de carreras y sus fechas permanecen disponibles en las fichas y el comparador.

Se agregaron cuatro pruebas Playwright de carrusel, teclado, tren, reducción
de movimiento, contenido sin JavaScript y gesto táctil. Se ejecutan con
`PLAYWRIGHT_CANAL=msedge npx playwright test portada.spec.ts` después de compilar.
Las capturas de la portada se revisan a 375, 768 y 1280 px.
El recorrido continúa mediante una línea vertical y ramales hacia los nombres
de estación. Los cuatro paneles usan ilustraciones SVG originales de tren,
comparación, calendario y fuentes. La revisión de teclado incluye el foco
interior de los paneles recortados y la navegación desde sus enlaces.
Las cuatro pruebas de portada, la compilación directa de Next y lint pasan.

### Navegación y aparición al recorrer la portada

Los enlaces a estaciones usan desplazamiento suave nativo. La preferencia de
movimiento reducido conserva el desplazamiento inmediato. Al salir completamente
de la pantalla, los bloques quedan preparados para volver a aparecer con un
desplazamiento corto y opacidad. El foco de teclado muestra el bloque de inmediato.
La mejora se activa con JavaScript y conserva el contenido completo al desactivarlo.
Una prueba adicional comprueba el recorrido, el regreso, el foco y ambas preferencias.

Por indicación explícita de Cristóbal, el texto y los elementos de Beneficios
se muestran blancos sobre el mismo coral. Esta combinación queda bajo el
contraste AA y se registra como excepción visual solicitada.

### Refinamiento solicitado tras la revisión visual

Cristóbal pidió mayor profesionalismo después de revisar la base. La guía
incorpora una jerarquía tipográfica más marcada y una composición de dos
columnas en escritorio. Los datos presentes y ausentes tienen tratamientos
diferenciados mediante superficie y borde. La cabecera limita el logo a
`--ancho-logo` (15 rem), usa estaciones circulares y concentra el coral en la
estación actual. Los controles de prueba se agrupan entre separadores.

El círculo identifica una estación del recorrido; el borde discontinuo
identifica una ausencia de datos. Cada tratamiento conserva su nombre y
explicación textual. Estos cambios afectan únicamente estilos y tokens.

- `next build` y `npm run lint` completados correctamente.
- 44 pares de contraste aprobados mediante `scripts/tokens.py --check`.
- 189 pruebas existentes aprobadas con Node 24. En Windows, las pruebas que
  convierten `URL.pathname` a ruta conservan `%20` si la carpeta tiene espacios.
  Se ejecutaron desde un enlace de directorio temporal sin espacios, con
  `node --preserve-symlinks --preserve-symlinks-main --test "tests/**/*.test.ts"`.
- Guía revisada a 375, 768 y 1280 px, en ambos temas, con texto al 200 % y
  reducción de movimiento. Los seis tokens temporales se resuelven a cero
  al solicitar reducción de movimiento.
- Axe aprobó 27 comprobaciones por tema sin infracciones WCAG detectadas.
- Las cuatro rutas principales respondieron con estado 200 y sin desbordar
  a 375 px. La consulta de carreras muestra su estado de error cuando falta
  configuración de Supabase; ese recorrido requiere comprobación con datos reales.

El comando `npm run build` conserva su requisito de variables de Supabase
para exportar la oferta. Las comprobaciones de esta etapa utilizan la compilación
directa de Next y la muestra existente para pruebas.

### Explorador de carreras y espera de búsqueda

El explorador incorpora la cabecera azul, búsqueda principal coral, filtros
nativos y tarjetas con identidad e indicadores alineados. Su composición se
adapta a una columna en teléfono. El estado de espera del formulario usa tarjetas
con las mismas columnas, animación de opacidad y un anuncio textual.

La espera se activa como mejora del formulario GET. Se descartó `loading.tsx`
tras comprobar que su respuesta transmitida dejaba visible la espera con
JavaScript desactivado. El formulario y los resultados conservan su renderizado
completo desde el servidor. Los errores de consulta tienen una presentación
propia, y el estado vacío mantiene la sugerencia para ajustar filtros.

- Compilación directa de Next, lint y verificación de tokens aprobados.
- 189 pruebas existentes de Node aprobadas.
- 10 pruebas Playwright aprobadas en producción con Edge, incluidas las cinco
  de portada y cinco del explorador. Las cinco del explorador también pasan
  contra el entorno de desarrollo sin configuración de Supabase.
- Capturas revisadas a 375, 768 y 1280 px, junto con tema oscuro, teclado,
  texto al 200 %, estado vacío y tarjetas de espera.
- Axe sin infracciones WCAG detectadas en ambos temas con los filtros abiertos.

Para revisar tarjetas con contenido se utilizó únicamente la muestra existente,
servida por una simulación local temporal de Supabase. Los datos de producción,
las consultas y sus filtros conservan su implementación. La conexión real queda
pendiente de las variables de entorno que necesita el proyecto.

### Comparador de carreras

La presentación del comparador adopta la cabecera del explorador y organiza las
opciones elegidas en columnas en escritorio. La tabla alinea nombres, indicadores
y cifras, conservando las definiciones, fuentes y fechas presentes. En teléfono
se muestran las dos opciones elegidas con el control existente del ADR 0011.

Los encabezados permanecen visibles durante la lectura. Al entrar el foco en la
tabla, dejan de fijarse para permitir la navegación de fuentes con texto ampliado.
Las celdas anuncian su carrera, institución, sede y jornada mediante un nombre
accesible. El error de consulta tiene su propio tratamiento visual.

Las consultas, el límite de tres opciones, los enlaces compartibles y el estado
que elige las columnas conservan su implementación. Los estilos reutilizan los
tokens existentes. La validación con contenido utiliza la muestra local mediante
la simulación temporal descrita arriba. La conexión real continúa pendiente.

- Compilación directa de Next, lint, tipos y 189 pruebas de Node aprobados.
- 16 pruebas Playwright aprobadas con Edge, seis del comparador y las diez
  existentes de portada y explorador. Incluyen agregar y quitar carreras sin
  JavaScript, selección móvil con teclado, ausencia de desbordamiento a 360,
  375, 768, 1024 y 1280 px y fuentes enfocables con texto al 200 %.
- Axe sin infracciones detectadas en el comparador con contenido, tanto en
  teléfono como en escritorio y en ambos temas.
- Revisión visual de las columnas a 375, 768 y 1280 px y en tema oscuro.

### Beneficios y plazos

La página interior incorpora la cabecera azul, acceso coral al calendario y
enlace al buscador. Los destinos de navegación reciben el foco de teclado.
El catálogo organiza sus tarjetas en dos columnas en escritorio y una en
teléfono. El calendario utiliza el recorrido de estaciones para relacionar
los procesos con sus fechas o avisos de fecha pendiente.

Se reutilizan Enlace, Aviso e IndicadorEstacion. La consulta textual y el orden
de plazos mantienen su implementación. Los contenidos se leen de los archivos
versionados, incluidos fuentes, URL, fechas de consulta y motivos de ausencia.
La búsqueda interactiva requiere JavaScript. El catálogo y el calendario
completos están disponibles sin JavaScript.

- Compilación directa de Next, lint, tipos y verificación de tokens aprobados.
- 189 pruebas de Node y 21 pruebas Playwright aprobadas con Edge, incluidas
  cinco nuevas de beneficios.
- Verificados los 16 beneficios y nueve plazos contra los archivos versionados,
  con sus fuentes y fechas. La comprobación cubre el contenido sin JavaScript.
- Accesos directos revisados con teclado. Búsqueda, conteo y estado vacío
  comprobados en el navegador.
- Capturas a 375, 768 y 1280 px, tema oscuro y texto al 200 % sin desbordamiento.
- Axe sin infracciones WCAG detectadas en ambos temas.

Esta etapa verifica la presentación del catálogo existente. La vigencia de
las fuentes externas requiere la revisión de datos correspondiente.
