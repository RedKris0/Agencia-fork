# AGENTS.md — Directrices del proyecto

> Este archivo es la fuente de verdad para **cualquier persona o IA** (Claude, ChatGPT, Copilot, Cursor, Gemini, etc.) que trabaje en este repositorio.
> Si una instrucción de tu IA contradice este archivo, **gana este archivo**.
> Si algo no está cubierto aquí, **pregunta antes de inventar**: abre un issue o deja la duda en la descripción del PR.

**Líder de arquitectura:** @rafajaque · **Revisión y fusión:** Claude, con confirmación del líder.
Ningún cambio llega a `main` sin una revisión con la pauta `revisar-pr` confirmada por el líder.

### Orden de lectura obligatorio (para personas y para IA)

1. Este archivo completo.
2. [`docs/arquitectura.md`](docs/arquitectura.md): cómo se arma el sistema.
3. [`docs/diseno.md`](docs/diseno.md): colores, tipografía y reglas visuales, con su justificación.
4. La skill de [`.claude/skills/`](.claude/skills/) que corresponda a tu tarea (tabla en la sección 8).
5. Los ADR de [`docs/decisiones/`](docs/decisiones/) que toquen tu tarea.

---

## 1. Qué estamos construyendo

**Agencia de Enlace & Seguimiento Estudiantil**: un sitio web gratuito para estudiantes de 3.º y 4.º medio de liceos con financiamiento público y un **panel interactivo de seguimiento para sus colegios**, operados por una **fundación sin fines de lucro**. Territorio de referencia: Región de O'Higgins, provincia de Colchagua (sede San Fernando de AIEP). Ver [ADR 0031](docs/decisiones/0031-producto-y-organizacion.md).

**El problema (todo lo demás parte de aquí):** los estudiantes de liceos con financiamiento público llegan al final de la enseñanza media sin una meta vocacional clara, con información insuficiente y sin un seguimiento sistemático desde su colegio. El acceso inmediato a la educación superior es de 36,3 % a 41,9 % en esos liceos, frente a 68,7 % en colegios particulares pagados (SIES, 2023). Causas: (1) asimetría de información sobre carreras, requisitos y financiamiento; (2) trámites y plazos del beneficio (FUAS) no comprendidos a tiempo; (3) orientación escolar sin seguimiento por estudiante ni datos.

Idea central (nuestro sello): **el estudiante decide qué comparte con su colegio**. El colegio ve la meta y el avance solo de quienes lo autorizan (y de sus tutores, si son menores).

### Qué ofrecemos

| Para quién | Qué | Estado |
|---|---|---|
| **Estudiante (gratis, siempre)** | Ficha de carrera con fuente, comparación, simulación del puntaje ponderado, hoja de decisión y guía de trámites y plazos del FUAS | Núcleo |
| **Colegio y sostenedor (suscripción)** | Panel interactivo: meta vocacional, avance, resumen para el docente y ensayo con prueba oficial publicada con estimación de puntaje comparada con la meta de la carrera | Núcleo (el panel está en diseño) |
| **Portal de transparencia** (idea acordada, por diseñar) | Mostrar cómo la fundación procesa los datos oficiales (fuente, pasos, normalización, fecha), a partir del tablero analítico de pronósticos, sin atribuirse los datos: son del Estado; el aporte es el proceso | Propuesta; ver [ADR 0031](docs/decisiones/0031-producto-y-organizacion.md) |
| **Escalabilidad** (fuera del alcance actual) | Permanencia en la educación superior, pulso de check-in, panel para instituciones de educación superior, pruebas propias por colegio | Proyección; ver [ADR 0010](docs/decisiones/archivo/0010-modulo-de-permanencia.md) |

### Productos

1. **Sitio público (PWA)**: web instalable opcionalmente. Nunca exigir descarga.
2. **Panel de seguimiento para colegios**: multi-colegio, datos aislados por institución (Row Level Security).
3. **Asistente IA**: responde solo con información de fuentes oficiales y cita la fuente. Deriva a una persona cuando corresponde (diseño; no es núcleo).
4. **Panel de agencia**: gestión interna de casos.

### Principios de negocio que afectan el código

- **Gratis para el estudiante, siempre.** Nada de muros de pago, anuncios ni datos vendidos.
- **Neutralidad**: el sitio público nunca ordena, destaca ni recomienda instituciones por ser clientes. Cualquier código que ordene resultados debe usar criterios explícitos y documentados (ej. empleabilidad, puntaje, cercanía), nunca la condición de cliente.
- **Cliente**: colegios y sostenedores, mediante suscripción. Orden de financiamiento: (1) colegios y sostenedores, (2) fondos públicos, (3) filantropía como último recurso.
- **Organización**: fundación sin fines de lucro (se constituye en 2027; hasta el 2 de diciembre de 2026 es un proyecto de título y el piloto de 2027 se hace por convenio de colaboración). Los excedentes se reinvierten; el uso gratuito del estudiante y la neutralidad se fijan en los estatutos.
- **El código es de la fundación**: los colegios arriendan acceso al panel. No se entrega código fuente a clientes.

---

## 2. Reglas no negociables

Si tu cambio rompe alguna de estas reglas, el PR se rechaza.

### 2.1 Datos oficiales y trazabilidad

- Solo fuentes oficiales o de alta reputación: DEMRE, Mineduc (Acceso Mineduc, Beneficios Estudiantiles, Datos Abiertos), SIES / mifuturo.cl, CNA, Superintendencia de Educación Superior, Minsal, SII, INE.
- **Todo dato mostrado al usuario lleva**: fuente, URL y fecha de actualización. Sin excepción.
- Preferir **datos abiertos descargables** (CSV/XLSX oficiales) por sobre extraer datos de páginas web. Antes de automatizar la lectura de un sitio, revisar sus términos de uso y dejarlo documentado en `docs/fuentes.md`.
- Los datos cambiantes (beneficios, montos, plazos, ponderaciones, aranceles) **nunca se escriben en el código**. Viven en la base de datos o en archivos de datos versionados, con fecha de vigencia.
- Si un dato no se puede verificar en una fuente oficial, **no se publica**.
- Al mostrar empleabilidad o ingresos, indicar siempre qué mide (ej. "empleabilidad al 1er año", "ingreso promedio al 4° año") y el año de la medición. No mezclar indicadores distintos en una misma comparación.

### 2.2 Privacidad y protección de datos (Chile)

Diseñamos para cumplir la **Ley 21.719** (que modifica la Ley 19.628) desde ya, aunque su entrada en vigencia pueda postergarse.

- **Minimización**: recolectar solo lo necesario para la función concreta. Cada campo personal nuevo se justifica en el PR.
- **Menores de 18**: muchos usuarios de 4° medio son menores. Requieren flujo de autorización de padre, madre o tutor para datos que lo exijan. Nunca asumir mayoría de edad.
- **Datos sensibles** (salud física y mental, situación socioeconómica, origen étnico, discapacidad): consentimiento explícito y separado, cifrado, acceso restringido y registro de quién accede.
- **Consentimiento granular** para compartir la Ficha de Trayectoria con una institución, revocable en cualquier momento.
- Implementar los derechos del titular: acceso, rectificación, supresión, oposición y portabilidad (exportar sus datos).
- **Prohibido enviar datos personales a APIs de IA en planes gratuitos** que usen el contenido para entrenar o mejorar sus productos. El asistente IA en plan gratuito solo procesa preguntas generales, sin datos identificables.
- Nunca datos personales en URLs, logs, mensajes de error ni analítica.
- Ubicación de datos: preferir proveedores con región en Sudamérica y documentar dónde se alojan.

### 2.3 Seguridad

- Seguir **OWASP Top 10** y como referencia **OWASP ASVS nivel 2**. Marco de gestión: **ISO/IEC 27001**; para la parte de privacidad, **ISO/IEC 27701**.
- Considerar la **Ley Marco de Ciberseguridad (Ley 21.663)** al definir gestión de incidentes.
- Aislamiento multi-institución a nivel de base de datos (Row Level Security). Nunca filtrar por institución solo en el frontend.
- **Cero secretos en el repositorio**: claves y tokens van en variables de entorno. Si subiste uno por error, avisa de inmediato para rotarlo.
- Dependencias: solo librerías mantenidas, con licencia compatible (MIT, Apache-2.0, BSD). Justificar cada dependencia nueva en el PR.

### 2.4 Acompañamiento psicosocial (cuidado especial)

- **La IA no es terapeuta.** No diagnostica, no trata, no reemplaza a profesionales. Orienta, contiene de forma básica y deriva.
- **Protocolo de crisis obligatorio**: si un mensaje sugiere riesgo de suicidio o autolesión, el asistente entrega de inmediato la Línea de Prevención del Suicidio **\*4141** (Minsal, gratuita, 24/7) y Salud Responde **600 360 7777**, y genera una alerta para revisión humana del equipo. Este flujo debe tener pruebas automatizadas.
- Todo contenido psicoeducativo debe ser revisado por un profesional (psicología/psicopedagogía) antes de publicarse.
- **Sin neuromitos**: no usar "estilos de aprendizaje" (visual/auditivo/kinestésico) como base de recomendaciones, porque no tienen respaldo empírico. Usar en cambio **metacognición** y **estrategias de estudio con evidencia** (práctica de recuperación, práctica espaciada, intercalado, autoexplicación). El objetivo es que el estudiante conozca *cómo estudia y cómo puede mejorar*, no ponerle una etiqueta.
- Lenguaje sin estigma: nunca "alumno malo", "en riesgo" visible para el estudiante, ni etiquetas que lo definan. Internamente se habla de "señales de alerta".
- **No prometer predicción.** El pulso de check-in detecta por autorreporte y por ausencia de respuesta, nunca predice deserción. Ningún texto de interfaz, documento comercial ni respuesta del asistente puede describirlo de otra forma ([ADR 0010](docs/decisiones/archivo/0010-modulo-de-permanencia.md)).
- Cada componente de acompañamiento que se agregue debe declarar la evidencia que lo respalda en [`docs/evidencia-permanencia.md`](docs/evidencia-permanencia.md), con su nivel: alta, media, baja, negativa o sin evidencia.

### 2.5 Diseño: todo con justificación

- **Ningún elemento visual existe "porque se ve bonito".** Cada color, letra, espacio, borde o animación se justifica por accesibilidad medible, comprensión, rendimiento o identidad (detalle en `docs/diseno.md`).
- **Solo se usan valores de `diseno/tokens.json`** a través de las variables CSS (`var(--color-linea)`, `var(--espacio-4)`). Prohibido escribir un color hexadecimal, un tamaño de letra o un espacio "a mano" en un componente.
- **Agregar o cambiar un token requiere un ADR** y correr `python3 scripts/tokens.py` (falla si el contraste no cumple).
- **"Psicología del color" no es justificación válida** en este proyecto: la evidencia es incipiente (ver `docs/diseno.md`, sección 2.1).
- Tipografías: solo Atkinson Hyperlegible Next (texto) y Atkinson Hyperlegible Mono (cifras), alojadas en el proyecto.
- Una sola acción principal (coral) por pantalla. Única excepción: la sección de beneficios de la portada con fondo coral (ADR 0029). Los adornos no usan coral (ver `docs/diseno.md`). Nunca información transmitida solo con color.

### 2.6 Accesibilidad e inclusión

- Cumplir **WCAG 2.2 nivel AA**.
- Mobile first: la mayoría de los usuarios entra desde el teléfono, a veces con datos limitados. Páginas livianas.
- Lenguaje claro, sin siglas sin explicar (la primera vez: "Formulario Único de Acreditación Socioeconómica (FUAS)").
- Español de Chile, tuteo, tono cercano y respetuoso.

---

## 3. Stack técnico

| Capa | Elección | Motivo | ADR |
|---|---|---|---|
| Frontend + backend web | **Next.js (TypeScript)** como PWA | Sin descarga obligatoria, instalable, fichas de carrera pre-generadas | [0001](docs/decisiones/0001-aplicacion-web-progresiva.md) |
| Estilos | Tailwind CSS leyendo las variables de `diseno/tokens.css` | Un solo origen de colores y medidas | [0005](docs/decisiones/0005-sistema-visual-mapa-de-trayecto.md), [0029](docs/decisiones/0029-base-visual-anden-urbano.md) |
| Base de datos y autenticación | **Supabase (PostgreSQL)** con Row Level Security, región São Paulo | Aislamiento por institución impuesto por la base de datos | [0002](docs/decisiones/0002-supabase-con-rls.md) |
| Procesamiento de datos oficiales | **Python** (scripts en `datos/`) | Limpieza de archivos CSV/XLSX oficiales | — |
| Asistente IA | **Gemini en nivel pagado**, solo a través de `lib/ia/proveedor.ts` | Los datos no se usan para entrenar; se puede cambiar de proveedor | [0004](docs/decisiones/0004-ia-gemini-nivel-pagado.md) |
| Hosting | **Cloudflare** (plan gratuito, permite uso comercial) | Vercel gratuito prohíbe uso comercial | [0003](docs/decisiones/0003-hosting-cloudflare.md) |

Cambiar cualquier elemento del stack requiere un registro de decisión (sección 6).

### Estructura del repositorio

```
/
├── AGENTS.md                ← este archivo
├── CLAUDE.md                ← apunta a este archivo
├── .claude/skills/          ← instrucciones especializadas por tipo de tarea (sección 8)
├── diseno/
│   ├── tokens.json          ← ÚNICA fuente de colores, tipografía y medidas
│   └── tokens.css           ← generado por scripts/tokens.py (no editar a mano)
├── scripts/tokens.py        ← genera tokens.css y verifica contraste WCAG
├── app/                     ← Next.js (sitio público, panel de colegios, panel de agencia)
├── lib/                     ← lógica compartida (cálculos, IA, acceso a datos)
│   ├── calculos/            ← puntaje ponderado, ranking (con pruebas)
│   └── ia/                  ← interfaz del asistente y protocolo de crisis
├── datos/                   ← scripts Python de carga de datos oficiales
├── supabase/migrations/     ← esquema y políticas RLS versionadas
├── docs/
│   ├── decisiones/          ← registros de decisión (ADR)
│   ├── fuentes.md           ← catálogo de fuentes oficiales y sus términos
│   ├── diseno.md            ← paleta, tipografía y su justificación
│   └── privacidad.md        ← tratamiento de datos personales
└── tests/
```

---

## 4. Flujo de trabajo con Git

1. **Nunca** hacer push al repositorio principal. Cada integrante trabaja en su copia (fork) y propone cambios con pull request. Paso a paso en [`docs/equipo/README.md`](docs/equipo/README.md).
2. Crear una rama desde `main` actualizado con este formato:
   - `feat/descripcion-corta` (funcionalidad nueva)
   - `fix/descripcion-corta` (corrección)
   - `docs/descripcion-corta` (documentación)
   - `datos/descripcion-corta` (carga o actualización de datos)
3. Commits en español con formato *Conventional Commits*:
   `feat: agrega simulador de ranking`, `fix: corrige redondeo del puntaje ponderado`.
4. PR pequeños: idealmente menos de 400 líneas cambiadas. Un PR = una cosa.
5. Completar la plantilla del PR, **incluida la sección de IA utilizada**.
6. **Revisión y fusión:**
   1. Claude revisa la rama con la pauta [`revisar-pr`](.claude/skills/revisar-pr/SKILL.md) y entrega el informe al líder.
   2. El líder (@rafajaque) confirma o rechaza la revisión.
   3. Con la confirmación, Claude aplica los arreglos acordados y fusiona a `main` (un solo commit por PR).
   4. Si Claude es autor de la rama, lo declara en el informe y el líder revisa además lo subjetivo (lo visual, los textos).

### Uso de IA en este repositorio

- Pueden usar la IA que prefieran. Pásenle este archivo completo como contexto.
- **Ustedes son responsables del código que suben**, aunque lo haya escrito una IA. Léanlo y entiéndanlo antes de abrir el PR.
- Declarar en el PR qué IA se usó y para qué.
- No pegar en una IA externa datos reales de estudiantes, claves ni archivos `.env`.

---

## 5. Definición de "terminado"

Un PR está listo para revisión solo si:

- [ ] Compila y pasa `lint` y las pruebas.
- [ ] Los cálculos (puntaje, ranking, beneficios) tienen pruebas con casos verificados contra la fuente oficial.
- [ ] Todo dato nuevo mostrado tiene fuente, URL y fecha.
- [ ] No agrega datos personales sin justificación ni consentimiento.
- [ ] Funciona en pantalla de 360 px de ancho y con teclado.
- [ ] Usa solo variables de `diseno/tokens.css` (ningún color o medida escrito a mano) y `python3 scripts/tokens.py --check` pasa.
- [ ] Textos en español claro, sin siglas sin explicar.
- [ ] Documentación actualizada si cambió comportamiento, datos o diseño.
- [ ] Plantilla del PR completa.

---

## 6. Documentación y decisiones

Este proyecto también es un **proyecto de título de Ingeniería en Informática**, por lo que toda decisión debe quedar justificada y trazable.

- Decisiones de arquitectura, stack, diseño o datos se registran en `docs/decisiones/NNNN-titulo.md` con este formato:

```markdown
# NNNN — Título de la decisión
Fecha: AAAA-MM-DD · Estado: propuesta | aceptada | reemplazada
## Contexto
¿Qué problema hay?
## Opciones evaluadas
Mínimo dos, con pros y contras.
## Decisión
Qué se eligió.
## Justificación
Por qué, con fuentes si aplica.
## Consecuencias
Qué implica a futuro.
```

- **Diseño visual**: cada color, tipografía o patrón de interfaz se justifica en `docs/diseno.md` (contraste WCAG, legibilidad, identidad). Nada "porque se ve bonito".
- Código: comentar el **por qué**, no el qué.

---

## 7. Instrucciones directas para la IA asistente

Si eres una IA trabajando en este repositorio:

1. Lee este archivo completo antes de proponer cambios.
2. Haz el **cambio más pequeño** que resuelva la tarea. No agregues funcionalidades, dependencias ni abstracciones que nadie pidió.
3. Si la tarea pide inventar un dato (un monto, un plazo, un puntaje), **no lo inventes**: deja un `TODO(fuente)` y avisa.
4. Si la tarea entra en conflicto con la sección 2, detente y explícalo en lugar de continuar.
5. Escribe código, comentarios, textos de interfaz y mensajes de commit en **español**. Nombres de variables y funciones en español o inglés, pero consistentes dentro de cada módulo.
6. Al terminar, entrega un resumen de: qué cambiaste, por qué, qué no hiciste y qué queda pendiente.

---

## 8. Skills compartidas

Las skills son instrucciones especializadas para un tipo de tarea. Todo el equipo usa las mismas, para que el resultado se vea y se comporte igual sin importar quién o qué IA lo hizo.

| Skill | Úsala cuando… |
|---|---|
| [`mapa-de-trayecto`](.claude/skills/mapa-de-trayecto/SKILL.md) | Construyes o modificas cualquier pantalla o componente visual |
| [`datos-oficiales`](.claude/skills/datos-oficiales/SKILL.md) | Cargas, actualizas o muestras datos de DEMRE, SIES, Mineduc o CNA |
| [`lenguaje-claro`](.claude/skills/lenguaje-claro/SKILL.md) | Escribes cualquier texto que verá un estudiante: botones, errores, ayudas, páginas |
| [`asistente-seguro`](.claude/skills/asistente-seguro/SKILL.md) | Tocas el asistente IA, el protocolo de crisis o datos sensibles |
| [`revisar-pr`](.claude/skills/revisar-pr/SKILL.md) | Revisas un PR (líder y revisores) |

**Cómo usarlas según tu IA:**

- **Claude Code:** las carga sola desde `.claude/skills/`.
- **Cualquier otra IA (ChatGPT, Gemini, Copilot, Cursor):** pégale este archivo y el `SKILL.md` que corresponda a tu tarea al inicio de la conversación.
