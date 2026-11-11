# Beneficios y plazos 2027

Estos archivos son la fuente versionada de C9. No se cargan todavía en la aplicación ni reemplazan los resultados personales que entrega el Ministerio de Educación.

- `beneficios_2027.json`: beneficios nacionales de arancel cuya página oficial estaba actualizada o permitía verificar sus condiciones el 5 de noviembre de 2026.
- `plazos_2027.json`: etapas del Formulario Único de Acreditación Socioeconómica (FUAS). Una fecha ausente se guarda como `null`, con un motivo; nunca significa cero ni una fecha estimada.

## Alcance

El catálogo resume gratuidad, becas de arancel y créditos administrados o informados por Beneficios Estudiantiles. No incluye la Beca de Alimentación para la Educación Superior, porque es un apoyo complementario administrado por Junaeb, ni beneficios excepcionales para instituciones en cierre. Las becas Juan Gómez Millas sí están vigentes en la guía 2027, pero sus páginas de detalle conservan fechas de acreditación de 2025: esas fechas no se copiaron y quedaron registradas en `advertencias_fuente`.

Los textos de `requisitos_oficiales` son resúmenes fieles, no citas textuales. Antes de mostrar un beneficio a una persona se debe conservar su nombre, fuente, URL, periodo y fecha de consulta. La asignación depende de la evaluación oficial; por eso el lenguaje simple usa “podrías”.

## Verificación manual

Cristóbal revisó manualmente el 6 de noviembre de 2026 los ocho montos máximos contra las páginas oficiales enlazadas en el catálogo:

| Beneficio | Monto máximo anual |
|---|---:|
| Beca Nuevo Milenio (BNM) | $860.000 |
| Beca Excelencia Académica (BEA) | $1.150.000 |
| Beca Excelencia Técnica (BET) | $900.000 |
| Beca Distinción a las Trayectorias Educativas (DTE) | $1.150.000 |
| Beca para Hijos de Profesionales de la Educación (BHP) | $500.000 |
| Beca de Articulación (BAR) | $750.000 |
| Beca Juan Gómez Millas (BJGM) | $1.150.000 |
| Beca Juan Gómez Millas para Estudiantes Extranjeros (BJGME) | $1.150.000 |

La revisión incluyó la BJGME, cuya página no se pudo consultar automáticamente durante la carga inicial.

## Actualización

1. Revisar el calendario y cada página oficial antes de cada proceso.
2. Cambiar el periodo y la fecha de consulta; no sobrescribir el archivo de un proceso anterior.
3. Agregar solo fechas exactas publicadas por Mineduc. Si una etapa no tiene fecha, mantener `null` y explicar el motivo.
4. Ejecutar `python3 -m unittest tests.datos.test_beneficios`.

Fuente principal: [Beneficios Estudiantiles, Mineduc](https://portal.beneficiosestudiantiles.cl/). Calendario del primer periodo (contrastado el 2026-11-11): [FUAS, Mineduc](https://postulacion.beneficiosestudiantiles.cl/fuas/). Un hito de un solo día se guarda con `inicio` y `termino` iguales.
