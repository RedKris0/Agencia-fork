# Encuesta del estudio

Una sola encuesta mide el problema que aborda el proyecto, sin mencionar la plataforma ni ninguna solución. Se aplica a estudiantes de 3.° y 4.° medio de establecimientos con financiamiento público (segmento del Punto 1 del entregable). Es **un solo instrumento estandarizado, completo**: la Escala de Autoeficacia para la Elección de Carrera (EAEC) de Ramírez Dorantes y Canto (2007), con 55 ítems y respuesta de 0 a 9. Se agregan tres preguntas de clasificación.

Actualizado: 2026-11-10.

| Archivo | Qué es |
|---|---|
| [`encuesta-escolar.md`](encuesta-escolar.md) | Presentación, autorizaciones, preguntas de clasificación y los 55 ítems de la EAEC |
| [`ficha-metodologica-escolar.md`](ficha-metodologica-escolar.md) | Por qué la EAEC, objetivo, muestra, adaptación de vocabulario ítem por ítem, puntuación, análisis, ética y limitaciones |
| [`carta-colegios.md`](carta-colegios.md) | Carta para pedir la autorización de los colegios |
| [`consentimiento-apoderados.md`](consentimiento-apoderados.md) | Consentimiento informado para los apoderados |
| [`crear_encuestas.gs`](crear_encuestas.gs) | Script de Google Apps Script que crea el formulario en Google Forms |
| [`solicitud-permiso-eaec.md`](solicitud-permiso-eaec.md) | Borrador del correo a los autores de la escala, con el registro de envío y respuesta |

## Decisiones que conviene conocer

- **Un solo instrumento estandarizado (2026-11-10, decisión del líder).** Reemplaza la versión del 2026-11-06, que combinaba ítems de seis fuentes sin validación como conjunto. Se aplica completo; solo se adapta el vocabulario de México a Chile, con cada cambio declarado en la ficha.
- **Solo escolares.** Se retiró la encuesta de adultos (queda en el historial de git).
- **Sin ítems de conocimiento de beneficios** (FUAS, gratuidad, becas, CAE): no existe una escala validada que los mida. Esa pregunta queda para las entrevistas y la medición con datos administrativos (folio AJ025T0003786).
- **El juicio de expertos y el piloto son controles adicionales**, no el respaldo (Escobar-Pérez y Cuervo-Martínez, 2008).
- **Sin comité de ética:** la institución no lo exige para este proyecto. La revisión la hace el profesor guía. Con menores de edad se mantienen las tres autorizaciones: colegio, apoderado y estudiante.

## Pendientes

- Permiso de los autores para usar la EAEC con la adaptación de vocabulario, y confirmación de qué ítems forman cada subescala.
- Umbral del juicio de expertos.
- Tiempo real de respuesta (se mide en el piloto; hoy se estima entre 10 y 15 minutos).

## Los formularios en uso

Están en Google Forms, en la cuenta institucional del líder, junto con sus planillas de respuestas. **Sus enlaces no se guardan aquí**: si el repositorio es público, cualquiera podría responder y contaminar los datos. Se piden al líder. Los formularios creados con versiones anteriores (2026-11-04 y 2026-11-06) hay que reemplazarlos por el que genere el script nuevo.

## Antes de aplicar

- [ ] Permiso de los autores de la EAEC (borrador del correo en [`solicitud-permiso-eaec.md`](solicitud-permiso-eaec.md)).
- [ ] Juicio de expertos sobre la adaptación de vocabulario (plantilla en la ficha).
- [ ] Piloto con 10 a 15 estudiantes.
- [ ] Revisión del profesor guía.
- [ ] Autorización de los colegios y consentimiento de los apoderados.
- [ ] Borrar de la planilla las respuestas de prueba.

Si cambia un ítem, se cambia aquí, en el formulario (`crear_encuestas.gs`) y en la ficha a la vez.
