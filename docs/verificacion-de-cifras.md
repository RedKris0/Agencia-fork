# Verificación de cifras contra su origen

Fecha de la verificación: 2026-11-05 · Responsable: Claude, con confirmación pendiente del líder.

Regla del proyecto: **la prensa solo sirve para llegar al origen del dato; nunca es la fuente citada.** Un dato sin origen verificable no se publica ([AGENTS.md](../AGENTS.md), 2.1; regla 8 del [ADR 0012](decisiones/0012-cadena-causal-y-promesa.md)).

## Cómo se verificó

- **Codex** (tres ejecuciones con búsqueda web, solo lectura) rastreó los orígenes.
- **Claude** abrió los PDF originales que pudo descargar y leyó el texto y las posiciones del gráfico.
- **Antigravity** no devolvió resultados: necesitaba un permiso de comandos que el modo sin interfaz no puede pedir, y no se saltó.
- Dos documentos no pudieron ser abiertos por Claude (servidor con certificado que solo cubre un nombre de dominio, y bloqueo de la biblioteca de la UNESCO). Se marcan como «leído por Codex».

## Estado de cada cifra

### Verificadas contra el original

| Cifra | Original | Valor textual | Observaciones |
|---|---|---|---|
| Sintomatología ansiosa o depresiva moderada o severa, O'Higgins | Instituto Nacional de la Juventud (INJUV), [10.ª Encuesta Nacional de Juventudes 2022](https://www.injuv.gob.cl/sites/default/files/10ma_encuesta_nacional_de_juventudes_2022.pdf), sección 4.2.1.5, p. 127 | O'Higgins 24,8%; total nacional 26,9% | Mide ansiedad y depresión juntas (escala PHQ-4, últimas dos semanas). Por valor O'Higgins queda séptima y no sexta, pero el informe aclara que las diferencias regionales no son significativas respecto del promedio nacional: no citar el lugar en el ranking. Reemplaza el dato en cuarentena. |
| Depresión moderada o severa, ronda 10 del Termómetro | Achs–UC, [presentación de la ronda 10](https://encuestas.uc.cl/wp-content/uploads/2025/01/Presentacion-TSM-R10.pdf) | 13,7% en noviembre de 2024; n = 2.373 | El 18,7% corresponde a otra ronda (agosto de 2021, según la serie de la misma presentación). |
| Depresión y ansiedad, ronda 11 | Achs, [página oficial del Termómetro](https://www.achs.cl/termometro-salud-mental) y documento de resultados de la ronda 11 | Depresión 13%; ansiedad 25,8% (abril de 2025, más de 2.300 personas) | La ansiedad de la ronda 11 es 25,8%. |
| Retención de primer año, cohorte 2023 | Servicio de Información de Educación Superior (SIES), [informe de retención 2019-2023](https://bibliotecadigital.mineduc.cl/bitstream/handle/20.500.12365/22088/SIES_Retencion_2019-2023.pdf) | Retención 76,5%; persistencia en educación superior 83,6%; «16 no tuvieron matrícula en educación terciaria en 2024» | Es la cifra vigente que reemplaza al 27,9%. |
| Egresados de enseñanza media que no entran a la educación superior | Centro de Estudios del Mineduc, [Evidencias 55 (2022)](https://centroestudios.mineduc.cl/wp-content/uploads/sites/100/2022/11/EVIDENCIAS-55_2022_fd01.pdf), Tabla 10, p. 80 | Egresados 2020: 258.418; no matriculados en 2021: 143.191 (55,4%); matriculados: 115.227 (44,6%) | Claude abrió el PDF el 2026-11-10 y leyó la tabla. La tabla solo desagrega por sexo, no por dependencia. Mide ingreso inmediato, no «nunca». |
| Acceso a la educación superior según dependencia del establecimiento de origen | SIES, [Acceso a la Educación Superior en Chile 2022](https://www.mifuturo.cl/wp-content/uploads/2023/01/Acceso_a_Educacion_Superior_2022_SIES.pdf) (enero de 2023), Tabla 3, p. 8, y Tabla 12, p. 16 | Acceso inmediato, egreso 2021: municipal 37,8%; SLEP 36,3%; particular subvencionado 41,9%; administración delegada 40,1%; particular pagado 68,7%; total 42,5%. Acumulado al 5.º año, egreso 2017: 68,3%, 79,2%, 73,9% y 94,0%; total 76,4% (Tabla 9, p. 14) | Claude abrió el PDF el 2026-11-10. En la Tabla 3 la fila de SLEP trae cuatro valores, porque su primera cohorte es de 2018; el 36,3% de 2021 se confirma en el texto de la p. 7 y en la Tabla 12. Justifica el segmento del Punto 1 (Tabla 1.0). Falta buscar ediciones posteriores del informe. |

### Leídas por Codex con cita textual (falta que Claude las abra)

| Cifra | Original | Valor textual | Observaciones |
|---|---|---|---|
| Pérdida anual por abandono | Cátedra UNESCO de Inclusión en la Educación Universitaria (USACH), *Gratuidad responsable y universal en Chile*, noviembre de 2016, [PDF](https://www.paiep.usach.cl/sites/paiep/files/documentos/gratuidad_responsable_y_universal_camara_diputados_noviembre_2016.pdf), Tabla 6, p. 44 | «la pérdida originada por el abandono en la educación superior chilena bordea los 546 mil millones de pesos, equivalente a 780 millones de dólares cada año» | **No es $565.000 millones**: esa cifra no aparece en el informe. Dos ejecuciones independientes de Codex coinciden. |
| Costo del abandono universitario | Instituto Internacional de la UNESCO para la Educación Superior en América Latina y el Caribe (IESALC-UNESCO), *Estudio sobre la repitencia y deserción en la educación superior chilena*, [UNESDOC](https://unesdoc.unesco.org/ark:/48223/pf0000140087), L. E. González con D. Uribe y S. González (2005; una ficha posterior indica 2006) | US$ 96,2 millones; equivale al 26% del gasto público en educación universitaria y al 10,2% del gasto total | Reemplaza el «más del 20%». Discrepancia abierta: una ejecución indica datos de 1998-2002 con costos de 2002; otra, año 2004. La página del original no fue legible. |

| Barómetro Laboral y Previsional | CIES-UDD y Asociación de AFP con datos del INE, [agosto de 2026](https://negocios.udd.cl/cies/files/2026/09/v1_030926_barometro-previsional-agosto-2026.pdf) | 25-34 años que no estudian ni trabajan: 21,6% (+1,7 puntos); 41% busca empleo; ocupados de 18 a 34 años: −4,7%, unos 135 mil menos | Trimestre mayo-julio 2026. Reemplaza la cita desde prensa. |
| Seleccionados Admisión 2026 | Subsecretaría de Educación Superior, [Minuta de resultados de selección](https://educacionsuperior.mineduc.cl/wp-content/uploads/sites/49/2026/01/Minuta-General-Resultados-Seleccion-Admision-2026.pdf), Tablas 2 y 3 | «Promoción del año… 97.602» | Es la promoción del año, no «quienes egresaron el año anterior» en general. El «≈27.000 más que en 2022» no está en el documento: retirado. |

### Discrepancia abierta: jóvenes que no estudian ni trabajan (OCDE)

El anexo cita 19% (Chile, 18-24 años) contra 13% del promedio OCDE. Codex leyó la tabla de la OCDE (*Education at a Glance 2026*, capítulo sobre la transición de la educación al trabajo) y reporta: Chile 19%, **promedio OCDE 14%** (18-24) y 16% (25-29), con referencia de datos **2024**, no 2025. Claude no pudo abrir la página (error 403). Hasta confirmarlo, el «seis puntos sobre el promedio» queda en duda: puede ser cinco.

### Sin origen verificable: no publicar

| Cifra | Por qué no se publica |
|---|---|
| 48% «no sabe cómo postular» (Fundación por una Carrera) | No hay informe, cuestionario ni ficha metodológica publicados. La publicación de la propia fundación dice «poco o nada informado», es decir, autopercepción, no desconocimiento. |
| ~80.000 jóvenes no postulan cada año | No se puede reconstruir con datos oficiales: no existe un denominador de «jóvenes elegibles que no postularon». |
| US$ 2.660 millones anuales de costo de oportunidad (2008-2016) | Solo existe la nota de 2018 de la revista Economía y Negocios de la Facultad de Economía y Negocios de la Universidad de Chile; no se encontró el estudio ni su metodología. |
| 23% de síntomas depresivos en menores de 30 (ronda 12) | La ronda 12 no tiene informe público; la nota institucional de la UC solo da el total. |
| 22% contra 11% de depresión por quintil de ingreso (ronda 12) | Mismo caso. El ADR 0012 lo llama «sustituto verificado»: **no lo está**. |
| 27,9% de deserción del sistema (SIES) | No aparece en el informe SIES vigente. Ver la retención de arriba. |
| Más del 20% del gasto público | Proviene de una revisión que cita estudios de 2002 a 2011 sin nombrarlos. Usar el 26% del IESALC-UNESCO. |
| «Costo hundido» y prevenir con mejor orientación (Comisión Nacional de Productividad) | No se encontró ningún informe, estudio ni acta de la Comisión que contenga la frase; solo una atribución de prensa de 2018. |

### Ronda 12 del Termómetro

La única fuente publicada es la [nota institucional de la UC](https://visionuniversitaria.uc.cl/universidad-y-sociedad/salud-menta-chilenos-decae-peores-niveles-desde-pandemia/) (6 de octubre de 2026, n = 2.700): depresión 16,2% y ansiedad generalizada 17,9% («2,9 puntos porcentuales más que en 2025»). Esa variación no cuadra con el 25,8% de la ronda 11: la escala de ansiedad (GAD-7) se calcula, según Achs, solo para quienes reportaron problemas de sueño, y las bases pueden no ser comparables. No citar la variación hasta tener el informe de la ronda.

## Pendientes

- [ ] Abrir con herramienta propia el informe USACH (p. 44) y el estudio IESALC-UNESCO.
- [ ] Obtener el informe de la ronda 12 del Termómetro (Achs–UC) con sus tablas por edad e ingreso.
- [ ] Pedir a la Fundación por una Carrera su informe de línea base y la fuente de las cifras de 80.000 y 120.000.
- [ ] Pedir a la Facultad de Economía y Negocios el estudio detrás de los US$ 2.660 millones.
- [ ] Encontrar la repartición oficial de causas de deserción (SIES o Mineduc).
- [ ] Confirmar la cifra de la OCDE (14% contra 13%, referencia 2024 contra 2025).
- [ ] Archivar el PDF del informe SIES de matrícula 2026 antes de citar cifras de él.

### Cifras de esos documentos que esta verificación no auditó

Siguen en los documentos sin haberse rastreado hasta su origen; no deben circular como verificadas hasta hacerlo:

- Series del Termómetro de las rondas 8 a 11 de `series-y-proyeccion.md` (no se cotejaron una por una con las presentaciones). Las cifras de la ronda 12 (45,9%, 61%, 73,8% y 75,4%) se retiraron de los documentos por falta de informe público.
- Cifras regionales de O'Higgins (matrícula de primer año: −2,62%, de 9.853 a 9.595; programa PACE; habilitados PAES): provienen de una columna de opinión y notas locales. Los enlaces a prensa se retiraron de las listas de fuentes y las cifras quedan marcadas «origen pendiente»; falta el informe SIES, CNED, DEMRE o de la Subsecretaría.
- `cierre-de-pendientes.md` (líneas 167 y 169) sigue enlazando dos notas de prensa sobre la matrícula de O'Higgins; no se tocó porque es el registro histórico de ese pendiente.
- Otras citas desde prensa y blogs en las listas de fuentes (por ejemplo, las de `series-y-proyeccion.md` sobre oferta regional y PACE).
