# Reparto de trabajo hasta el 2 de diciembre

Propuesta del 5 de noviembre de 2026, **pendiente de confirmación del líder**. Complementa las guías de [Rafael](guia-rafael.md), [Alejandro](guia-alejandro.md) y [Cristóbal](guia-cristobal.md); no las reemplaza.

**Problema que resuelve:** la mayor parte del código la escribe el líder y todos los PR esperan su revisión, así que el producto avanza al ritmo de una sola persona. Esta versión saca a Alejandro y a Cristóbal del camino crítico: lo que ellos entreguen suma, pero el portal no se detiene si se demoran.

## 1. Meta de las próximas dos semanas

**Lunes 16 de noviembre:** la ficha de una carrera real, con datos oficiales, fuente y fecha, publicada en Cloudflare. Todo lo que no sirva a esa meta espera.

## 2. Quién hace qué

### Camino crítico: líder, Claude y Codex o Antigravity

| Fecha | Entrega |
|---|---|
| Vie 6 nov | Revisión de #22 y #28 (desbloquea a los dos) |
| Dom 8 nov | Migraciones aplicadas en el Supabase real. Adaptador de Cloudflare configurado (A4, que en la guía era de Alejandro) |
| Mié 11 nov | `lib/datos/` con las consultas de ficha y explorador |
| Vie 13 nov | Ficha de carrera (A5) con los datos de ejemplo de #22 |
| Lun 16 nov | Ficha desplegada con una carrera real (de la carga de Cristóbal o cargada a mano con fuente) |
| Semana 3 | Ruta del asistente con el protocolo de crisis. Pedir ya la revisión profesional de ese protocolo |
| Semana 4 | Permanencia mínima (beneficios de mantención y pulso de check-in). Panel de agencia mínimo |

Las pantallas repetitivas (A6 explorador, A7 comparador, A11 beneficios) se encargan a Codex o Antigravity con la skill `mapa-de-trayecto`. Lo que no se delega: `lib/ia/`, RLS y consentimientos.

### Alejandro: pocas tareas, con fecha (todo el sábado 7)

| Fecha | Tarea |
|---|---|
| Vie 6 nov | Responder los comentarios de revisión de #28 (A2, tipografías) |
| Sáb 7 nov | A3: los componentes base y la página `/componentes`. Si faltan piezas, abrir el PR con las que haya y avisar cuáles faltan |
| Cuando la ficha esté lista (meta: vie 13 nov) | Revisión de la ficha de carrera: 360 px, teclado, lector de pantalla, contraste |
| Desde la semana 3 | Pantalla del asistente (A9), pruebas con usuarios (A14) |

### Cristóbal: una cosa a la vez, en este orden (todo el sábado 7)

| Fecha | Tarea |
|---|---|
| Vie 6 nov | Responder los comentarios de revisión de #22 (C4, datos de ejemplo) |
| Sáb 7 nov | C3: el diccionario de datos |
| Sáb 7 nov | C5: carga de oferta. **Plan B:** si no sale, cargar a mano de 5 a 10 carreras reales con URL y fecha |
| Sáb 7 nov | C7: cálculos de puntaje y ranking, con pruebas de casos oficiales. Si no alcanza, queda para el lunes 9 y se avisa el sábado |
| Semana 3 en adelante | C6, C8, C9, C9b según avance |

## 3. Revisión

- Ventanas **martes y viernes**. Un PR abierto antes de esa ventana se revisa en ella.
- Cada encargo se manda por escrito, con la fecha de cada paso, y se cierra con lo que hay que arreglar antes de la próxima ventana.
- Propuesta para después, no para esta semana: una vía verde en que Claude fusione lo que no toca privacidad, RLS ni IA. Cambia `AGENTS.md` 4.6 y necesita un ADR corto.

## 4. Qué se recorta

- **Panel institucional:** una pantalla de demostración con datos de ejemplo, marcada como tal.
- **Módulo de permanencia:** solo beneficios de mantención y el pulso mínimo. Relatos de pares y escalera de derivación quedan como diseño en el ADR 0010.
- **Documentos nuevos (ADR, informes):** ninguno hasta que la ficha esté desplegada, salvo que cambie una regla de `AGENTS.md`.

## 5. Cómo saber si funciona

- Ningún PR del equipo espera más de 3 días hábiles sin primera revisión.
- El 16 de noviembre la ficha real está publicada.
- Menos del 50% de los commits de la semana son del líder.
- Lo que el equipo aporta queda identificable para el informe de título: datos verificados, cálculos con pruebas, accesibilidad y pruebas con usuarios.
