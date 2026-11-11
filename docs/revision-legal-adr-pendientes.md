# Revisión legal de los documentos sin aprobar

Fecha: 2026-11-09 · Revisó: Claude, en rol de revisor jurídico, a pedido del líder (@rafajaque) · Alcance: ADR 0012, 0013, 0014, 0016, 0017, 0018 (producto), 0018 (puntaje), plan de análisis, informe del pronóstico y propuesta institucional.

> **Nota del 2026-11-11.** Documento del 9 de noviembre, rescatado de la rama local `feat/tablero-pronostico`, donde estaba la única copia. No se editó su contenido. Después se renumeraron ADR (el hallazgo 8 sobre el doble 0018 ya no aplica tal cual) y los estados de aceptación que recoge todavía no están en los ADR de `main`.
>
> **Límite de esta revisión.** Es un análisis de cumplimiento hecho por una IA con los textos legales que los propios documentos citan (Ley 21.719, Ley 20.609, Ley 21.091) y con lo que el repositorio dice haber verificado en bcn.cl. **No es asesoría de un abogado habilitado** y no reemplaza la que el ADR 0018 exige antes de una oferta comercial. Lo que no pude leer en la fuente lo marco como «sin verificar».

## Veredicto

| Documento | Resultado | Condición principal |
|---|---|---|
| ADR 0012 Cadena causal y promesa | **Aprobado con condiciones** | La frase «la plataforma produce ese tipo de evidencia» solo se usa cuando exista esa evidencia (publicidad engañosa) |
| ADR 0013 Deserción evitable | **Aprobado con condiciones** | El «20 %» siempre como techo y con su fuente; cerrar el `TODO(fuente)` antes de usarlo comercialmente |
| ADR 0014 Esquema de datos oficiales | **Aprobado** | Dejar registrado que varias fuentes no publican licencia de reutilización (ver 2) |
| ADR 0016 Predicción condicionada | **Aprobado** como compuerta | No habilita nada: la predicción sigue prohibida hasta cumplir las 8 precondiciones y tener la revisión legal del artículo 8° bis |
| ADR 0017 Pronóstico y piloto | **Aprobado** | Sin nombre de la institución en nada que salga del repositorio |
| ADR 0018 Planificación de oferta | **Aprobado solo como decisión interna** | **No autoriza ofertar ni firmar contrato.** Eso exige abogado, antes del 1 de diciembre de 2026 |
| ADR 0018 Puntaje ranking manual | **Aprobado** | Sin reparos legales; ver el problema de numeración |
| Plan de análisis | **Aprobado, con la parte A5 y la parte B bloqueadas** | A5 no se activa sin términos de uso revisados; B sigue sujeto al ADR 0016 |
| Informe del pronóstico 2027 | **No aprobado** (no es una decisión: es borrador interno) | Publicación solo con aprobación del líder (A4 del plan) y sin nombrar sedes |
| Propuesta institucional | **No aprobada** | Borrador. Requiere abogado antes de mostrarla a una institución |

## Hallazgos

### 1. Ley 21.719 entra en vigencia el 1 de diciembre de 2026
Es dentro de tres semanas. Hoy la plataforma no trata datos personales en estos productos: el pronóstico usa agregados con supresión bajo 10 casos, y la predicción individual está bloqueada. Eso es lo que sostiene que el artículo 8° bis (decisiones automatizadas) no se active. **Si algún cambio agrega datos individuales a estos productos, esa conclusión cae** y hay que repetir la revisión.

### 2. Fuentes sin licencia de reutilización
`docs/fuentes.md` registra que Datos Abiertos Mineduc, CNA y Minsal no publican términos ni licencia, y que SIES solo da instrucciones de atribución. La ausencia de licencia no prohíbe el uso, pero **tampoco lo autoriza expresamente para uso comercial**. Riesgo: bajo a medio, porque son datos públicos de organismos del Estado, con cita de fuente. Mitigación: mantener fuente, URL y fecha en cada cifra (ya es regla) y, antes de vender un informe, pedir por escrito a Mineduc y SIES que confirmen la reutilización comercial. Sin verificar: si alguna norma de datos abiertos del Estado cubre estas bases.

### 3. Promesas y publicidad (ADR 0012 y 0013)
Las promesas prohibidas están bien delimitadas y son lo correcto. Dos puntos finos:
- «La plataforma produce ese tipo de evidencia» describe algo que aún no existe. Hoy no hay piloto ni medición propia. Decirlo a un comprador sería afirmar algo no comprobable.
- El costo de deserción (US$ 780 millones, 26 %, etc.) es de fuentes antiguas (2005 y 2016) y de alcance limitado. El ADR ya lo trata como techo. Eso debe mantenerse en todo material.

### 4. Ley 21.091
El ADR 0012 afirma que no impone obligación de acompañamiento a las instituciones (art. 8, letra c). **Sin verificar por mí** en el texto vigente; el repositorio no deja constancia de la lectura en bcn.cl. Hay que confirmarla antes de usarla en una presentación.

### 5. Ley 20.609 y responsabilidad por el uso del informe
Descartar perfiles por sexo, edad o nivel socioeconómico (ADR 0018) es correcto. El riesgo restante es que una institución use el informe para admitir o seleccionar. La cláusula «termina el contrato» y la auditoría anual son buenas, pero **solo valen si están escritas en el contrato**. Eso es trabajo de abogado (preguntas 2 a 4 del ADR 0018).

### 6. Menores de 18 años
Pregunta 6 del ADR 0018 sigue abierta: cómo se aplica el artículo 8° bis a menores y cómo se integra con la autorización del tutor. No bloquea nada hoy, porque no hay datos individuales, pero bloquea la parte B del plan y el ADR 0016.

### 7. Automatizar la lectura de sitios (plan, A5)
AGENTS.md 2.1 exige revisar los términos de uso antes de automatizar la lectura de un sitio. A5 propone revisar las páginas de INE, Mineduc, DEMRE y SIES cada semana. Hasta que `docs/fuentes.md` registre esa revisión para cada una, **A5 no se activa**. El valor de la UF ya está tratado así (se escribe a mano).

### 8. Orden documental
- Hay **dos ADR con el número 0018** (planificación de oferta y puntaje ranking). Rompe la trazabilidad que exige AGENTS.md sección 6. No lo renumeré porque otras ramas podrían citarlo; el líder decide cuál pasa a 0022.
- El ADR 0018 y el plan de análisis enlazaban un archivo que ya no existe (`0017-pronostico-agregado-piloto-aiep-san-fernando.md`). Corregido al nombre actual.
- El nombre de una institución real aparece en el informe interno y en el plan. Es aceptable mientras el repositorio sea privado y no se publique (ADR 0017, punto 2).

## Lo que queda abierto (no lo resuelve esta revisión)

1. Abogado habilitado: contrato, cláusula de salida, vía de compra pública, y preguntas 1 a 6 del ADR 0018. **Antes del 1 de diciembre de 2026.**
2. Lectura completa de los artículos citados de la Ley 21.091.
3. Confirmación escrita de reutilización comercial de datos SIES y Mineduc.
4. Plazos `TODO(legal)` ya abiertos en el ADR 0020.
