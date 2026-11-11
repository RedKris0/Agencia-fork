# Plan paso a paso: cupos ofrecidos frente a demanda estimada, por institución

Fecha: 2026-11-10 · Estado: borrador para aprobación del líder (@rafajaque)

> Regla de este plan: **no se avanza al paso siguiente si el paso anterior no está al 100 %.** Cada paso tiene un criterio de cierre medible. Si un criterio no se cumple, se detiene el plan, se informa qué falta y no se continúa.

## Alcance

Agregar al tablero una comparación, para **todas las instituciones con oferta 2027**, entre:
- **Demanda estimada:** entrantes estimados por carrera y sede (ya existe en el tablero), con su intervalo de 95 %.
- **Cupos ofrecidos:** vacantes publicadas en la oferta oficial 2027 de DEMRE (`2027-26-09-24-oferta-definitiva-carreras-p2027.pdf`, ya usado en `datos/cargar_demre.py`).

La brecha (demanda estimada menos cupos) se muestra solo cuando ambas cifras existen y cumplen la regla de supresión.

**Fuera de alcance:** discapacidad o neurodivergencia por carrera (no hay fuente oficial verificada; ver ADR 0018), predicción de deserción, y cualquier orden que favorezca a una institución cliente.

---

## Paso 0. Decisión y registro (ADR)

**Hacer:** redactar un ADR `docs/decisiones/NNNN-cupos-frente-a-demanda.md` que fije: qué es un cupo, cómo se compara con la demanda estimada, cómo se muestra la brecha y que la brecha no es una predicción de admisión.

**Criterio de cierre (100 %):**
- [ ] ADR en estado «aceptada», con las opciones evaluadas (mínimo dos).
- [ ] El líder lo confirma por escrito.
- [ ] Revisado contra ADR 0018 (producto de planificación) y ADR 0025 (celdas suprimidas).

---

## Paso 1. Inventario completo de instituciones

**Hacer:** listar todas las instituciones de la oferta 2027 (código SIES, nombre, tipo) y cruzarlas con las que aparecen en las celdas del tablero y en las suprimidas.

**Criterio de cierre (100 %):**
- [ ] Cada institución de la oferta 2027 tiene su código SIES asignado.
- [ ] Cada diferencia entre listas (institución en oferta y no en el tablero, o al revés) está listada con su motivo. Cero diferencias sin motivo.
- [ ] Total de instituciones confirmado y anotado en `docs/fuentes.md`.

---

## Paso 2. Extraer los cupos ofrecidos 2027

**Hacer:** extraer las vacantes de la oferta oficial por institución, código, sede y jornada. El PDF exige revisión manual (ver `datos/registro_descargas.md`). Leer siempre el archivo original con un script; nunca abrirlo y guardarlo en Excel (borra ceros de los códigos).

**Criterio de cierre (100 %):**
- [ ] Para cada institución, la suma de vacantes extraídas es igual a la suma del PDF (control por institución, sin excepciones).
- [ ] Toda fila ambigua se revisó a mano y quedó anotada.
- [ ] Un cupo no informado queda **vacío con su motivo**, nunca como 0.
- [ ] Prueba automática del script de extracción (unittest) pasa.

---

## Paso 3. Cruce cupos con oferta histórica

**Hacer:** cruzar cada fila de cupos 2027 con la oferta SIES 2026 (`datos/cargar_oferta.py`) por código SIES y sede. Usar la clave (código, sede), no solo el código, porque un código puede repetirse en varias sedes (PR #126).

**Criterio de cierre (100 %):**
- [ ] Cada fila de cupos tiene un código SIES asignado, o queda listada como «sin cruce» con su motivo.
- [ ] Cero filas asignadas a una sede equivocada (se verifican 20 casos a mano contra la fuente).
- [ ] Las filas «sin cruce» están explicadas una a una.

---

## Paso 4. Cálculo de la brecha

**Hacer:** para cada (institución, carrera, sede, jornada) con demanda estimada y cupos:
- brecha central = entrantes estimados menos cupos;
- rango de la brecha a partir del intervalo de 95 %.

Si falta uno de los dos datos, la brecha queda **sin cifra** con su motivo.

**Criterio de cierre (100 %):**
- [ ] Pruebas unitarias de la función (Python) y de la parte de JavaScript (`filtros.test.cjs`) pasan.
- [ ] 10 casos elegidos al azar se recalculan a mano y coinciden con el resultado.
- [ ] Ninguna brecha se muestra cuando falta un dato; no hay ceros de relleno.

---

## Paso 5. Supresión y sin cifra

**Hacer:** aplicar la regla de ADR 0025: si la demanda o los cupos están bajo el umbral de 10 estudiantes, la brecha no se muestra con cifra.

**Criterio de cierre (100 %):**
- [ ] Auditoría: ninguna cifra menor de 10 aparece en la vista nueva.
- [ ] Pruebas que cubren el umbral (9, 10 y casos sin dato).

---

## Paso 6. Vista en el tablero

**Hacer:** una sección nueva, con una tabla por institución. Orden **solo por criterio explícito** (por ejemplo, tamaño de la brecha), nunca por ser cliente. Textos en lenguaje claro, con la explicación de cada columna.

**Criterio de cierre (100 %):**
- [ ] Verificado a 360 px de ancho, solo con teclado, y en modo oscuro.
- [ ] Sin colores ni medidas escritos a mano (`python3 scripts/tokens.py --check` pasa).
- [ ] Revisión de neutralidad: ningún orden ni destaque favorece a un cliente.
- [ ] Revisión de accesibilidad (axe) sin errores.

---

## Paso 7. Documentación y fuentes

**Hacer:** actualizar `docs/fuentes.md`, `datos/registro_descargas.md`, el README del dashboard y el manual del tablero.

**Criterio de cierre (100 %):**
- [ ] Toda cifra nueva tiene fuente, URL, período y fecha de consulta.
- [ ] El manual explica qué es la brecha y qué no es (no es una predicción de admisión).

---

## Paso 8. Revisión, confirmación y fusión

**Hacer:** dividir en PR de menos de 400 líneas (por ejemplo: ADR; extracción; cruce; cálculo; vista; documentación). Cada PR con la plantilla completa, revisado con la pauta `revisar-pr`, y fusionado a `main` como un solo commit solo tras la confirmación del líder.

**Criterio de cierre (100 %):**
- [ ] Cada PR tiene su informe `revisar-pr` entregado al líder.
- [ ] El líder confirma cada PR por escrito.
- [ ] CI de `main` en verde tras la última fusión.

---

## Paso 9. Revisión legal (antes de vender)

**Hacer:** el dashboard hoy es público y gratuito. Antes de ofrecer la comparación a instituciones como servicio pagado (SaaS, ADR 0018), la revisión legal debe confirmar el uso comercial de los datos derivados.

**Criterio de cierre (100 %):**
- [ ] Revisión legal documentada en el ADR 0018, con fecha y responsable.
- [ ] Sin revisión legal, el paso 9 no se cierra y no se ofrece la función comercialmente.

---

## Pendientes y riesgos

- El PDF de la oferta 2027 requiere revisión manual; si el paso 2 no cuadra al 100 %, el plan se detiene ahí.
- El PDF de SIES 2025 no se pudo leer (mifuturo.cl fuera de servicio); no depende de este plan.
- La brecha es una estimación con error (mediana 11,9 %). Debe decirse en la vista.
