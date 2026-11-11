# Guía de Rafael · Líder de arquitectura

> **Para la IA que acompaña a Rafael:** este documento es la hoja de ruta del líder. Antes de proponer cualquier cosa, lee `AGENTS.md`, `BITACORA.md`, `docs/plan.md` y `docs/arquitectura.md`. Rafael decide y aprueba; tú propones, verificas y declaras lo que no pudiste comprobar. Lo que **no se delega** a otra herramienta: `lib/ia/`, las políticas de Row Level Security (RLS) y los consentimientos ([reparto](reparto.md)). Si algo de aquí contradice `AGENTS.md`, gana `AGENTS.md`.

---

## Estado al 10 de noviembre de 2026

Según los PR del repositorio en esa fecha (101 fusionados en total). **82 PR fusionados salieron de la cuenta del líder**, la mayoría escritos con Claude y algunos con Codex o Antigravity, siempre revisados y aprobados por Rafael (`AGENTS.md`, sección 4). Alejandro fusionó 9 y Cristóbal 10.

| Área | Qué está hecho | Referencia |
|---|---|---|
| Reglas del proyecto | `AGENTS.md`, skills compartidas, plantilla de PR, CI de verificación, repositorio en la organización AE-SE | PR 6; ADR 0008 |
| Base de datos y privacidad | Esquema base con RLS y pruebas en CI. Permisos por defecto retirados. Programa separado de sus variantes. Datos oficiales completos. Alertas y derivación, derechos del titular, nota de cierre estructurada, flujo de tutor que impide que un menor se autorice a sí mismo y rendimiento de las políticas e índices. Todo aplicado en Supabase (São Paulo) | PR 3, 25, 23, 46, 72, 73, 81, 82, 86; ADR 0002, 0011, 0014, 0015, 0019, 0020, 0022 |
| Asistente IA | Protocolo de crisis con pruebas automatizadas (\*4141 y Salud Responde 600 360 7777), proveedor de IA detrás de una interfaz, limpieza de datos personales, endpoint del asistente y registro de alertas desde el servidor | PR 8, 9, 11, 12, 13, 74; ADR 0004 |
| Datos oficiales | Scripts de carga de oferta (Mineduc), empleabilidad e ingresos (SIES) y ponderaciones y vacantes (DEMRE). Carga DEMRE 2027 corregida y verificada. Lotes SQL de la oferta en tres partes. El portal lee la oferta desde la base | PR 39, 40, 43, 45, 92, 95, 97, 98, 99, 103 |
| Portal | Despliegue en Cloudflare con OpenNext. Ficha de carrera, explorador, portada, indicador de etapas, pie común y medida comparativa del comparador. Pruebas automáticas de accesibilidad (Playwright y axe-core) | PR 32, 35, 36, 38, 76, 104 a 108, 110; ADR 0003, 0021, 0023 |
| Documentos del proyecto de título | Entregable Parte I (puntos 1 a 8), encuesta y su ficha, verificación de cifras contra su origen, ADR 0012 y 0013 (promesa y deserción evitable), propuesta institucional y análisis de mercado | PR 24, 29, 30, 51, 71; PR 111 y 112 abiertos |
| Pronóstico (uso interno) | Plan de análisis, pronósticos 2027-2028 registrados y tablero interactivo. La página pública de transparencia se retiró por ser de uso interno | PR 77, 79, 89; ADR 0016, 0017, 0018 |
| Coordinación del equipo | Guías de Alejandro y Cristóbal, reparto de trabajo, revisión de los 19 PR del equipo y bitácora | PR 31, 55, 63, 64, 65 |

**Abiertos esperando al líder:**
- PR 111 (segmento por edad y sector social) y PR 112 (instrumento único de la encuesta). Chocan en una fila de la Tabla 2.4 y en la bitácora.
- PR 93 (ADR 0023 propuesto sobre cómo compartir el tablero) y PR 96 y 109 de Cristóbal.

---

## ⚠️ Urgente (esta semana)

1. **Revisar y fusionar los PR 111 y 112** del entregable. Al fusionar el segundo, en la Tabla 2.4 gana la versión del 112.
2. **Enviar el correo a los autores de la escala de la encuesta** (Ramírez Dorantes y Canto) para pedir permiso de usarla con la adaptación de vocabulario. El borrador está en `docs/encuestas/solicitud-permiso-eaec.md` (PR 112); anota ahí la fecha de envío. Sin permiso, la encuesta no se aplica.
3. **Enviar la revisión profesional del protocolo de crisis.** El documento de una página está listo (PR 83); faltan las respuestas P1, P2, P4, P6 y P7. Sin ellas no avanza la parte de crisis.
4. **Fusionar la renumeración de los ADR.** El Puntaje Ranking pasa de `0018` a `0024` (PR 114), y el tablero compartido del PR 93 pasa de `0023` a `0025`. Con eso no queda ningún número repetido.
5. **Revisar los PR 96 y 109 de Cristóbal** en la ventana del martes o del viernes.

---

## 1. Tu rol en una frase

Diseñas cómo se arma el sistema y respondes por lo que no puede fallar: que los datos de cada persona estén protegidos, que el asistente derive bien en una crisis y que nada llegue a `main` sin revisión.

**Te toca:** arquitectura, base de datos y RLS, privacidad y consentimientos, asistente IA y protocolo de crisis, despliegue, revisión y fusión de todos los PR, decisiones (ADR) y el informe de título.

**No te toca hacerlo tú** (pero sí revisarlo):
- Pantallas, estilos y accesibilidad → Alejandro.
- Datos oficiales, fórmulas de puntaje y textos → Cristóbal.

**Riesgo del rol:** el proyecto avanza al ritmo de una sola persona. Las tareas del equipo están fuera del camino crítico ([reparto](reparto.md)), pero cada PR de ellos espera tu revisión. Meta: ningún PR más de 3 días hábiles sin primera revisión.

---

## 2. Decisiones que solo puede tomar el líder

| Decisión | Estado | Dónde |
|---|---|---|
| ADR propuestos sin aceptar: 0012, 0013, 0014, 0016, 0017, 0018, 0022, 0023, 0024 y 0025 (este último en el PR 93) | Pendiente | `docs/decisiones/` |
| Excepción de licencia MPL-2.0 para axe-core (dependencia de desarrollo) | Pendiente | ADR 0021 |
| Respaldo de los códigos DEMRE 17074 y 32012 (UACh y Universidad de Los Lagos) | Pendiente | Guía de Cristóbal, C8 |
| Plazos `TODO(profesional)` y `TODO(legal)` de alertas y derechos del titular | Pendiente de las revisiones externas | ADR 0019 y 0020 |
| Territorio de prueba (se propone O'Higgins) y fechas de la encuesta y las entrevistas | `[CONFIRMAR]` en el entregable | Puntos 1 y 2 |
| Borrar la rama `docs/estado-9-nov` creada por error en `origin` | Pendiente de confirmación | Bitácora, 2026-11-09 |

---

## 3. Riesgos abiertos que debes vigilar

- **CPU de Cloudflare:** la mediana medida es de 29,47 ms frente al límite de 10 ms del plan gratuito (reserva 2 del ADR 0003, PR 88). Falta confirmar el límite vigente en la documentación de Cloudflare.
- **Clave de Gemini:** el ADR 0004 exige pasar a la clave del nivel pagado antes de las pruebas con usuarios reales. Fecha límite: lunes 23 de noviembre de 2026.
- **Variables del despliegue:** verificar en el panel de Cloudflare que existen `GEMINI_API_KEY`, `GEMINI_MODELO`, `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`. Las de Supabase ya se leen del contexto de Cloudflare (PR 101 y 103).
- **Solicitud de transparencia sobre el FUAS** (folio AJ025T0003786): vence cerca del 2 de diciembre; si no llega, la cifra se declara como no disponible.

---

## 4. Tus tareas

### Semana 1 · Cimientos (3 al 9 de noviembre): hecha

| Tarea | Estado | Referencia |
|---|---|---|
| R1 · Esquema base con RLS y pruebas en CI | Hecha y aplicada | PR 3, 25 |
| R2 · Protocolo de crisis con pruebas | Hecha; falta la revisión profesional | PR 8, 11, 34 |
| R3 · Proveedor de IA y limpieza de datos personales | Hecha | PR 9, 12, 13 |
| R4 · Primera carga oficial y despliegue en Cloudflare | Hecha | PR 32, 39, 40, 43 |

### Semana 2 · Explorar (10 al 16 de noviembre): adelantada

| Tarea | Estado | Referencia |
|---|---|---|
| R5 · Ficha de carrera real desplegada (meta del 16 de noviembre) | Hecha antes de plazo según los PR: las fichas consultan Supabase en vivo. Falta confirmarlo en el sitio publicado, con 360 px y teclado | PR 99, 103 |
| R6 · Oferta completa cargada en la base | Hecha en tres lotes | PR 95, 97, 98 |
| R7 · Revisar el explorador y el comparador del equipo | Hecha; rediseño del explorador el 10 de noviembre | PR 57, 104 a 110 |

### Semana 3 · Acompañar (17 al 23 de noviembre): parte adelantada

| Tarea | Estado | Referencia |
|---|---|---|
| R8 · Alertas, derivación y endpoint del asistente | Hecha antes de plazo | PR 72, 74, 81 |
| R9 · Derechos del titular (exportar y solicitar) | Hecha antes de plazo | PR 73 |
| R10 · Flujo de tutor para menores de 18 | Base de datos hecha; falta la interfaz y la revisión legal del ADR 0022 | PR 82 |
| R11 · Ficha de Trayectoria y consentimientos en la interfaz | Pendiente. Las tablas existen | ADR 0015 |
| R12 · Revisión profesional del protocolo de crisis | Documento listo, sin enviar | PR 83 |
| R13 · Pasar Gemini al nivel pagado | Pendiente; límite el 23 de noviembre | ADR 0004 |

### Semana 4 · Seguir y vender (24 al 30 de noviembre)

| Tarea | Estado | Referencia |
|---|---|---|
| R14 · Pulso de check-in mínimo (sensor por autorreporte y silencio, nunca predicción) | Pendiente; necesita revisión legal antes de activarse | ADR 0010 |
| R15 · Panel de agencia mínimo | Pendiente | `docs/plan.md` |
| R16 · Demostración del panel institucional con datos de ejemplo, marcada como tal | Pendiente | Reparto, sección 4 |
| R17 · Pruebas con 5 usuarios reales del segmento, con Alejandro y Cristóbal | Guion listo; sesiones pendientes | PR 58 |

### Cierre (1 y 2 de diciembre)

| Tarea | Estado |
|---|---|
| R18 · Completar el entregable con los resultados de la encuesta y las entrevistas (los `[COMPLETAR]` del Punto 2) | Pendiente |
| R19 · Puntos 9 (valorización) y 10 (presupuesto) del entregable, cuando lleguen sus guías | Pendiente |
| R20 · Informe de título y presentación | Pendiente |

---

## 5. Cómo revisas un PR

1. Ventanas de revisión: **martes y viernes**. Un PR abierto antes de la ventana se revisa en ella.
2. Claude revisa con la pauta [`revisar-pr`](../../.claude/skills/revisar-pr/SKILL.md) y te entrega el informe. Tú confirmas o rechazas.
3. Con tu confirmación, Claude aplica los arreglos acordados y fusiona a `main` en un solo commit.
4. Si Claude es autor de la rama, lo declara en el informe y tú revisas además lo subjetivo (lo visual, los textos).
5. Cada encargo al equipo se manda por escrito, con la fecha de cada paso, y se cierra con lo que hay que arreglar antes de la próxima ventana.

---

## 6. Errores que ya pasaron y no deben repetirse

Tomados de la [bitácora](../../BITACORA.md).

- **Cambiar un dato por una nota sin mirarlo en la fuente:** pasó con la empleabilidad de Derecho y se revirtió.
- **Apilar PR de documentación:** nunca corrieron su CI. Ábrelos todos contra `main`.
- **Duplicar lógica al resolver conflictos con `-X theirs`:** pasó con `lib/datos/ruta.ts` y `fechas.ts`.
- **Contar como revisión independiente la que hace el propio autor de la carga:** pasó con la fila 12070 del DEMRE.
- **Confiar en la respuesta de una herramienta de IA sin verificarla:** Antigravity se equivocó con el adaptador de Cloudflare y Codex se colgó horas esperando una entrada.
- **Sumar documentos mientras el producto no avanza:** el 5 de noviembre, cinco commits seguidos fueron de documentación y el portal tenía una sola página.
