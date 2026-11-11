# Catálogo de fuentes oficiales

Todo dato que muestra la plataforma sale de una fuente de esta tabla. Si una fuente no está aquí, primero se agrega (con PR) y después se usa.

**Estado de términos de uso:** "por verificar" significa que nadie del equipo ha leído aún los términos del sitio. No se automatiza ninguna descarga desde una fuente en ese estado.

| Fuente | Organismo | Qué aporta | Dirección | Formato preferido | Actualización | Términos de uso |
|---|---|---|---|---|---|---|
| INDICES Educación Superior | Consejo Nacional de Educación (CNED) | Oferta académica, instituciones, sedes, aranceles, vacantes y matrícula | https://cned.cl/indices_New_~/ | XLSX y metodología | Anual | Permite uso informativo, académico, educacional, de investigación o personal; prohíbe fines comerciales, exige citar la fuente y restringe modificar o distribuir contenidos fuera de contexto. **No usar hasta autorización escrita ([ADR 0009](decisiones/0009-fuente-de-oferta-academica.md)).** [Condiciones del CNED](https://cned.cl/politicas-de-privacidad/) (revisado 2026-11-03) |
| Mi Futuro | Subsecretaría de Educación Superior (SIES, Mineduc) | Empleabilidad 1.er y 2.º año, ingreso promedio 4.º año, retención 1.er año, duración real y titulados. Metodología oficial: https://mifuturo.cl/wp-content/uploads/2025/12/Metodologia-Buscador-Empleabilidad-e-Ingresos_2025-2026.pdf | https://www.mifuturo.cl/ | XLSX y metodologías | Anual (antes de admisión) | Exige citar `www.mifuturo.cl`, de Mineduc, y declarar las elaboraciones propias; no publica una licencia de reutilización. [Instrucciones de cita del SIES](https://www.mifuturo.cl/mi-futuro-buscadores/) (revisado 2026-11-03) |
| Datos Abiertos Mineduc | Ministerio de Educación | Matrícula en educación superior y valores de matrícula y arancel por carrera; no publica vacantes | https://datosabiertos.mineduc.cl/ | RAR y CSV | Anual | Sin términos ni licencia de reutilización publicados en el portal. [Portal revisado](https://datosabiertos.mineduc.cl/) (revisado 2026-11-03) |
| DEMRE | Universidad de Chile | Ponderaciones, vacantes, oferta, resultados de selección y fórmula de puntaje ranking | https://demre.cl/ | PDF y bases de datos abiertas | Por proceso de admisión | Permite acceso público sujeto a uso legal y ético; prohíbe intentar identificar postulantes, limita la interpretación de resultados y exige citar `Datos abiertos DEMRE [año]`. [Condiciones de datos abiertos](https://demre.cl/portales/condiciones-uso-informacion-datos-abiertos) (revisado 2026-11-03) |
| Admisión UACh | Universidad Austral de Chile | Respaldo de una ponderación cuando la tabla DEMRE omite el indicador «o» | https://www.uach.cl/admision/va1divia/pedagogia-en-educacion-fisica-deportes-y-recreacion | Página HTML oficial | Sin año ni fecha del proceso publicados | Sin licencia ni términos de reutilización publicados en la página consultada. Como sus porcentajes coinciden con DEMRE, se usa solo como respaldo del indicador omitido, nunca como fuente única (revisado 2026-11-05) |
| Admisión ULagos | Universidad de Los Lagos | Respaldo de una ponderación cuando la tabla DEMRE omite el indicador «o» | https://admision.ulagos.cl/Carreras/ingenieria-comercial/ | Página HTML oficial | Sin año ni fecha del proceso publicados | El sitio enlaza una política de privacidad, pero no publica una licencia de reutilización; su encabezado dice «Ulagos Template». Como sus porcentajes coinciden con DEMRE, se usa solo como respaldo del indicador omitido, nunca como fuente única (revisado 2026-11-05) |
| Acceso Mineduc | Subsecretaría de Educación Superior | Sistema de Acceso y calendario de admisión | https://acceso.mineduc.cl/ | Páginas y PDF oficiales | Por proceso | Publica condiciones generales de uso, privacidad y responsabilidad, pero no una licencia de reutilización de contenidos. [Términos de Acceso Mineduc](https://acceso.mineduc.cl/wp-content/uploads/2020/07/TERMINOS_Y_CONDICIONES_USO_WEB_ACCESO.pdf) (revisado 2026-11-03) |
| Beneficios Estudiantiles y FUAS | Ministerio de Educación | Gratuidad, becas, créditos, Formulario Único de Acreditación Socioeconómica (FUAS) y plazos | https://portal.beneficiosestudiantiles.cl/ y https://www.fuas.cl/ | Páginas oficiales | Por proceso | El pie del portal enlaza la licencia [Creative Commons Atribución 2.0 Chile](https://creativecommons.org/licenses/by/2.0/cl/), pero no explica expresamente qué contenidos cubre; se debe atribuir la fuente y consultar antes de reutilizar contenido cuyo alcance sea dudoso. [Portal revisado](https://portal.beneficiosestudiantiles.cl/) y [FUAS revisado](https://www.fuas.cl/) (revisados 2026-11-05) |
| CNA Chile | Comisión Nacional de Acreditación | Acreditación de instituciones y años | https://www.cnachile.cl/ | Buscador y bases | Continua | Sin términos ni licencia de reutilización publicados en el portal. [Portal revisado](https://www.cnachile.cl/) (revisado 2026-11-03) |
| Minsal | Ministerio de Salud | Línea de Prevención del Suicidio *4141 y Salud Responde 600 360 7777 | https://www.minsal.cl/linea-de-atencion-4141-no-estas-solo-no-estas-sola/ | Página oficial | Revisar cada semestre | Sin términos ni licencia general de reutilización publicados en el portal. [Portal revisado](https://www.minsal.cl/) (revisado 2026-11-03) |
| Valor de la UF | Servicio de Impuestos Internos (SII) | Valor diario de la Unidad de Fomento, solo para convertir a pesos los aranceles que Mineduc publica en UF | https://www.sii.cl/valores_y_fechas/uf/uf2026.htm | Página web | Diaria | Sin términos de reutilización revisados. Por eso el valor **no se descarga con un script**: se escribe a mano como parámetro de `datos/cargar_oferta.py`, con su fecha. Por verificar |

## Decisión

La oferta académica se obtendrá desde Datos Abiertos Mineduc. Los datos del CNED no se usarán en el portal, los paneles ni los datos de ejemplo mientras no exista una autorización escrita. La decisión y sus consecuencias están registradas en el [ADR 0009](decisiones/0009-fuente-de-oferta-academica.md).

## Reglas de uso

1. **Preferir archivos descargables** sobre leer páginas web. Si una fuente solo existe como página, se carga a mano con la URL y la fecha, hasta que se verifiquen sus términos.
2. **Cada fila cargada guarda** `fuente_id`, URL exacta del archivo y fecha de descarga.
3. **Mostrar siempre qué mide el indicador y su período**: “Empleabilidad al 1.er año · titulados 2023”. Nunca comparar indicadores de períodos o definiciones distintas sin advertirlo.
4. **Sin dato no es cero.** Cuando una fuente no publica un valor, se muestra “sin datos suficientes” y se explica por qué.
5. **Revisión de vigencia:** antes de cada proceso de admisión, el responsable de datos revisa cada fuente y actualiza la columna “Actualización”.

## Registro de verificaciones

| Fecha | Fuente | Qué se verificó | Quién |
|---|---|---|---|
| 2026-11-03 | INDICES Educación Superior (CNED) | Condiciones de uso, atribución y prohibición de fines comerciales | Cristóbal |
| 2026-11-03 | SIES / Mi Futuro | Instrucciones de atribución y ausencia de licencia explícita | Cristóbal |
| 2026-11-03 | Datos Abiertos Mineduc | Ausencia de términos o licencia explícitos en el portal | Cristóbal |
| 2026-11-05 | Datos Abiertos Mineduc | Diccionario de datos oficial (dentro del `.rar`): `dur_estudio_carr` es la duración formal en semestres sin proceso de titulación; `valor_arancel` es el arancel anual; `formato_valores` indica pesos o UF. Arancel y matrícula de las 10 carreras de ejemplo contrastados con el CSV | Claude, a pedido del líder |
| 2026-11-10 | Mi Futuro (SIES) | Base Matrícula Histórica 2007–2026 (zip con un CSV agregado por año, institución, sede y carrera; sin datos por estudiante). Fuente de los nombres de las celdas suprimidas del pronóstico y verificación de la validación de 11,9 %. La página de descarga pide inicio de sesión; el archivo se descargó directo, sin cuenta. Términos de uso del archivo: revisados legalmente el 2026-11-10 y confirmados por el líder | Claude, a pedido del líder |
| 2026-11-10 | Inventario de instituciones (plan de cupos frente a demanda, paso 1) | Oferta 2026 cargada (`datos/procesados/oferta.csv`): 116 instituciones. Pronóstico 2027 (`entrada_carrera_sede_2027.csv`): 126 instituciones. Las 116 de la oferta están en el pronóstico. Las 10 que solo están en el pronóstico no tienen matrícula 2026 en la Base Matrícula Histórica 2007–2026 (última matrícula registrada: 2022 a 2025). Sus celdas están todas suprimidas (sin cifra). Motivo verificado en el archivo; la causa (cierre, fusión u otra) no está verificada | Claude, a pedido del líder |
| 2026-11-05 | Mi Futuro (SIES) | Metodología oficial leída completa: períodos de cada indicador, excepción de Derecho, tramo de ingreso (bruto mensual, pesos de septiembre de 2025) y mínimos de casos. Los significados de `s/i` y `n/a` no están definidos | Claude, a pedido del líder |
| 2026-11-05 | Valor de la UF (SII) | UF del 5 de noviembre de 2026 = $41.274,20, leído dos veces en la página del SII | Claude, a pedido del líder |
| 2026-11-03 | DEMRE | Condiciones de las bases abiertas, prohibición de reidentificación y formato de cita | Cristóbal |
| 2026-11-05 | Admisión UACh | Codex localizó un respaldo para el código 17074: 15 % a Historia o Ciencias. La página no declara año; queda pendiente confirmación humana junto al PDF DEMRE | Codex (OpenAI), pendiente de revisión humana |
| 2026-11-05 | Admisión ULagos | Codex localizó un respaldo para el código 32012: 10 % a una electiva. La página no declara año y muestra «Ulagos Template»; queda pendiente confirmación humana junto al PDF DEMRE | Codex (OpenAI), pendiente de revisión humana |
| 2026-11-03 | Acceso Mineduc | Términos generales del sitio y ausencia de licencia de reutilización | Cristóbal |
| 2026-11-03 | Beneficios Estudiantiles | Enlace a Creative Commons Atribución 2.0 Chile y ausencia de alcance explícito | Cristóbal |
| 2026-11-05 | Beneficios Estudiantiles y FUAS | Beneficios de arancel del proceso 2027, requisitos, coberturas y primer plazo FUAS revisados directamente. Las fechas de acreditación desactualizadas de las páginas Juan Gómez Millas no se incorporaron | Codex (OpenAI), revisión de páginas oficiales |
| 2026-11-03 | CNA Chile | Ausencia de términos o licencia explícitos en el portal | Cristóbal |
| 2026-11-03 | Minsal | Ausencia de términos o licencia general explícitos en el portal | Cristóbal |
| 2026-11-02 | Minsal *4141 | Línea gratuita, 24/7, desde celulares | Claude (revisar) |
