# 0024 — Base visual Andén urbano

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
