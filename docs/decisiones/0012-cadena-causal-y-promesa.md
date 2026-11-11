# 0012 — Cadena causal del problema y promesa verificable

Fecha: 2026-11-04 · Estado: aceptada (2026-11-09, por el líder, tras [revisión legal](../revision-legal-adr-pendientes.md); condición: el argumento de acreditación «la plataforma produce ese tipo de evidencia» se usa solo cuando exista esa evidencia)

Respaldo: [informe de fundamentación](../informe-fundamentacion.md) · [anexo de evidencia](../evidencia-acceso-salud-mental.md) · [series y proyección](../series-y-proyeccion.md) · [cierre de pendientes](../cierre-de-pendientes.md) · [revisión final](../revision-final.md)

Relacionado: [ADR 0010](0010-modulo-de-permanencia.md)

## Contexto

La plataforma necesita una formulación del problema que sirva a la vez para la defensa académica del proyecto de título y para el pitch comercial.

La formulación inicial encadenaba: *estudiante desinformado → depresión; no entrar a estudiar → más depresión; la plataforma lo ayuda a entrar → menos depresión*.

Al verificar cada eslabón contra la evidencia disponible, el último no se sostiene. Un estudio con variables instrumentales sobre la expansión universitaria en China no encontró efecto causal de la educación superior sobre la salud mental, y las revisiones del área describen la evidencia como escasa, mixta e inconsistente. Además, en Chile la prevalencia de síntomas depresivos **dentro** de la educación superior está entre 16,5% y 38,8%, de modo que afirmar que entrar reduce la depresión contradice los datos nacionales.

Sostener esa cadena expondría al proyecto en cuatro frentes: ético, regulatorio, académico y comercial.

Al mismo tiempo, el problema que la cadena intentaba describir sí existe y es documentable.

## Opciones evaluadas

### Opción A — Mantener la cadena original

Terminar la cadena en la depresión y prometer impacto en salud mental.

- A favor: es el titular emocionalmente más potente y el más fácil de comunicar.
- En contra: el eslabón final contradice la evidencia; no es medible por la plataforma; posiciona a la agencia como interviniente en salud, contra el ADR 0010; una comisión lo desarma preguntando por evidencia causal.

### Opción B — Eliminar toda referencia a salud mental

Hablar solo de acceso y beneficios.

- A favor: máximo rigor, cero riesgo.
- En contra: el costo humano de la exclusión es real, documentado y pertinente al diagnóstico. Omitirlo empobrece la fundamentación sin ganar precisión, y deja al módulo de permanencia sin justificación.

### Opción C — Cambiar el desenlace de la cadena a la exclusión (elegida)

La salud mental entra como costo asociado a la exclusión, no como variable que la plataforma promete mover.

- A favor: los cuatro eslabones quedan respaldados; las métricas quedan bajo control de la plataforma; mantiene el peso del diagnóstico; es coherente con el ADR 0010.
- En contra: exige más precisión y disciplina de citación del equipo; obliga a revisar material ya producido.

### Opción D — Presentar proyecciones de prevalencia a tres años

- A favor: refuerza la urgencia.
- En contra: la serie del Termómetro no lo soporta (cambio de universo entre rondas, periodicidad irregular, estacionalidad, no monotonía). Se reemplaza por aritmética de brecha y de stock, que son verificables.

## Decisión

Se adopta la **opción C**. El desenlace de la cadena es la exclusión.

| Eslabón | Afirmación | Estado de la evidencia |
|---|---|---|
| A | La desinformación reduce el acceso | Causal, experimental en Estados Unidos; en Chile, evidencia experimental sobre la elección de programa, no sobre el acceso |
| B | Quien no entra engrosa la población excluida | Documentado, magnitud oficial |
| C | La exclusión deteriora la salud mental y la reinserción la mejora | Causal longitudinal, por analogía con desempleo |
| D | Entrar remueve la exposición | Prevención de incidencia, no reducción de prevalencia |

### Promesa autorizada

> La plataforma reduce la exclusión de la educación superior causada por desinformación sobre beneficios estudiantiles, y acompaña la permanencia de quienes ingresan.

### Promesas prohibidas

En todo material del producto, comercial o académico, queda prohibido afirmar o insinuar que la plataforma:

- reduce la depresión, mejora la salud mental o previene trastornos;
- detecta, evalúa o predice el estado de salud mental de una persona;
- sustituye atención profesional;
- ayuda a cumplir una obligación legal de acompañamiento estudiantil (no existe tal obligación);
- garantiza o asegura la acreditación de una institución.

Queda prohibido además usar la prevalencia de depresión juvenil como gancho comercial, y presentar a un joven con depresión como caso de uso.

### Argumento de acreditación autorizado

El Criterio 2 (Procesos y resultados de enseñanza y aprendizaje), dentro de la Dimensión I (Docencia y resultados del proceso de formación), obligatoria, exige acciones de apoyo a la progresión estudiantil, indicadores de progresión definidos y evaluados periódicamente, y en su nivel más alto evidencia de la eficacia de esas estrategias.

> La acreditación institucional exige, en una dimensión obligatoria, acciones de apoyo a la progresión estudiantil, indicadores definidos y evaluados, y evidencia de eficacia. La plataforma produce ese tipo de evidencia.

Vocabulario obligatorio: decir **progresión**, no retención ni deserción, al argumentar acreditación ante una universidad. Es el término del estándar institucional universitario.

### Métricas de éxito

Postulaciones FUAS completadas por usuarios de la plataforma, beneficios efectivamente obtenidos, matrícula efectiva, renovación de beneficios y continuidad en segundo año.

Ningún indicador de salud mental es métrica de producto.

### Reglas de citación

1. Las cifras de Fundación por una Carrera (48%, 80.000, 120.000) no se publican mientras no exista informe de la fundación; si lo entrega, se citan con su alcance explícito (organización de la sociedad civil, muestra intencionada en establecimientos vulnerables) y junto a cifras oficiales del Mineduc. Actualización (2026-11-05): no existe informe público de la fundación detrás de esas cifras, así que **no se publican** (la regla 8 se endurece: la prensa solo sirve para llegar al origen, nunca como cita). El 120.000 se reemplaza por la cifra oficial del Centro de Estudios del Mineduc (143.191 de 258.418 egresados de 2020 sin matrícula en 2021). Ver [verificación de cifras](../verificacion-de-cifras.md).
2. Una sola fuente por serie, nombrada. No mezclar SIES con CNED en la misma serie de matrícula de primer año.
3. El dato de persistencia con y sin beneficios (88,2% contra 74,4%) se cita como diferencia observada, nunca como efecto causal.
4. No usar 23,4% de jóvenes fuera de estudio y trabajo (edición antigua, y colisiona con otro indicador del EAG 2026). La vigente es 19%.
5. No usar 18,7% como depresión de la ronda 10. El valor correcto es 13,7%.
6. Los tramos etarios del Termómetro cambian entre rondas: citar el tramo exacto. Actualización (2026-11-05): ni el 23% (ronda 12) ni el 28,9% (ronda 10) tienen informe público de la ronda detrás y no se usan. La cifra juvenil vigente es la de la Encuesta Nacional de Juventudes 2022 (INJUV): 26,9% de síntomas ansiosos o depresivos moderados o severos (PHQ-4).
7. Al hablar de acreditación, decir progresión, no retención ni deserción.
8. Un dato citado por prensa y atribuido a un organismo no queda verificado al enlazar cualquier documento de ese organismo. Hay que enlazar el documento que contiene el dato. Si no se tiene, se cita como declaración recogida por prensa, con fecha, y no se usa como dato duro.

### Dato bajo cuarentena

La afirmación "uno de cada cuatro jóvenes de O'Higgins con sintomatología depresiva moderada o severa, sexta región del país" no debe usarse como dato duro hasta verificarla contra el informe regional de la Décima Encuesta Nacional de Juventudes (2022). El informe regional disponible en el sitio del INJUV corresponde a la Octava Encuesta (datos de 2015) y contiene un indicador distinto.

Actualización (2026-11-05): el dato quedó verificado contra el original. En la 10.ª Encuesta Nacional de Juventudes 2022 (INJUV, p. 127), O'Higgins registra 24,8% de síntomas ansiosos o depresivos moderados o severos (escala PHQ-4), contra 26,9% nacional; no se cita como «depresión» ni como «sexta región» (el lugar en el ranking tampoco: las diferencias regionales no son significativas respecto del promedio nacional). El sustituto que este ADR proponía (gradiente de 22% contra 11% en la ronda 12) **no tiene origen verificable** y se retira. Ver [verificación de cifras](../verificacion-de-cifras.md).

## Justificación

**Eslabón A.** La evidencia de que informar aumenta el acceso es de Estados Unidos. En Chile, el ensayo aleatorizado de Hastings, Neilson y Zimmerman con el Mineduc muestra que informar sobre costos y retornos cambió *qué programa* se elige, hacia programas de mayor valor (efecto de 1,4% promedio y 3,0% en nivel socioeconómico bajo sobre ingresos esperados); no muestra que entraran más personas. No se debe citar como evidencia chilena de acceso. En HAIL (Universidad de Michigan), de los 15 puntos porcentuales de efecto sobre matrícula, 4 puntos son estudiantes que no habrían entrado a ninguna institución. El experimento FAFSA de H&R Block aumentó la permanencia en 8 puntos porcentuales.

**Eslabón B.** El 19% de los jóvenes de 18 a 24 años en Chile no estudia ni trabaja, contra 13% del promedio OCDE (*Education at a Glance 2026*, datos 2025).

**Eslabón C.** Metaanálisis de Paul y Moser sobre 237 estudios transversales y 87 longitudinales: tamaño de efecto d = 0,51; 34% de problemas psicológicos entre desempleados contra 16% entre empleados. Los diseños longitudinales y los experimentos naturales respaldan que el desempleo causa el malestar y que recuperar la inserción lo mejora. El efecto es más fuerte en países con distribución desigual del ingreso.

**Eslabón D.** Se afirma como prevención de incidencia, no como reducción de prevalencia. La objeción de la alta prevalencia intrauniversitaria no derriba la cadena, porque la comparación correcta no es *universitarios contra población general* sino *este mismo joven estudiando contra este mismo joven excluido*.

**Sobre el marco normativo.** La Ley 21.091 no impone a las instituciones obligación de acompañamiento: el Art. 8 letra c) encarga promover permanencia y titulación oportuna a la Subsecretaría, no a las instituciones. Por eso el producto no se vende como cumplimiento normativo —lo que lo volvería un costo obligatorio que se compra al precio más bajo— sino como ventaja competitiva en acreditación.

Las fuentes completas están en los documentos de respaldo.

## Consecuencias

### Positivas

- La cadena pasa a ser defendible eslabón por eslabón.
- Las métricas quedan bajo control de la plataforma.
- Coherencia con el ADR 0010: la agencia es puente, no tratante.
- La objeción de la prevalencia intrauniversitaria deja de ser un flanco y pasa a justificar el módulo de permanencia.
- El hallazgo de divergencia de series (acceso mejorando, salud mental deteriorándose) da un encuadre que no se desmonta con cifras de matrícula.

### Negativas y costos asumidos

- Se renuncia al titular emocionalmente más potente.
- El pitch exige más precisión y disciplina de citación.
- Obliga a revisar material ya producido con la formulación anterior.
- Un dato regional queda temporalmente fuera de uso.

### Riesgos

- **Deriva de mensaje**: el equipo o terceros pueden volver a la formulación simple. Mitigación: revisar este ADR antes de cada publicación.
- **Cifras que envejecen**: el Termómetro publica rondas nuevas y la OCDE ediciones anuales. Mitigación: verificar antes de cada presentación y registrar la fecha de verificación.

### Pendientes derivados

- [ ] Verificar el dato regional del INJUV contra el informe de la Décima ENJUV (2022).
- [ ] Completar los valores 2020-2023 del Termómetro desde los PDF identificados.
- [ ] Revisar material existente que use la formulación anterior.
- [ ] Incorporar la promesa autorizada al sitio y a la presentación.
- [ ] Respuesta de Mineduc a la solicitud de transparencia por la serie FUAS (presentada el 4 de noviembre de 2026, folio AJ025T0003786; vence el 2 de diciembre de 2026, prorrogable por 10 días hábiles).
