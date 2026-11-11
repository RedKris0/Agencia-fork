# 0025 — Celdas suprimidas visibles sin cifra

Fecha: 2026-11-10 · Estado: aceptada por el líder el 2026-11-10 (opción B). Revisión legal del [ADR 0018](0018-producto-de-planificacion-de-oferta.md) completada el 2026-11-10 y confirmada por el líder; cubre la aplicación de este ADR · Relacionado: [ADR 0018](0018-producto-de-planificacion-de-oferta.md), [ADR 0017](0017-pronostico-agregado-piloto-sede-privada.md)

## Contexto

El tablero del pronóstico 2027-2028 entrega cifras solo para las celdas de carrera, sede y jornada con 10 o más estudiantes estimados. Las demás se suprimen (ADR 0018, límite 1). Hoy son **8.082 de 15.043 celdas**. El tablero dice cuántas hay en cada región y jornada, pero no muestra cuáles son.

El líder pide ver el **100 % de las carreras a nivel país**: que cada combinación de carrera, sede y jornada aparezca, aunque no tenga cifra. El límite 1 del ADR 0018 dice «Ninguna celda con menos de 10 estudiantes se entrega». Mostrar el nombre de una carrera en una sede ya es entregar la celda, aunque sin número. Por eso se necesita una decisión explícita antes de cambiar el producto.

El riesgo que el umbral protege es la identificación de grupos pequeños. Una celda suprimida no tiene cifra, rango ni intervalo, y su estudiante no puede identificarse por ella, porque el umbral agrupa a todos los estudiantes de la celda.

## Opciones evaluadas

**A. Mantener el límite del ADR 0018.** Solo se muestran las celdas con cifra. Las suprimidas aparecen como conteo por región y jornada, como hoy.
- Pros: cumple la regla vigente sin cambios.
- Contras: no responde «qué carreras hay en una sede», que es la pregunta más pedida.

**B. Mostrar las celdas suprimidas con nombre, sede, comuna y jornada, pero sin cifra, rango ni intervalo.** Se etiquetan como «menos de 10 estudiantes estimados». No se puede ordenar por cantidad ni sumar.
- Pros: responde «qué carreras hay» sin entregar cifras bajo el umbral.
- Contras: cambia el límite 1 del ADR 0018. Requiere revisar que el nombre de una celda pequeña no permita inferir datos de personas (por ejemplo, en una sede con pocas carreras).

**C. Mostrar las celdas suprimidas con cifra «menos de 10» pero con el número exacto de carreras por sede.** Es un punto intermedio.
- Pros: da más detalle sin nombres de carrera.
- Contras: el conteo por sede puede combinarse con otros datos para estimar el tamaño de una celda pequeña. Riesgo mayor que en B.

## Decisión propuesta

Opción **B**, con estas condiciones:

1. Las celdas suprimidas no llevan cifra, rango, intervalo ni suma. La etiqueta es fija: «menos de 10 estudiantes estimados».
2. No se pueden filtrar ni agrupar por variables protegidas (ADR 0018, límite 2) ni cruzar con datos personales.
3. Se marcan como suprimidas en el CSV de exportación, sin columna de cifra.
4. El cambio se aplica solo tras la revisión legal pendiente del ADR 0018, que aún no está resuelta.
5. Se mantiene la prueba automática que impide que una cifra suprimida llegue al tablero o a un archivo exportado.

## Justificación

- El umbral de 10 existe para evitar identificar grupos pequeños con cifras. Sin cifra, el nombre de la carrera no revela cuántos estudiantes hay.
- La transparencia sobre qué carreras existen en una sede es una necesidad de planificación de la institución y de los estudiantes.
- El ADR 0018 ya prohíbe cruces por variables protegidas; B no las agrega.

## Consecuencias

- El límite 1 del ADR 0018 deja de ser «ninguna celda con menos de 10 se entrega» y pasa a ser «ninguna cifra con menos de 10 se entrega».
- El generador (`datos/pronosticos/dashboard/generar_datos.py`) debe guardar nombre, sede, comuna y jornada de las celdas suprimidas. Hoy guarda solo institución, región y jornada.
- El cruce con la oferta debe corregirse para las filas que hoy no tienen ficha (3.546 filas). Eso es un trabajo separado de datos.
- El tablero debe avisar que las celdas suprimidas no tienen cifra, en cada lista donde aparezcan.
