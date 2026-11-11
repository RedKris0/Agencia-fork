# Bitácora

Memoria de trabajo entre sesiones. Lo más reciente, arriba.

## 2026-11-11 (calendario del FUAS, portada y PR abiertos)

**Hecho**: el calendario del FUAS se contrastó con https://postulacion.beneficiosestudiantiles.cl/fuas/ el 2026-11-11. `plazos_2027.json` ahora tiene la extensión (22 oct al 6 nov), nivel socioeconómico (17 dic 2026), preselección (15 ene 2027), asignación (10 mar 2027) y apelación (10 al 25 mar 2027); el segundo período sigue pendiente. `BeneficiosCalendario.tsx` muestra un hito de un solo día sin «X al X». La portada avisa que el primer período ya cerró (la fecha viene de los datos; si no hay término publicado no lo afirma) y pasó a `force-dynamic` porque depende de la fecha de hoy en Chile. Las ramas fusionadas se limpiaron (69 locales y 4 carpetas de trabajo).
**PR abiertos, todos con Auto-fix**: [#142](https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil/pull/142) calendario del FUAS · [#143](https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil/pull/143) este de documentos · [#144](https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil/pull/144) filas partidas de la oferta DEMRE y `pdfplumber` en `scripts/requirements.txt` · [#145](https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil/pull/145) revisión legal del 9 de noviembre · [#146](https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil/pull/146) aviso de cierre en la portada · [#147](https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil/pull/147) aceptación de ADR del 9 de noviembre · [#141](https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil/pull/141) entrada a los plazos del FUAS en la portada. **Dependencias**: el 146 depende del 142, el 141 del 146 y el 147 del 145; fusionar en ese orden. Los PR 133 a 138 se cerraron y se reabrieron con estos números: `rafajaque/Agencia-de-Enlaces-y-Seguimiento-Estudiantil` pasó a privado y GitHub lo desvinculó de AE-SE, así que los PR salen ahora de `rafajaque/Agencia-fork`. La rama `feat/tablero-pronostico` (única copia de la página de transparencia retirada) quedó respaldada en ambos repositorios.
**Pendiente**: la guía del FUAS por situación (quien ya postuló y quien no) sigue sin existir: la entrada de la portada lleva por ahora al calendario; el 144 pide contrastar las 9 filas con la página 157 del PDF, confirmar la licencia MIT de `pdfplumber` y saber por qué se omiten 7 pruebas; verificar en los originales el ensayo de CEP/LSE, Formando Chile 2026, PISA, Ley 21.801 y Acceso Mineduc; decidir si el repositorio queda público (ADR 0028 propuesto en el PR 139). Las ramas locales antiguas ya se limpiaron; queda la carpeta `Agencia-adr23`, del PR 93.
**Siguiente**: decidir si se reemplaza la frase «el Estado no muestra cuánto me falta» del documento general y si el requisito de PC dentro del liceo merece un ADR.

## 2026-11-11 (versión para liceos de la propuesta)

**Hecho**: `docs/propuesta-para-liceos.md`, a partir del texto que un experto externo revisó (`Downloads/propuesta-general-agencia-revisada.md`). Se le aplicaron los ajustes acordados: cifras y Ley 21.801 marcadas «por verificar», PC y teclado dentro del liceo pero 360 px en el portal abierto, jornada de ayuda con el FUAS repuesta en el piloto, rol del liceo en los accesos acotado, piloto en dos etapas, y nota de que no hay entidad jurídica para cobrar. Al final lleva «Notas internas» que se retiran antes de enviarlo. Va en el PR 143. No reemplaza a `propuesta-general-agencia.md`, que sigue siendo la base interna.
**Por qué**: el experto mejoró el texto como propuesta para liceos, pero dejó fuera la jornada FUAS, el vehículo legal y el rol de datos del liceo.

## 2026-11-11 (propuesta general de la agencia)

**Hecho**: `docs/propuesta-general-agencia.md`, el documento único con el problema, lo que se hará, cómo se hará, la innovación, el posicionamiento, el financiamiento y la venta, el marco legal, el cronograma, la medición, los riesgos, las decisiones y lo que no se sabe. Consolida las dos propuestas anteriores (`propuesta-ruta-de-ingreso-asistido.md` y `propuesta-estandar-de-transicion.md`), que quedan como anexos. Va en el PR 143.
**Por qué**: el líder pidió un solo MD que reuniera todo. La sección de venta se rehízo con lo aprendido después: la publicidad se descartó, el modelo base pasa a ser filantropía y empresas (el de Por Una Carrera: 76 % del ingreso en dos fuentes), el cobro a colegios es solo hipótesis, y los fondos exigen 1 a 2 años de personalidad jurídica, así que constituir la entidad corre contra el tiempo.
**Pendiente**: las decisiones del líder de la sección 13.2 (vehículo legal, frase pública, financiamiento institucional, autoevaluación del colegio, cambios al entregable); verificar lo de la sección 14 (Resolución 2076, PME, tres estudios, datos por colegio, estado de la ley y de la reforma de admisión).
**Siguiente**: cinco conversaciones con fundaciones, un sostenedor y una dirección de vinculación; empezar por la Fundación Luksic; y resolver el vehículo legal.

## 2026-11-11 (estándar de transición para colegios)

**Hecho**: `docs/propuesta-estandar-de-transicion.md`: seis componentes (T1 a T6) adaptados de los Gatsby Benchmarks del Reino Unido y alineados con el estándar chileno 7.3, más panel agregado, autoevaluación y seguimiento. Verificado en el original: guía estatutaria británica, informe CEC 2021 (asociación de 0,7 puntos, no causal), decretos y leyes chilenas, y estudios de H&R Block, Hastings, Carrell y Sacerdote, Bottom Line y Dinkelman y Martínez. Va en el PR 143.
**Por qué**: el líder quiso aterrizar el panel y el seguimiento con evidencia de grupos similares. Hallazgos que cambian lo dicho: los estándares británicos no son obligatorios y su efecto es una asociación pequeña; ningún estudio aísla el efecto de un panel; la ayuda con el trámite sí tiene respaldo; no hay ley que obligue a tener orientador en Chile; el EID 7.3 solo habla de visitas a *sitios web*. El +8 puntos de permanencia de H&R Block (ADR 0012) sí está respaldado por J-PAL.
**Aprendido de los agentes**: Codex y Antigravity coincidieron en cortar T3 y T6 y en que "medimos y publicamos resultados" sobrepromete. Pegar el contenido en el mensaje, sin pedirle leer archivos ni ejecutar comandos, resolvió el problema de Antigravity. Los subagentes con web abren pocos PDF completos: marcar siempre lo leído frente a lo de buscador.
**Pendiente**: decisión del líder sobre la frase pública; texto oficial de la Resolución 2076 y del PME; Castleman y Page, Owen y Westlund, Mulhern en el original; solicitud de transparencia por datos por colegio; revisión legal del protocolo T4.
**Siguiente**: definir el primer piloto con T1, T2 y T4 y los descriptores de los niveles.

## 2026-11-11 (propuesta integral "Ruta de Ingreso Asistido")

**Hecho**: `docs/propuesta-ruta-de-ingreso-asistido.md`, con 21 secciones: problema, objetivos, MVP del 2 de diciembre (cuatro tareas centrales, sin cuenta ni datos personales), capa 2 como intención con go/no-go, venta, posicionamiento, ley, decisiones D1 a D15, cronograma y revisión. Va en el PR 143. Este documento supera al ADR 0027 de la entrada siguiente (propuesta sin fusionar, a eliminar o enmendar). No se tocó el entregable ni ningún ADR.
**Por qué**: el líder pidió que la propuesta partiera del problema (desinformación de jóvenes de colegios vulnerables) y que el MVP fueran tareas medibles; las propuestas anteriores vendían solo información y no había comprador demostrado.
**Aprendido de los agentes**: Codex revisó el documento y encontró errores reales. Los dos más útiles: el simulador no calcula el Ranking (ADR 0024) y el PR 62 de la carga DEMRE figura cerrado sin fusionar. Antigravity falló dos veces al revisar el documento leyendo muchos archivos: la primera, bloqueado por permiso de comandos; la segunda, 500 s sin respuesta. Para él conviene un encargo corto con el texto pegado, no pedirle que recorra el repo. Una de las críticas de Codex (vigencia legal "imposible") fue solo una redacción mía ambigua.
**Pendiente**: decisiones del líder (vehículo legal, capa 2, cambios al entregable, contenido PAES fuera, umbral del piloto). Verificar la carga DEMRE en producción, los puntajes de corte, la ley en fuente oficial y las cifras de H&R Block. Alguien con acceso debe filtrar el buscador oficial de Mercado Público.
**Siguiente**: revisar el PR 132 (simulador), que toca la capa de datos de la oferta y desbloquea el resto.

## 2026-11-11 (enfoque de transición y uso de agentes)

**Hecho**: `docs/decisiones/0027-enfoque-de-transicion-y-plan-colegio.md`, estado propuesta, sin tocar AGENTS.md ni el ADR 0010. Propone acompañar de 3° medio a la renovación de beneficios del primer año, y vender un Plan Colegio donde el estudiante no paga y el colegio recibe solo agregados. Se descartó el pre universitario pagado por apoderados (rompe "gratis siempre") y se descartó solo media (pierde la renovación, lo mejor respaldado).
**Por qué**: el repo ya tenía fuera lo psicosocial pesado; la confusión era de relato. La evidencia citada favorece postulación y renovación. Claude, Codex y Antigravity recomendaron lo mismo para el pagador.
**Aprendido de los agentes**:
- Antigravity: `--print-timeout` exige unidad (`300s`); con `300` falla al instante y sin respuesta. Tardó unos 110 s. Devuelve JSON con el texto en `response`. Fue el único en detectar el registro ATE para fondos SEP, pero afirma cosas legales sin fuente (autonomía progresiva, Ley 21.719): verificarlas siempre.
- Codex (`codex exec`): no editó nada y marcó él mismo qué era suposición. Lo más útil fue operativo: piloto manual midiendo horas del equipo y carta de intención.
- Mi encargo incluía mi inclinación (transición) y las restricciones, así que la coincidencia entre los tres es débil como confirmación. Para una segunda opinión de verdad, no adelantar la conclusión.
- Método que funcionó: prompt en un archivo del scratchpad, agente lanzado desde la raíz del repo con rutas relativas (así no viajan rutas con el nombre de usuario), los dos en paralelo y en segundo plano. Una sola muestra: no sirve para decidir quién es mejor en general.
**Investigación posterior**: tres subagentes propios (productos, licitaciones, fuentes) y uno más que leyó la Ley 21.719. Para investigación web conviene usar subagentes propios: Antigravity sin interfaz no puede navegar y Codex no tiene opción de búsqueda. Resultado: licitaciones con alcance bajo (el buscador oficial no se pudo usar; solo preuniversitarios PAES municipales, uno por $12.999.990); posible hueco en la renovación de beneficios; evidencia a favor de ayudar con el trámite y en contra de los mensajes a escala; sin causas de deserción con fuente oficial. La matriz ley a producto quedó en el ADR 0027, con artículos de un consolidado NO oficial. Corregido en el ADR 0027: la cifra "+8 puntos de permanencia" del experimento FAFSA parece ser de matrícula; el ADR 0012 todavía la escribe así.
**Pendiente**: decisiones del líder (desde qué curso se crea la Ficha; contenido académico fuera). Cotejar la ley con la BCN y asesoría legal. Verificar mifuturo.cl, Acceso Mineduc y PACE, el registro ATE y el PDF de H&R Block. Fijar umbrales de las fases 0 y 1. Alguien con acceso debe filtrar el buscador oficial de Mercado Público por orientación y permanencia.
**Siguiente**: elegir con qué colegios se hacen las cinco entrevistas con el mockup en PDF del panel agregado.

## 2026-11-10 (encargo de pulido para Cristóbal y estación del proceso)

**Hecho**: `docs/equipo/guia-cristobal.md` tiene una sección nueva, "Encargo del líder (10 de noviembre)". Le pide llevar al máximo nivel de calidad los datos y los textos de las cinco páginas publicadas (portada, explorador, fichas, comparador y beneficios), con pasos, criterios de aceptación y un texto para su IA.
**Por qué**: el líder pidió "tunear la página al máximo". Se acotó a lo que le toca a Cristóbal (datos y contenido). Lo visual se deriva a Alejandro, según el reparto.
También se agregó la tarea C14 (etapas del proceso de admisión): Cristóbal carga el calendario oficial de la Admisión 2027 en `datos/calendario/admision_2027.json`, con la forma de `plazos_2027.json` y un campo `estacion` (explorar, postular, llegar o avanzar) en ambos archivos. Se usan las mismas cuatro estaciones de `IndicadorEstacion.tsx` para no tener dos clasificaciones. Las animaciones de estación decorativas se descartaron porque `docs/diseno.md`, sección 7, prohíbe el movimiento decorativo. A cambio, se mostrará la estación del proceso. En la guía de Alejandro se agregó la A15: en la portada, la estación actual del proceso y el próximo plazo, con una función pura y probada en `lib/calendario/`. El movimiento se limita al avance de la línea. Depende de la C14.
**Pendiente**: rama `docs/estacion-del-proceso`, con PR abierto. El encargo de pulido y la C14 no tienen fecha límite: la fija el líder.

## 2026-11-10 (fusiones y prueba de accesibilidad en la CI)

**Hecho**: fusionados con squash, en este orden, #114 (ADR 0024), #111 (segmento), #112 (instrumento único) y #113 (guía del líder). Los conflictos se resolvieron así: en la Tabla 1.1, los actores 3 y 5 del #111 y el 4 del #112; en la Tabla 2.4, la fila del #112; en la bitácora, todas las entradas. Rama `fix/ci-accesibilidad-sin-supabase`: `lib/datos/oferta-remota.ts` gana un modo local (`OFERTA_LOCAL=1`) que lee la muestra en vez de Supabase, y el flujo de la CI lo activa solo en la tarea de accesibilidad. Las 25 pruebas pasan en local (Edge, puerto 3217).
**Por qué**: desde el #103 las fichas, el explorador y el comparador consultan Supabase en vivo, y la CI no tiene `SUPABASE_URL` ni `SUPABASE_ANON_KEY`. Las páginas respondían con error y la prueba de accesibilidad fallaba en todos los PR. No se agregaron secretos: los PR que llegan desde las copias del repositorio (Alejandro y Cristóbal) no los reciben, y la prueba no debe depender de la red.
**Pendiente**: confirmar que el siguiente despliegue en Cloudflare compila bien con la importación dinámica de `carreras.ts` (usa `node:fs`; el Worker tiene `nodejs_compat`). En local no se pudo correr `cf:build`, porque su paso previo exige las claves de Supabase. En modo local, la búsqueda también compara institución y sede, y ordena alfabéticamente; la remota solo busca por nombre de carrera y ordena por código. No afecta la prueba.

## 2026-11-10 (guía del líder)

**Hecho** (rama `docs/guia-rafael`): `docs/equipo/guia-rafael.md`, con el mismo formato que las guías de Alejandro y Cristóbal. Incluye el estado al 10 de noviembre por área con sus PR, lo urgente, el rol, las decisiones que solo toma el líder, los riesgos abiertos, las tareas R1 a R20 por semana (lo adelantado marcado como tal), cómo se revisa un PR y los errores ya ocurridos. Se enlaza desde `docs/plan.md`, `docs/equipo/README.md` y el reparto.
**Por qué**: el líder pidió que su avance se vea igual que el del equipo. Los conteos salen de GitHub: 101 PR fusionados, 82 desde la cuenta del líder (con apoyo de IA, declarado), 9 de Alejandro y 10 de Cristóbal.
**Hallazgo y arreglo**: había dos ADR con el número 0018, y el PR 93 proponía un 0023 que ya existía (`0023-medida-comparativa.md`). El Puntaje Ranking pasa a 0024 (PR 114): se movió ese y no el de planificación porque solo lo citaban dos comentarios de código, y el otro unos 15 documentos. El ADR del PR 93 pasa a 0025, con un commit en su rama; la copia `Agencia-adr23`, que estaba limpia, queda un commit atrás y se pone al día con `git pull`. El borrador del correo a los autores de la EAEC está en `docs/encuestas/solicitud-permiso-eaec.md` (PR 112) y declara el posible uso comercial del proyecto para que el permiso sea válido.
**Pendiente**: confirmar en el sitio publicado que la ficha real funciona a 360 px y con teclado; verificar las variables de Gemini en Cloudflare. Esta entrada choca con las de los PR 111 y 112 al inicio de la bitácora: conservar las tres.
**Siguiente**: el líder revisa los PR 111, 112 y este en la ventana del martes.

## 2026-11-10 (entregable: un solo instrumento estandarizado)

**Hecho** (rama `docs/instrumento-unico`): la encuesta escolar pasa a ser un solo instrumento estandarizado, completo: la Escala de Autoeficacia para la Elección de Carrera (EAEC) de Ramírez Dorantes y Canto (2007). Son 55 ítems de 0 a 9, con α = 0,95 en 343 estudiantes de bachillerato de México, más tres preguntas de clasificación. Se retiró la encuesta de adultos y se quitaron los ítems de FUAS, gratuidad, becas y CAE. Se reescribieron `docs/encuestas/` (encuesta, ficha, README y `crear_encuestas.gs`) y se ajustaron la carta y el consentimiento. En el entregable cambiaron 2.3.1, 2.3.2, la Tabla 2.5, el árbol de problemas, el FODA, la Tabla 2.C.2, el Anexo 2.A y las referencias.
**Por qué**: la revisión del capítulo 2 pidió un solo instrumento estandarizado en español, no un conjunto de ítems de varias fuentes. El líder decidió aplicarlo solo a escolares y quitar FUAS, porque no existe una escala validada de conocimiento de beneficios. Se eligió la EAEC porque sus ítems están publicados textualmente (Anexo 1 del artículo, leído con pypdf el 2026-11-10) y su subescala de Información ocupacional corresponde a la causa 1 del árbol. Se descartaron la versión corta del CDMSE (sin ítems), la EPEV (CC BY-NC-SA, sin uso comercial) y la E-DTDC (ítems no publicados).
**Pendiente**: permiso de los autores (el artículo no declara licencia); confirmar con ellos qué ítems forman cada subescala (se dedujo de la Tabla 1); juicio de expertos sobre la adaptación de vocabulario; medir el tiempo real en el piloto (hoy se estima entre 10 y 15 minutos); recrear el formulario en Google Forms con el script nuevo.
**Ojo al fusionar**: esta rama y `docs/capitulo-1-segmento` (PR 111) tocan la misma fila de la Tabla 2.4 y el inicio de esta bitácora. En la Tabla 2.4 gana la versión de esta rama, que ya incluye el segmento.
**Siguiente**: `docs/equipo/guia-rafael.md`.

## 2026-11-10 (entregable: segmento por edad y sector social)

**Hecho** (rama `docs/capitulo-1-segmento`, sin PR): el capítulo 1 del entregable define el segmento objetivo. Es para personas de 16 a 24 años de establecimientos municipales, SLEP, particulares subvencionados y de administración delegada: 3.º y 4.º medio, egresados de hasta cinco años y primer año de educación superior. Los particulares pagados quedan fuera del objetivo, pero el portal sigue abierto a todos. Nueva Tabla 1.0 con el acceso por dependencia. Se ajustaron Tabla 1.1, 1.2, 1.4, 2.1, Tabla 2.1, Tabla 2.4, OG del 3.2, 5.1, 6.2 y 8.1. Se registraron las cifras en `docs/verificacion-de-cifras.md`.
**Por qué**: la revisión del profesor pidió acotar el objetivo, porque las justificaciones solo sostienen el caso de colegios vulnerables. El líder eligió acotar en vez de justificar colegios de altos recursos. Fuente: SIES, *Acceso a la Educación Superior en Chile 2022* (enero de 2023), Tablas 3 y 12. El acceso inmediato es de 37,8 % en municipales y 68,7 % en particulares pagados. Claude también abrió *Evidencias 55*: su Tabla 10 coincide y solo desagrega por sexo.
**Fracaso a evitar**: WebFetch devuelve los PDF como binario. Hay que leerlos con pypdf sobre el archivo que guarda la herramienta. La API de medios de mifuturo.cl quedó bloqueada por el modo automático.
**Pendiente**: el rango de 16 a 24 años es decisión del equipo, no un dato. Hay que buscar ediciones del informe SIES posteriores a 2022, elegir un índice de vulnerabilidad para escoger liceos (`[CONFIRMAR]`) y definir el territorio (O'Higgins sigue en `[CONFIRMAR]`).
**Siguiente**: capítulo 2 con un solo instrumento estandarizado en español (decidir la población y qué pasa con los ítems de conocimiento de FUAS). Después, `docs/equipo/guia-rafael.md`.

## 2026-11-09 (tarde y noche: PR fusionados, retiro de /transparencia y verificación DEMRE)

**Hecho (fusionado)**:
- #88 (reserva de CPU del ADR 0003): fusionado con squash. La reserva 2 queda abierta: mediana de CPU de 29,47 ms frente al límite de 10 ms del plan gratuito, 0 errores en 7 días, 55 eventos correctos en la última hora. Falta confirmar el límite vigente en la documentación de Cloudflare.
- #89 (retira `/transparencia`): fusionado a las 21:22 UTC. `/transparencia` responde 404 tras el despliegue. El PR 78 lo fusionó el líder a las 15:26 UTC (12:26 hora de Chile); no fue una sesión de Claude.
- #90 (renombra la migración de la nota de cierre a `20261109110000`): fusionado a las 21:38 UTC. Ya no hay dos migraciones con el prefijo `20261109100000`.
- #79 (resumen interno del pronóstico): fusionado.

**Hecho (cerrado y revisado)**:
- #75 (estado del plan al 9 de noviembre): cerrado. Su sección de estado en `docs/plan.md` quedó desactualizada frente a `main`.
- #83 (hoja de una página para la revisión profesional): sin conflictos, CI en verde. El líder lo aprobó; GitHub no deja aprobar el propio PR. Falta decidir cuándo se envía a la profesional.

**Verificación manual de la carga DEMRE (PR 62)**: el líder informó que verificó cinco filas de `datos/verificacion/demre_muestra.csv` contra el PDF oficial: código 46505 (página 234), 44007 (441), 16047 (385), 11082 (269) y 12070 (19). El detalle por fila no quedó registrado en el repositorio. Antes, la fila 12070 figuraba como verificada por el propio autor de la carga, y eso no cuenta como revisión independiente.

**Corrección**: las entradas anteriores de esta bitácora decían que el PR 78 seguía en borrador y que la migración de la nota de cierre estaba pendiente de renombrar. Ambas quedaron superadas por los hechos de arriba.

**Supabase**: el proyecto no usa el registro de migraciones del CLI (la tabla `supabase_migrations.schema_migrations` no existe). Las migraciones se aplican a mano en el editor SQL, así que no hace falta `supabase migration repair`.

**Pendiente**:
- PR 67 (Ale): actualizar su rama con `main` y tomar la versión de `main` en `docs/errores-pr-57.md`.
- PR 62 (Cristóbal): resolver el conflicto de esta bitácora manteniendo las dos partes; revisión independiente de las filas de la muestra restantes; decisión del líder sobre 17074 y 32012.
- Profesional: P1, P4, P6 y P7, y el texto de contención (P2). Sin esto no avanza la app de crisis.
- Legal: ADR 0022, retención de alertas y revisión antes de usar cifras con una institución.
- Despliegue: variables `GEMINI_API_KEY`, `GEMINI_MODELO`, `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en el panel de Cloudflare.
- Rama `docs/estado-9-nov` creada por error en `origin` (AE-SE): borrar si el líder lo confirma.

## 2026-11-09 (noche: rendimiento de las políticas, aplicado en producción)

**Hecho**: #86 fusionado y `20261109200000_rendimiento_politicas_e_indices.sql` aplicada en Supabase por orden del líder. Verificado: 15 políticas, ninguna con `auth.uid()` sin envolver; la prueba de RLS contra producción (revertida) da lo mismo que antes; asesor de rendimiento en 0 errores y 0 avisos.
**Pendiente**: quedan 36 sugerencias del asesor, sin urgencia: índices sin uso (la base está vacía) y claves foráneas sin índice en `seguimiento`, `solicitud_derecho`, `requisito_admision`, `tramo_ingreso_sies` y `vacante_admision`; revisarlas con datos reales. Siguiente paso real: cargar los datos oficiales en producción. Antes de datos personales hay que resolver los respaldos (el plan gratuito no los tiene).

## 2026-11-09 (noche: rendimiento de las políticas RLS antes de cargar datos)

**Hecho (rama `feat/rendimiento-politicas-rls`)**: migración `20261109200000_rendimiento_politicas_e_indices.sql`. Envuelve `auth.uid()` en `(select auth.uid())` en las 9 políticas avisadas, une las lecturas duplicadas de `persona`, `ficha_trayectoria` y `consentimiento` (el "o" de dos políticas permisivas equivale a una con "o") y crea 17 índices de claves foráneas. No cambia quién puede leer o escribir.
**Pendiente**: que pase el job de RLS del CI, fusionar y aplicar a mano en Supabase; luego revisar el asesor de rendimiento (deben quedar 0 avisos de políticas) y probar la RLS en producción otra vez con el mismo bloque que se revierte.

## 2026-11-09 (noche: revisión de Supabase en producción)

**Hecho**: revisión de solo lectura desde el panel (detalle en `supabase/README.md`). Asesor de seguridad: 0 errores. Prueba de RLS contra producción, revertida: `anon` y una sesión sin pertenencia no leen alertas, derivaciones, seguimientos ni autorización de tutor, y no pueden escribir en ellas. Toda la base está vacía.
**Pendiente**: antes de cargar datos reales, cambiar `auth.uid()` por `(select auth.uid())` en las políticas (9 avisos), unificar las políticas permisivas múltiples de `persona`, `ficha_trayectoria` y `consentimiento`, e indexar las claves foráneas que se consulten. Cargar en producción los datos oficiales (`programa`, `institucion`, etc.) es un paso aparte.

## 2026-11-09 (noche: migración del tutor aplicada en Supabase)

**Hecho**: el líder inició sesión en el panel y se aplicó `20261109100000_autorizacion_tutor_no_autodeclarada.sql` en producción (editor SQL). Verificado: política única `tutor_ver_propio` (SELECT) y `authenticated` solo con SELECT. La tabla tenía 0 filas, no había nada que revisar. El hueco del menor que se autorizaba solo queda cerrado en la base real.
**Hecho (después)**: se aplicaron en orden las cuatro migraciones que faltaban (`20261108100000`, `20261108110000`, `20261109000000`, `20261109100000_nota_de_cierre_estructurada`). Antes de cada una se comprobó que el SQL cargado en el editor tenía el mismo hash que el archivo de `main`. Verificado: 25 tablas, 0 sin RLS, sin permisos de tabla ni EXECUTE para `anon` en lo nuevo, y `cerrar_derivacion` con una sola firma. Ya existe el destino de las alertas del endpoint del asistente (#74).
**Pendiente**: renumerar una de las dos `20261109100000` antes de usar `supabase db push`; configurar las variables de entorno del despliegue (GEMINI_API_KEY, GEMINI_MODELO, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY); probar el flujo de alertas con un usuario del equipo real.

## 2026-11-09 (flujo de tutor para menores: hallazgo de seguridad y ADR 0022)

**Hallazgo (Alto)**: `autorizacion_tutor` dejaba que la propia persona insertara su fila (política `tutor_propio` y permisos de `20261104010000`), así que un menor podía autorizarse solo y saltarse `consentimiento_otorgar`. La prueba 5 de RLS lo hacía como el menor. No se verificó si hay filas en Supabase.
**Hecho (rama `feat/diseno-flujo-tutor`, PR en borrador)**: migración `20261109100000_autorizacion_tutor_no_autodeclarada.sql` (la persona solo ve su autorización; la escribe el rol de servicio) y prueba 5 reescrita (el menor no inserta, modifica ni borra; el servidor sí). ADR 0022 (propuesta): quién necesita autorización según la ley y cómo se prueba, con flujo, modelo de datos esbozado y preguntas para asesoría legal.
**Ley verificada** en el texto del Diario Oficial núm. 44.023 (13-dic-2024, CVE 2583630), artículo 16 quáter: menores de 14, consentimiento de padres; de 14 a 17, como adultos salvo datos sensibles de menores de 16. La regla del proyecto (todo menor de 18) es más estricta que la ley; el ADR propone A3 (ley, más capa 3 para todo menor de 18) y deja la decisión al líder.
**No verificado**: la migración y la prueba no se corrieron aquí (no hay PostgreSQL en esta máquina); las corre la CI (trabajo de reglas de privacidad). No se implementó el flujo: el ADR 0015 pide revisión legal antes.
**Pendiente**: revisión legal (5 preguntas en el ADR 0022); decisión del líder entre A1 y A3; proveedor de correo; después, solicitudes pendientes, enlace de un solo uso, vigencia y revocación con sus pruebas, y actualizar `docs/privacidad.md` y AGENTS.md 2.2.

## 2026-11-09 (mezcla de ingreso 2026 verificada en el informe del SIES, #78)

**Hecho**: se leyó el «Informe de Matrícula en Educación Superior en Chile 2026» (SIES, julio de 2026; https://www.mifuturo.cl/wp-content/uploads/2026/07/Informe-de-Matr%C3%ADcula-2026.pdf). Su tabla 7 trae el primer año de pregrado 2026: universidades 161.292 (43,5 %), IP 166.139 (44,8 %), CFT 43.636 (11,8 %), total 371.067. Con esos conteos exactos y las tasas de retención por tipo, 382.725 × 77,497 % da 296.601, la permanencia registrada: el cálculo se reproduce sin redondeos. La base de matrícula histórica está en https://www.mifuturo.cl/bases-de-datos-de-matriculados/ (`Matricula_2007_2026_WEB_10_07_2026.zip`).
**Corregido**: la página decía que el 77,5 % era menor que el 77,9 % del SIES «porque la mezcla de 2026 tiene más IP y CFT»; no se comprobó y el efecto de la mezcla (56,5 % frente a 56,0 %) explica solo una fracción de los 0,4 puntos. Ahora dice que la diferencia no se ha desglosado. Se quitó la nota de «la mezcla suma 100,1 %» del tablero (ya no hace falta: se usan los conteos).
**Límite nuevo, publicado**: unas 26 mil matrículas de primer año pasaron de un CFT a un IP de la misma institución en 2026 (lo dice el informe); la retención por tipo es de la cohorte 2025 y no lo refleja. Va en el texto de la página y en la lista de límites.
**Verificado después (los 0,4 puntos)**: la nota 1 del informe de retención dice que el SIES excluyó del cálculo de la cohorte 2025 la matrícula de primer año del CFT que cerró (sin matrícula en 2026). Comprobación con los conteos de la tabla 7 del informe de matrícula y las tasas de la tabla 2: ponderando con la mezcla 2025 completa (159.167 / 133.532 / 68.900) da 77,37 %; para llegar al 77,9 % del SIES hay que sacar unos 23.700 estudiantes de primer año del CFT (con 26.000 da 77,95 %), cifra coherente con «alrededor de 26 mil» del informe de matrícula. Nuestro 77,5 % usa la mezcla 2026, que ya incluye esos estudiantes como IP. Si tuvieran la retención de los CFT y no la de los IP, la retención ponderada bajaría 0,18 puntos (unas 700 personas), dentro del rango publicado. Es una estimación propia, no una cifra del SIES. La página lo explica con esos términos.
**Pendiente**: ninguno de fuente.

## 2026-11-09 (fuente de la retención verificada, #78)

**Hecho**: se encontró y leyó el informe oficial del SIES «Informe de Retención de 1er Año de Pregrado, cohortes 2021-2025» (agosto de 2026), en https://www.mifuturo.cl/informes-retencion-de-primer-ano/ (PDF: `.../wp-content/uploads/2026/08/Informe-de-Retención-de-1er-Año-de-Pregrado-2026.pdf`). Verificado en el texto: cohorte 2025 con universidades 84,7 %, IP 72,5 %, CFT 69,9 %, total 77,9 % y jornada diurna 82,9 % frente a vespertina 70,2 %. Se retiró el `TODO(fuente)` y la página enlaza al informe.
**Corregido**: la definición del SIES es seguir matriculado en la misma institución como estudiante de la misma cohorte (no dice «misma carrera»); se cambió el texto de la página y del tablero. La página explica que el total de la cohorte (77,9 %) es mayor que nuestro 77,5 % porque aplicamos la mezcla de ingreso de 2026.
**Sigue sin fuente directa**: la mezcla de ingreso 2026 (43,5 / 44,8 / 11,8 %) sale de la base de matrícula 2007-2026 del SIES, calculada aquí; el enlace es la página de informes de matrícula. Falta citar la URL exacta de ese archivo (`datos/registro_descargas.md`).
**Nota técnica**: el PDF se leyó con `pypdf` (no hay `pdftoppm` en esta máquina).

## 2026-11-09 (página pública de transparencia del pronóstico)

**Hecho (sin commit, rama `feat/tablero-pronostico`)**: ruta `/transparencia` en el portal (`app/(portal)/transparencia/`): las dos estimaciones nacionales con su rango, cómo se calculan, qué no se hace, cuánto nos hemos equivocado (error nacional, validación por carrera y sede, error corregido de la PAES, rango descartado), calendario de comparación, límites y fuentes. Gráficos en HTML y CSS (texto normal, sin SVG con etiquetas), cada uno con su tabla. Estática (se prerenderiza). Texto en lenguaje claro, siglas explicadas.
**Datos**: `datos/pronosticos/exportar_transparencia.py` genera `datos/transparencia/pronostico_2027.json` (versionado) con lista blanca de campos: sin instituciones, sedes, carreras, comunas ni sexo. Pruebas: `tests/datos/test_exportar_transparencia.py` (6) y `tests/transparencia/transparencia.test.ts` (9), incluida la que impide llaves prohibidas en el archivo publicado.
**Cambios fuera de la página**: `Encabezado` acepta `estacionActual` opcional (esta página no es parte de la trayectoria); fuentes con siglas explicadas en `cifras_nacionales.json`; limpieza de avisos de lint en `tablero.js`. Se corrió `npm ci` porque faltaba `lucide-react` en `node_modules`.
**Verificado**: `tsc`, `eslint`, `npm test` (165), `pytest tests/datos`, `npm run build` y `tokens.py --check` pasan. En navegador: sin desborde a 360 px, un solo `h1`, anclas sin romper, regiones y gráficos con nombre accesible, sin `tabindex` positivo.
**Revisión propia con `revisar-pr` (2026-11-09)**: veredicto **requiere cambios antes de fusionar**, por tres puntos que no puedo cerrar yo:
- *Alto, datos oficiales*: la retención por tipo (84,7 / 72,5 / 69,9 %, cohorte 2025) no se pudo confirmar en una fuente oficial con URL (búsqueda en mifuturo.cl: el último informe encontrado llega a la cohorte 2024, total 77,3 %). La página enlaza solo al sitio general y lleva un `TODO(fuente)` en `page.tsx`. Hay que poner la URL del informe o retirar la tabla (AGENTS.md 2.1: lo que no se puede verificar no se publica).
- *Medio, calidad*: el PR pasa de 3.700 líneas (límite orientativo: 400). Proponer dos PR apilados: primero el tablero (`datos/pronosticos/dashboard/` y su prueba), después la página (`app/(portal)/transparencia/`, `datos/transparencia/` y sus pruebas). La segunda depende de la primera porque el exportador reusa `generar_datos.py`.
- *Medio*: falta la plantilla del PR con la sección de IA utilizada (Claude Sonnet 5.5 y Haiku 5.5).
Corregido en esta pasada: definición de retención del SIES (misma carrera e institución, no «sigue en el sistema»), fecha de consulta en cada insumo, enlaces en las fuentes de validación, «cohorte» y «rendidor» reescritos en lenguaje claro.
**Verificado después**: recorrido con teclado (Tab recorre 40 controles en orden lógico, todos con foco visible salvo el botón de desarrollo de Next.js), tema claro con captura. **Sigue sin verificar**: lector de pantalla; revisión de textos y de lo visual por el líder (AGENTS.md, sección 4).
**Decisiones que son del líder**: (1) publicar o no: fusionar el PR publica cifras que hoy solo están en el repositorio; (2) la página se compromete a publicar la comparación y a versionar correcciones; (3) no hay llamado comercial a instituciones porque el ADR 0018 exige revisión legal antes de cualquier oferta; (4) la página no está enlazada desde la portada ni el menú.

## 2026-11-09 (decisiones del líder: #74 fusionado, ADR 0015/0019/0020 aceptados)

**Hecho**: #74 (endpoint del asistente y registro de alertas) se marcó como listo y se fusionó a `main` con squash (commit `383b603`). Estaba en borrador y con el CI en verde. Los ADR 0015, 0019 y 0020 pasan de «propuesta» a «aceptada» (edición de la línea de estado; sin commit, en `feat/tablero-pronostico`).
**Pendiente del líder**: (1) la aprobación de #74 con otra cuenta de revisor no se hizo: GitHub no la exige para fusionar, pero el plan la pedía; (2) confirmar en Supabase las migraciones `20261108100000_alertas_y_derivacion.sql` y `20261108110000_derechos_del_titular.sql`; (3) definir los `TODO(profesional)` del ADR 0019 y los `TODO(legal)` del ADR 0020, que siguen abiertos aunque los ADR estén aceptados.
**No hecho**: publicar la página de transparencia y el tablero del pronóstico. La decisión del líder es «publicar solo si es win-win»; falta definir ese criterio.

## 2026-11-09 (pruebas automáticas de accesibilidad, rama `feat/prueba-accesibilidad`)

**Hecho (sin commit, rama desde `main`)**: `@playwright/test` 1.65.0 y `@axe-core/playwright` 4.14.0 como dependencias de desarrollo. `tests/accesibilidad/` revisa las 6 páginas públicas de `main` con axe (WCAG 2.2 AA) en tema claro y oscuro, estructura (idioma, título, un `h1`, `main#contenido`), 360 px sin desborde horizontal y foco visible por teclado: 30 pruebas, todas pasan. `npm run test:a11y` compila y prueba; `playwright.config.ts` acepta `PLAYWRIGHT_CANAL=msedge` para no descargar Chromium. Trabajo nuevo `accesibilidad` en `.github/workflows/verificar.yml`. ADR 0021 y README de la carpeta.
**Comprobado**: con una página de prueba que trae una imagen sin texto alternativo y texto con poco contraste, axe las detecta (`image-alt`, `color-contrast`), así que «todo pasa» no es una prueba ciega. Las pruebas son `*.spec.ts` y no se mezclan con `node --test "tests/**/*.test.ts"`.
**Decisión del líder**: axe-core es MPL-2.0 y AGENTS.md 2.3 lista MIT, Apache y BSD. Es solo de desarrollo y no se entrega, pero pide excepción (ADR 0021).
**No verificado**: la corrida en la integración continua (aquí fue en local con Edge, no con el Chromium de Playwright en Linux); un lector de pantalla.
**Pendiente**: sumar `/transparencia` a `tests/accesibilidad/rutas.ts` cuando se fusione esa rama; decidir si `npm run test:a11y` entra en la lista de «terminado» de AGENTS.md. Ojo: en esta rama `main`, `datos/pronosticos/dashboard/datos.js` aparece como no rastreado (se ignora solo en la otra rama): no hacer `git add -A`.

## 2026-11-09 (tablero interactivo del pronóstico)

**Hecho (sin commit, rama `docs/estado-9-nov`)**: `datos/pronosticos/dashboard/` con un tablero de uso interno: `generar_datos.py` (sin dependencias) lee `datos/procesados/` y escribe `datos.js`; `index.html`, `tablero.css` y `tablero.js` (gráficos en SVG propio, solo tokens de `diseno/`). 12 secciones: cifras nacionales, calendario de verificación, método, serie PAES, validación por comuna y por carrera y sede, explorador con filtros y CSV, planificador de capacidad, escenarios de permanencia, cohorte por comuna, usos permitidos y límites. `tests/datos/test_dashboard_datos.py` (8 pruebas pasan). `datos.js` queda en `.gitignore`.
**Verificado**: el generador reproduce el informe (18.178 casos, error mediano 11,9 %, cobertura 94,8 %, intervalo ×3,2, 236.962 residentes, San Fernando +26,6 % por colegio). Probado en navegador: sin errores de consola, sin desborde horizontal a 360 px, tema claro y oscuro, filtros, agrupación y escenarios. `python scripts/tokens.py --check` pasa.
**Decisiones**: el intervalo por celda lo calcula el tablero con los cuantiles de todos los errores 2022-2026 (el script de pronóstico no lo escribe); no se trae la proporción de mujeres (ADR 0018); las cifras nacionales viven en `cifras_nacionales.json`, copiadas del informe.
**No verificado**: recorrido solo con teclado y lector de pantalla (se revisó la estructura, no se usó uno); la vista a 360 px se comprobó midiendo el DOM, no con captura; la URL específica de cada archivo de SIES y Mineduc sigue en `datos/registro_descargas.md`, no en el tablero.
**Pendiente**: decidir si el tablero se comparte (hoy trae nombres de instituciones y cifras sin verificar); sumar la comparación con lo observado cuando haya resultados de 2027. Detalle menor: el docstring de `entrada_carrera_sede.py` aún dice «promedio 2024-2026» aunque el código usa el último año.

## 2026-11-09 (alertas, derechos y endpoint del asistente; estado del plan)

**Hecho (en `main`)**: #72 tabla de alertas y derivación con pruebas RLS (fusionado); #73 exportación de datos y solicitudes de derechos (fusionado, con corrección de la función de equipo y merge con #72).
**Hecho (en #74, borrador, CI en verde)**: correcciones de la revisión (no cerrar una alerta con derivaciones abiertas, no reabrir una cerrada, no exportar `autor_id`); `lib/ia/registrar-alerta.ts` escribe la alerta con la clave de servicio; `app/api/asistente` (POST) conecta el protocolo de crisis con el registro; `lib/ia/buscar-fragmentos.ts` busca en `datos/asistente/documentos.json` y no entrega documentos vencidos. `npm test`: 172 pruebas en local.
**Por qué**: la revisión de #72 y #73 encontró que nada escribía alertas y que había dos huecos en las funciones.
**Pendiente**: aprobar #74 (otra cuenta de revisor); confirmar migraciones aplicadas en Supabase; revisión profesional de `docs/revision-profesional-derivacion.md`; configurar variables de entorno en el despliegue; probar `/api/asistente` en Cloudflare; flujo de tutor para menores (depende del ADR 0015); pulso de check-in (revisión legal antes).
**Siguiente**: desde el lunes, lo que queda de la semana 3 de `docs/plan.md`.

## 2026-11-08 (método del último año, pruebas y verificación directa)

**Hecho**: `entrada_carrera_sede.py` y `cobertura_entrada_sede.py` usan la participación del último año (2026), que fue el método con menor error en la prueba (11,9 % con la validación de celdas; antes 15,9 %). Resultado 2027: 6.961 celdas publicables y 8.082 suprimidas. Se probó también el método de contracción y el intervalo por volatilidad (`mejora_sede_2.py`): no mejoran. Pruebas nuevas: `tests/datos/test_mejora_cobertura.py` y `tests/datos/test_comparar_paes.py` (11 pasan).
**Reproducibilidad**: se clonó la rama en una carpeta limpia y se reprodujeron las salidas del commit anterior (15.043 celdas, 7.574 publicables) y la cadena del registro (válida). `REPRODUCIR.md` se actualizó al método nuevo.
**Verificación directa**: las páginas de DEMRE sí se pudieron abrir con curl. El calendario 2027 dice "Ene 4 08:00 Resultados de Puntajes PAES Regular" y "Ene 4 09:00 Inicio Etapa de Postulaciones". La página de resultados dice "lunes 4 de enero de 2027, 08:00 horas". CNA: el PDF de criterios para universidades publicado no fija umbrales de retención; los 65/60/50 % solo están en el borrador. SIES (superdesuc.cl): sin respuesta; plazo de matrícula sin verificar.
**Comparación de enero 2027**: `datos/pronosticos/comparar_paes_2027.py` compara la línea base DEF2 con las cifras publicadas (no inventa observaciones).
**Pendiente**: plazo SIES (revisar a mano); la prueba de vacantes queda para cuando se publiquen las vacantes 2027 (con una sola cohorte no se puede medir su valor predictivo); revisión del PR #71 por el líder; decisiones de precio, vía de compra y revisión legal (del líder y asesoría legal).

## 2026-11-07 (cobertura por celda, fechas y aislamiento)

**Hecho**: `datos/pronosticos/cobertura_entrada_sede.py` mide la cobertura del intervalo por carrera y sede (validación dejando un año fuera, 2022-2026, 16.519 casos con ≥30 entrantes). Resultado: cobertura 94,9 % con el total conocido (optimista), pero intervalo mediano de ×3,9. Salida en `datos/procesados/cobertura_entrada_sede.csv` (ignorada por git).
**Fechas (agente de verificación)**: solo la rendición PAES 2027 (30-nov a 2-dic-2026) y la publicación de resultados (4-ene-2027, 08:00) aparecen confirmadas, por extracto que cita el afiche DEMRE; el PDF no se pudo abrir. Matrícula 2026 y retención de la cohorte 2025 no se encontraron en fuentes oficiales. Se publica con esa distinción.
**Aislamiento**: el esquema tiene `organizacion` y `miembro` con RLS, pero no hay tabla de salidas por institución. Se corrige la propuesta: en la entrega por archivo el aislamiento es por entrega; RLS es necesario antes de guardar salidas en la base.
**Precio**: estimación de abajo hacia arriba ≈ $12,1 M anuales (rango razonable de $10 a $14 M), con supuestos de horas y margen explícitos. Coherente con el rango de compras públicas, pero no es prueba de precio.
**Fecha confirmada por el líder**: captura del calendario DEMRE: resultados PAES Regular el 4-ene-2027 a las 08:00 (hora de Chile continental), inicio de postulaciones a las 09:00 del mismo día. Falta registrar la URL de origen.
**Exigencias (agente, leídas en BCN)**: reporte al SIES de matrícula, abandono y duración nominal (Decreto 352; Ley 21.091, art. 105); plan de cierre con retención (art. 25 ter b); apoyo a la retención para gratuidad con 20 % de matrícula en los cuatro primeros deciles (art. 83 d; Decreto 333). No hay meta numérica de retención en texto legal. No verificado: criterios CNA (PDF no abierto), convenios de desempeño, plazo SIES, y Ley 21.850 (BCN indica publicación el 17-oct-2026; falta confirmarla en el Diario Oficial).
**Verificación posterior**: Ley 21.850 verificada en el texto de BCN (idNorma 1229250, publicada el 17-oct-2026 según BCN). Su artículo 20 suspende el ingreso de nuevas instituciones al financiamiento institucional para la gratuidad en 2028 y 2029. Es una ley tributaria y de otras materias, no una ley de educación superior. Texto completo revisado (copia de BCN pegada por el líder); el artículo 20 coincide literalmente. Su artículo 19 ajusta porcentajes del artículo trigésimo cuarto transitorio de la Ley 21.091. Contraloría tomó razón el 16-oct-2026. Diario Oficial no abierto directamente. La nota de BCN sobre la eliminación de los arts. 52 a 54 de la Ley 21.091 no aparece en la 21.850. CNA, convenios de desempeño y plazo SIES: sin verificar en texto. Solo se confirma la regla de 20 días hábiles del Decreto 352.
**Pendiente**: registrar la URL del calendario DEMRE; leer la Ley 21.850 completa y su publicación en el Diario Oficial; leer los PDF de la CNA; revisar indicadores de desempeño 2026 (DIPRES); reducir el ancho del intervalo por celda.

## 2026-11-07 (propuesta institucional completa)

**Hecho**: `docs/mercado/propuesta-institucional.md` (borrador) reúne qué recibe la institución, qué no hace el producto, respuestas a las cuatro preguntas, calendario de verificación 2027-2028, compromisos de neutralidad, integración, precio y vía de compra, criterios de piloto, cláusula de salida y pendientes. Se agregó un anexo al ADR 0018 con las respuestas y lo que falta. Sin nombrar institución. Sin commit.
**Por qué**: la oferta necesita responder a una institución sin depender de una sola. Lo que no está implementado (aislamiento por institución, cobertura de intervalos de primer año por celda) queda escrito como pendiente, no como hecho.
**Pendiente**: decisión del líder sobre precio y vía de compra; revisión legal (cláusula de salida, roles de la Ley 21.719, art. 8° bis); RLS antes de un segundo cliente; mapeo de exigencias de Mineduc y CNA; fechas de publicación del calendario por verificar en cada fuente.

## 2026-11-07 (ADR 0018: producto de planificación de oferta)

**Hecho**: `docs/decisiones/0018-producto-de-planificacion-de-oferta.md` (propuesta). Finalidad: planificación de oferta y apoyo, solo agregados. Descarta perfiles por variables protegidas y etiquetas por jornada. Documenta fuentes con URL y fecha, método, resultados y límites. Sin commit.
**Art. 8° bis leído completo en BCN**: derecho a no ser objeto de decisiones automatizadas que produzcan efectos jurídicos o afecten significativamente, con excepciones (contrato, consentimiento, ley con salvaguardas) y garantías en todos los casos (explicación, intervención humana, revisión). El producto agregado no activa el artículo; un sistema de alerta individual sí.
**Precio por compras públicas**: sin adjudicaciones comparables. Anclas: soporte U+ $11,9 M CLP (DGAC) y presupuesto implícito de la licitación desierta de un CFT estatal regional, ≈ $13,7 M anuales. Rango propuesto, no decidido: $11,9 a $13,7 M.
**Contacto enviado (2026-11-07, por el líder)**: correo a info@cfta.cl (canal institucional de cfta.cl), con las tres preguntas del borrador. Sin respuesta registrada todavía. Pendiente: seguimiento y resultado de la conversación.
**Institución para validar**: un CFT estatal regional (nombre omitido), por su licitación desierta. Alternativa privada: una institución que use U+. Requiere autorización del líder y asesoría legal.
**Pendiente**: revisión legal (preguntas en el ADR 0018), decisión del líder sobre precio y validación.

## 2026-11-07 (entrantes por carrera y sede, y marco legal verificado)

**Hecho**: `datos/pronosticos/entrada_carrera_sede.py` genera entrantes 2027 y proporción de mujeres por carrera y sede (15.043 celdas; 7.574 publicables con ≥10; 7.469 suprimidas). Validación 2022-2026 (celdas ≥30 entrantes): error mediano de entrantes 15,9 %; error mediano de proporción de mujeres 4,7 puntos. Salida interna en `datos/procesados/`, sin registrar aún por celda.
**Marco legal, verificado en BCN**: Ley 20.609, art. 2: la discriminación arbitraria puede fundarse en sexo, edad, situación socioeconómica, apariencia personal o discapacidad, entre otros. Ley 21.719 (BCN, idNorma 1209272): entra en vigencia el **1-dic-2026**; define "elaboración de perfiles" (art. 2 w, incluye rendimiento, situación económica, intereses y comportamiento) y considera dato sensible la situación socioeconómica (art. 2 g). Art. 8° bis (decisiones individuales automatizadas): título verificado; el texto completo no se pudo leer desde el navegador.
**Dato que justifica la advertencia**: en la cohorte 2025 la retención de mujeres supera a la de hombres por 3,3 puntos (informe SIES 2026). Un perfil por sexo ya correlaciona con resultados; usarlo en admisión afectaría a personas por una característica protegida.
**Pendiente**: leer el texto completo del art. 8° bis en BCN y revisar cumplimiento antes del 1-dic-2026.

## 2026-11-07 (permanencia de primer año 2028)

**Hecho**: `datos/pronosticos/permanencia_primer_anio.py`. Retención de primer año de la cohorte 2025 (informe SIES, agosto 2026): universidades 84,7 %, IP 72,5 %, CFT 69,9 %; nacional 77,9 %. Mezcla 2026 (SIES): 43,5 % universidades, 44,8 % IP, 11,8 % CFT. Retención ponderada 77,5 %. Permanencia 2028 nacional: 296.601 (277.434 a 300.588), a partir del primer año 2027. Registrado. Cadena válida, 1.723 filas. Sin publicar.
**Límites**: el intervalo viene solo del primer año 2027; no incluye la variación de la retención entre cohortes. La mezcla se mantiene constante.
**Fuente**: informe SIES de retención 2026 (`https://www.mifuturo.cl/wp-content/uploads/2026/08/Informe-de-Retenci%C3%B3n-de-1er-A%C3%B1o-de-Pregrado-2026.pdf`).

## 2026-11-07 (primer año de pregrado 2027, sin PAES)

**Hecho**: `datos/pronosticos/entrada_primer_anio.py`. Base SIES 2007-2026 (matrícula de primer año de pregrado): 2024 suma 350.682, frente a 350.683 del informe oficial. Tasa de entrada = primer año / cohorte de cuarto medio del año anterior: 1,499 (2021), 1,486, 1,597, 1,608, 1,638 y 1,615 (2026). Regla del último año. Error en 2022-2026: +0,9 %, −7,0 % (2023), −0,7 %, −1,8 % y +1,4 %. Pronóstico nacional 2027: 382.725 (357.992 a 387.869). Registrado nacional y por región de la sede. Cadena válida, 1.722 filas. Sin publicar.
**Límites**: cinco años de prueba; intervalo provisional. La base reparte por sede, no por residencia. El total incluye estudiantes de otras vías y edades.
**Verificación**: la matrícula 2027 del SIES (publicación del año siguiente).

## 2026-11-07 (estimación PAES por residencia, regional)

**Hecho**: `datos/pronosticos/paes_residencia_regional.py` estima rendidores regulares por región de residencia aplicando la tasa de rendición por colegio a la matriz residencia → colegio (2026), escalada con la cohorte 2027 por residencia. Registradas 16 regiones (generación PAES-REGULAR-2027-RESIDENCIA-REGIONAL). Intervalo regional con pandemia. Validación: 2026 estimado vs observado por colegio entre −5,8 % y +9,6 %. 2027, residencia vs colegio: dentro de ±3 % en 10 regiones; +5,7 % Metropolitana, +12,4 % Arica, +12,6 % Magallanes (flujos entre regiones). Cadena válida, 1.705 filas.
**Límite**: es una estimación con supuesto (la tasa depende del colegio). No es validable con DEMRE porque no publica residencia. Solo se cita a nivel regional.
**Decisión**: criterio de cita "lo más confiable siempre" (plan, A7). Citables: cohorte de cuarto medio por residencia (comunal y regional) y PAES Regular por región del colegio. No citable: PAES por residencia (supuesto no validable). Sin publicar. Sin commit.

## 2026-11-07 (intervalos con y sin pandemia)

**Hecho**: `datos/pronosticos/intervalos_con_sin_pandemia.py` calcula ambos intervalos y registra la variante sin pandemia (generaciones ...-DEF2-SIN-PANDEMIA). Comunal con pandemia x0,615 a x1,584; sin pandemia x0,753 a x1,644. Regional con pandemia x0,759 a x1,083; sin pandemia x0,959 a x1,087. San Fernando 1.632: con pandemia 1.004 a 2.586; sin pandemia 1.230 a 2.682. Cadena válida, 1.689 filas.
**Por qué**: el par 2020→2021 explica la cola inferior, no la superior. Excluirlo estrecha la región (±5-9 %) y no la comuna en su cola alta.
**Confirmado**: DEMRE confirmó la definición de rendidor regular (fila con puntaje regular). Ya no está pendiente.

## 2026-11-07 (quiebre 2022-2023 explicado: definición de rendidor; corrección de líneas base)

**Causa**: a partir de 2023 el archivo de rendición combina PAES Regular e Invierno. Contar filas incluye a personas sin puntaje regular (solo Invierno o sin puntaje). Con filas: 2026 = 317.700; con puntaje regular: 254.177 (−20 %). El salto 2022→2023 que parecía un quiebre era ese cambio de definición.
**Definición usada** (`datos/pronosticos/definicion_rendidor.py`): fila con al menos un puntaje regular distinto de vacío y cero. Pendiente confirmar con DEMRE.
**Validación con la definición consistente** (`recalcular_paes_definicion.py`): comunal, APE mediano 6–8 % en años normales, 2022→2023 = 7,7 % con cobertura 94 %; regional, APE 1,5–5,4 %, cobertura 88–100 %; el quiebre desaparece. Intervalos: comunal ×0,615 a ×1,584; regional ×0,759 a ×1,083.
**Líneas base corregidas (filas nuevas, append-only)**: San Fernando 1.632 (1.004 a 2.586), antes 2.140; O'Higgins 13.666 (10.378 a 14.806), antes 17.323. Las filas anteriores quedan como historial con su motivo.
**Pendiente**: confirmar con DEMRE la definición de rendidor; decidir si se mantiene el intervalo comunal ancho (incluye 2020-2021).

## 2026-11-07 (pronóstico regional PAES Regular 2027, registrado)

**Hecho**: `datos/pronosticos/registrar_paes_regional.py` valida y registra el pronóstico regional de rendidores (17 regiones, persistencia regional, intervalo x0,770 a x1,209). Validación: error mediano 1,7 % a 7,2 % en años normales y cobertura 94 % a 100 %. La transición 2022→2023 falla de nuevo (13,3 % de error, 11,8 % de cobertura) y no tiene causa identificada. Ejemplo: O'Higgins (06) 17.323 (13.343 a 20.948); Metropolitana (13) 121.716 (93.749 a 147.187). Cadena válida. Sin publicar.
**Pendiente**: investigar el quiebre de 2022→2023 (cambio de proceso, de cohorte o de conteo) antes de citar cualquier cifra.

## 2026-11-07 (pronóstico de cuarto medio 2027 por residencia, registrado)

**Hecho**: `datos/pronosticos/registrar_cohorte_residencia.py` registró en el registro append-only el pronóstico de cuarto medio 2027 por comuna de residencia (334 comunas, método persistencia con tendencia nacional, crecimiento 2025→2026 de 1,0314, intervalo x0,802 a x1,355). San Fernando: 1.196 (960 a 1.621). Cadena válida. Sin publicar.
**Por qué**: unidad decidida en A7 del plan. Se registró antes de que existan datos de 2027 (matrícula de abril de 2027).
**Límite**: los rendidores PAES por comuna del colegio que están en el registro (PAES-REGULAR-2027) se mantienen como registro interno. Por la decisión de A7, solo se citan a nivel regional o nacional.
**Siguiente**: verificar el pronóstico en la matrícula 2027 por residencia (abril-mayo de 2027).

## 2026-11-07 (matrículas 2020-2025 por residencia y unidad del pronóstico)

**Hecho**: se descargaron de datosabiertos.mineduc.cl las matrículas por estudiante 2020 a 2025 (cada una ~34 MB comprimida) y se agregó cuarto medio por residencia (`datos/procesados/residencia_4to/`). Totales: 209.732 (2020), 214.339, 216.397, 218.133, 220.811, 229.744 y 236.962 (2026). Backtest residencial (`datos/pronosticos/backtest_residencia.py`): error mediano 5,6 % a 6,4 %, cobertura del intervalo empírico 93 % a 97 %, intervalo ±20 % a 35 %. Decisión propuesta de unidad en `docs/analisis/plan-de-analisis.md` (A7). Sin publicar. Sin commit.
**Por qué**: la comuna del colegio sobreestima la cohorte local. La residencia es más estable y calibrable.
**Pendiente**: revisión del líder de la unidad propuesta; los rendidores PAES solo a nivel regional o nacional.

## 2026-11-07 (calibración del intervalo y unidad de análisis)

**Hecho**: `datos/pronosticos/calibrar_intervalos.py` calibra intervalos empíricos con el cambio logarítmico entre procesos PAES Regular, con validación dejando un par fuera. Cobertura: 96,5 % (2021→2022), 90,1 % (2022→2023), 95,1 % (2023→2024), 97,5 % (2024→2025) y 99,7 % (2025→2026); 51,9 % en 2020→2021 (pandemia). `corregir_intervalos_paes.py` registró 327 correcciones como filas nuevas (append-only). San Fernando: 2.140 con intervalo 1.332 a 3.603 (antes 2.049 a 2.231). La cadena verifica.
**Unidad de análisis**: DEMRE asigna la comuna del colegio de egreso (confirmado en el libro de códigos). Las pruebas previas usan esa unidad; la matriz de residencia (Mineduc 2026) no es comparable directamente con DEMRE.
**Implicación**: por comuna, los intervalos son muy anchos (±40-70 %). La utilidad está en agregados regionales o nacionales.
**Pendiente**: pronóstico por cohorte de residencia; backtest residencial requiere matrículas por estudiante de 2020-2025 (archivos grandes, pedir permiso). Sin publicar.

## 2026-11-07 (cohortes por comuna y cuarto medio 2026)

**Hecho**: se descargó desde datosabiertos.mineduc.cl la matrícula por estudiante 2026 (3.467.024 registros) y se agregó con `datos/calibracion/agregar_cuarto_medio.py` (solo conteos por comuna; ningún dato individual se guarda). Cuarto medio 2026: 236.962 en el país y 1.468 en San Fernando. También se procesó el Censo 2024 con edad simple (`datos/procesados/cohorte_17_18_censo.csv` y `cohorte_17_18_2026.csv`). Sin commit.
**Por qué**: la matrícula cuenta por **ubicación del establecimiento**, no por residencia. San Fernando tiene 1.468 de cuarto medio y 2.448 de 17-18 años residentes: la razón es 1,20, frente a 0,89 en el país. Eso sugiere que la comuna recibe alumnos de otras comunas.
**Resuelto**: el mismo archivo trae la comuna de residencia del alumno. `datos/calibracion/agregar_origen_destino.py` produce la matriz residencia → colegio (celdas <10 suprimidas). San Fernando: 1.160 residentes en cuarto medio, 1.028 estudian en su comuna, 440 llegan de otras comunas y 132 de sus residentes estudian fuera. Por residencia, el cuarto medio por edad es 0,95 (país 0,89), así que es coherente con el censo. Por colegio, la cifra inflaba el cálculo en 27 %. El pronóstico debe usar residencia.
**Pendiente**: revisar la supresión antes de publicar cualquier resumen por comuna.

## 2026-11-07 (prueba retrospectiva de la línea base PAES)

**Hecho**: `datos/pronosticos/backtest_persistencia.py` aplica persistencia a pares de procesos consecutivos de la PAES Regular (2020 a 2026; falta 2022). Resultados: APE mediano por comuna de 24,6 % (2020→2021), 7,0 % (2023→2024), 6,0 % (2024→2025) y 6,2 % (2025→2026). Cobertura del intervalo registrado (n ± 1,96·√n): 23,9 %, 61,7 %, 71,7 % y 67,6 %.
**Actualización con 2022**: se agregó el proceso 2022. Nuevos pares: 2021→2022 con APE mediano 9,3 % (cobertura 57,8 %) y 2022→2023 con 16,9 % (cobertura 23,9 %). La causa del salto de 2022→2023 no está investigada.
**Por qué**: es la evidencia que existe hoy. Mide el pasado, no el futuro.
**Problema**: el intervalo registrado el 2026-11-07 es demasiado estrecho. Cubre 62-72 % de los casos, no el 95 % que declara. Por eso el error real es mayor que la variabilidad muestral.
**Siguiente**: los pronósticos nuevos usarán un intervalo empírico calibrado con estas pruebas. El registro es append-only: la corrección de la línea base se registra como fila nueva con su motivo. Sin commit.

## 2026-11-07 (primer pronóstico registrado: PAES Regular 2027)

**Hecho**: se registró la línea base de rendidores PAES Regular 2027 por comuna (327 comunas, con supresión de las que tienen menos de 10). Método: persistencia sobre la PAES Regular 2026 (317.700 rendidores). San Fernando: 2.140, intervalo 2.049 a 2.231. El registro es append-only, con cadena de hash verificada. Sin commit.
**Por qué**: la rendición regular es el 30 de nov a 2 dic de 2026, así que el pronóstico se registró antes de ese plazo. Es una referencia mínima para superar.
**Límite**: el intervalo solo refleja variabilidad muestral; no incluye cambios de cohorte ni de política, y probablemente subestima el error real.
**Siguiente**: comparar con la rendición regular 2027 cuando DEMRE la publique (enero de 2027). Actualizar el calendario en el plan (A6) si cambian las fechas.
**Fracaso a evitar**: la rendición de invierno (proceso 2027) está observada; no se registra como pronóstico.

## 2026-11-07 (plan de análisis y requisito de datos institucionales)

**Hecho**: se crea `docs/analisis/plan-de-analisis.md` con dos vías: pronóstico generacional con datos públicos (A0-A4) y análisis individual con datos de la institución (B0-B5). La IA ejecuta casi todo; las personas aprueban los checkpoints de la tabla final. El ADR 0016 agrega que el análisis individual necesita datos de la institución, no solo de la plataforma. Sin commit.
**Por qué**: los datos de la plataforma tienen sesgo de selección y señales débiles; los predictores fuertes (notas, asistencia) solo los tiene la institución.
**Pendiente**: revisión legal (Ley 21.719), acuerdo institucional y gate del ADR 0016 antes de cualquier modelo individual; inventario de fuentes en `docs/fuentes.md` (aún sin verificar la desagregación de las bases).

## 2026-11-07 (propuesta ADR 0017: pronóstico agregado y piloto en una sede privada)

**Hecho**: se redacta `docs/decisiones/0017-pronostico-agregado-piloto-sede-privada.md` como propuesta. El piloto usa solo datos públicos al principio; no se publica el nombre de la institución sin autorización escrita; si no hay casos suficientes, se cancela. Sin commit.
**Por qué**: el pedido fue un piloto con una sede privada. Un análisis con una institución concreta exige declarar la relación y cuidar la neutralidad del portal.
**Pendiente**: verificar en SIES la sede San Fernando (no encontrada en fuente oficial; solo un directorio sin fecha); definir el umbral mínimo de casos; decidir si se pide conversación formal con la institución.

## 2026-11-07 (análisis de mercado y propuesta ADR 0016)

**Hecho**: se creó `docs/mercado/analisis-mercado.md` con datos verificados en fuente oficial (matrícula 2025, retención 2022) y con las bases de una licitación desierta (código omitido). Los requisitos de integración con U+ son habilitantes; las bases piden analítica predictiva. Se propone `docs/decisiones/0016-prediccion-condicionada-de-riesgo.md`: revisión condicionada de la prohibición de predicción, con ocho precondiciones. Sin commit.
**Por qué**: el mercado de licitaciones exige predicción, y los competidores la venden. Pero hoy no hay datos a nivel de estudiante que la respalden: el ADR 0016 lo declara y no habilita nada todavía.
**Pendiente**: revisión del líder de los ADR 0015 y 0016; revisión legal de la Ley 21.719 sobre decisiones automatizadas; cambio de AGENTS.md 2.4 si se acepta el 0016; causal de la declaración desierta (resolución en Mercado Público).
**Fracaso a evitar**: Antigravity no pudo buscar en Mercado Público por permisos de modo headless; no se cambió la configuración sin decisión del usuario.

## 2026-11-07 (propuesta ADR 0015: cuenta y vínculo institucional)

**Hecho**: se redacta `docs/decisiones/0015-cuenta-del-estudiante-y-vinculo-institucional.md` en estado propuesta. Define: cuenta del estudiante por correo sin contraseña; vínculo con la institución de educación superior por correo institucional o código de invitación (nunca búsqueda por la institución); Ficha compartida por capas, cada una con consentimiento propio y revocable; ningún servicio depende de compartir la Ficha. Sin commit.
**Por qué**: la Ficha pertenece al estudiante y necesita un titular identificable para revocar y exportar datos. El consentimiento tiene que ser libre (Ley 19.628 y 21.719), y la capa sensible requiere consentimiento separado.
**Pendiente**: revisión del líder (@rafajaque); flujo de menores de 18; lista de dominios institucionales verificada con fuente y fecha (los dominios de ejemplo de la conversación no están verificados); definición de campos por capa; revisión legal de la capa sensible; reflejar la propuesta en `docs/privacidad.md`.
**Siguiente**: el líder decide si acepta la propuesta; después se diseñan las tablas RLS de vínculos y consentimientos.

## 2026-11-07 (migración de datos oficiales aplicada)

**Hecho**: se aplicó `20261105000000_datos_oficiales_completos.sql` en el proyecto de Supabase de São Paulo, desde el editor SQL, con confirmación del líder. Antes se verificó que `programa` estaba vacía y que las 6 tablas nuevas no existían. Después: 21 tablas con RLS activado y 0 sin RLS.

**Por qué**: el esquema de datos oficiales (ADR 0014) tiene que existir en la base real antes de cargar la oferta.

**Pendiente**: generar los lotes de carga desde `datos/procesados/carga.csv`. La base no tiene respaldo automático porque el plan es gratuito; el líder decidió aplicarla así.

## 2026-11-06 (revisión de textos C10)

**Hecho**: se revisaron los textos de la portada, el explorador y la ficha de carrera con la skill `lenguaje-claro`. Se explicaron las siglas de las fuentes en pantalla, se simplificaron los indicadores y mensajes sin datos, y se creó `docs/datos/glosario.md` con los términos oficiales usados por la interfaz.

**Por qué**: los nombres oficiales siguen visibles, pero cada uno necesita una explicación que una persona pueda entender sin conocer el sistema de educación superior.

**Pendiente**: repetir esta revisión cuando se agreguen pantallas nuevas. No se cambiaron los textos de páginas técnicas de prueba porque no forman parte del recorrido estudiantil.

## 2026-11-06 (comprobación humana del corpus C9b)

**Hecho**: Cristóbal informó que comprobó manualmente todos los fragmentos del corpus contra los documentos oficiales originales. La constancia quedó en `datos/asistente/README.md` antes de conectar el buscador al asistente.

## 2026-11-06 (corpus oficial del asistente)

**Hecho**: se agregó `datos/asistente/documentos.json` con fragmentos literales de cuatro documentos oficiales vigentes para admisión, beneficios, carreras y plazos. Cada documento conserva organismo, URL, fechas, tema y vencimiento cuando corresponde; una prueba valida el contrato de `Fragmento` y los identificadores únicos.

**Por qué**: el asistente solo puede responder con trozos oficiales que respalden exactamente cada cita. El corpus queda versionado y separado de la conexión futura al buscador.

**Pendiente**: el líder debe conectar el buscador de fragmentos; antes de reutilizar el corpus en otro proceso de admisión, hay que revisar vigencia y reemplazar los documentos vencidos.

## 2026-11-06 (revisión manual de beneficios C9)

**Hecho**: Cristóbal informó que revisó manualmente los ocho montos máximos del catálogo contra sus páginas oficiales, incluida la Beca Juan Gómez Millas para Estudiantes Extranjeros (BJGME). La revisión quedó documentada en `datos/beneficios/README.md` y protegida por una prueba con los ocho valores.

**Pendiente**: Mineduc aún debe publicar las fechas exactas de las etapas que siguen en `null` y actualizar las fechas de acreditación de las páginas Juan Gómez Millas. Esos datos no se completaron ni estimaron.

## 2026-11-05 (C8: verificación manual DEMRE)
**Hecho**: Codex hizo una revisión visual automatizada de las 258 filas de `datos/verificacion/demre_muestra.csv`; esto no reemplaza la verificación manual pedida. `datos/verificacion/demre_revision_humana_pendiente.csv` deja preparadas 15 filas para una persona: 5 con requisito `SI`, las 2 con `APROBADA`, los códigos 17074, 32012 y 17004, y 5 al azar.
**Corrección**: las ponderaciones numéricas `prueba_especial` y `asignacion_especial_pedagogia` ya no mezclan texto. `APROBADA` y `SI` viven en `requisito_prueba_especial` y `requisito_asignacion_pedagogia`. Las excepciones 17074 y 32012 salieron del código y viven en `datos/correcciones/demre_2027.csv`, con fuente, URL y fecha propias. También se separa la nota al pie `(10` cuyo cierre falta en la capa de texto del PDF para el código 17004.
**Resultado técnico**: el cargador conserva tipos compatibles con el esquema numérico y agrega una prueba contra el PDF para los 220 requisitos `SI` y los 2 `APROBADA`. La revisión humana de las 15 filas sigue pendiente; no se declara como terminada hasta que una persona complete responsable, fecha y resultado.

## 2026-11-05 (C9: beneficios y plazos)

**Hecho**: se agregaron catálogos versionados de beneficios estudiantiles y plazos FUAS del proceso 2027, con fuente, URL y fecha de consulta por beneficio. Las pruebas validan trazabilidad, lenguaje sin promesas y valores contrastados con las páginas oficiales.
**Por qué**: los beneficios, montos y fechas cambian por proceso y no deben quedar escritos en el código. Cuando Mineduc no ha publicado una fecha exacta, el dato queda `null` con su motivo.
**Pendiente**: Mineduc aún no publica las fechas exactas del segundo FUAS, nivel socioeconómico, resultados y apelaciones. Las páginas de las becas Juan Gómez Millas conservan fechas de acreditación de 2025; los beneficios se incluyeron porque la guía 2027 confirma su vigencia, pero esas fechas desactualizadas no se copiaron.
**Siguiente**: una persona debe revisar el catálogo y, cuando Mineduc actualice el calendario o las páginas pendientes, crear un nuevo cambio conservando la trazabilidad del proceso.

## 2026-11-05 (esquema de datos oficiales)

**Hecho**: se propone ADR 0014 y una migración para cargar los datos oficiales en sus niveles correctos: institución, carrera genérica SIES, título y variante. Añade trazabilidad para arancel/UF, tramos de ingreso, requisitos y vacantes DEMRE, y acreditación fechada; las pruebas RLS verifican lectura pública, escritura bloqueada, nulos con motivo, rangos y claves únicas.
**Por qué**: un título no determina una carrera genérica, y el código de carrera Mineduc no es una clave estable. La variante concentra las relaciones de la oferta: código SIES, código Mineduc, código DEMRE y carrera genérica; así las cifras SIES no se atribuyen a una sede.
**Pendiente**: la migración debe pasar la integración continua con PostgreSQL; después se genera la carga SQL por lotes, sin credenciales en el repositorio. Sigue pendiente la verificación manual de la muestra DEMRE.
**Siguiente**: revisar el resultado del PR de migración; si la CI pasa y el líder lo fusiona, generar los lotes de carga desde `datos/procesados/carga.csv`.

**Corrección posterior a la CI**: se ajusta la acreditación para aceptar instituciones no acreditadas o bajo tutela sin años ni motivo, porque así viene Mineduc; los aranceles 0 pasan a ser inválidos y deben cargarse como `NULL` con motivo. También se agregan pruebas reales de tramos, UF, claves DEMRE y niveles de indicador. Un segundo ajuste corrige el `VALUES` del fixture de la variante vespertina, que tenía omitido el código DEMRE nulo y detenía la prueba antes de correr. Límite anotado: la matrícula de inscripción convertida desde UF no conserva su monto original.

## 2026-11-05 (herramientas y asistente con fuentes)

**Hecho**: se documenta el orden de evaluación de Supabase CLI, Playwright y Lighthouse CI, dejando Pandera y Vercel AI SDK para una necesidad repetida. También queda el diseño mínimo del asistente: documentos oficiales versionados, fragmentos trazables, Gemini con contexto acotado y rechazo de respuestas sin cita válida; se anotan Gemini Cookbook, Promptfoo, Vercel Chatbot y Ragas como referencias, no como dependencias.
**Por qué**: el siguiente riesgo verificable es probar migraciones y políticas RLS en local. Un asistente no necesita entrenamiento propio para información oficial cambiante: necesita recuperar fuentes vigentes y conservar las barreras deterministas de crisis y privacidad.
**Pendiente**: el líder conecta Supabase; después se evalúa Supabase CLI. El asistente sigue sin interfaz ni corpus de documentos, por lo que ninguna de las herramientas de chat se instala todavía.
**Siguiente**: al tener Supabase local, ejecutar las pruebas SQL con pgTAP; al diseñar la interfaz del asistente, definir el corpus oficial y casos sintéticos de evaluación antes de agregar dependencias.

## 2026-11-06 (entregable Parte I integral)

**Hecho (encuestas)**: encuestas rehechas con respaldo en instrumentos publicados; lista de pendientes: permisos a autores, ítems de intención de abandono y E-DTDC, listado textual de aspectos de Luksic. Ninguna pregunta es propia (niveles A a D); claves de verdadero o falso verificadas el 2026-11-06; se actualizaron fichas, README, `crear_encuestas.gs` y el Anexo 2.A del entregable. Sin commit.

**Hecho**: `docs/entregable/Entregable_Parte_I.md` es el documento vivo con los puntos 1 a 8 del Entregable Parte I (un solo archivo; los próximos puntos se agregan ahí), escritos contra las guías Word de los capítulos 1 a 5 y auditados punto por punto. Sin commit.
**Por qué**: los borradores de `%TEMP%\Entregable_Parte_*.md` traían datos primarios inventados (encuesta n = 112 y sus porcentajes, entrevistas E1-E6, focus group, ratio 1:450, piloto de 100 estudiantes, fecha 19 de diciembre). Se descartaron: las encuestas están diseñadas, no aplicadas. Los resultados quedan como `[COMPLETAR]`; las decisiones del equipo (socios, vesting, precios) como `[CONFIRMAR]`.
**Pendiente**: aplicar encuesta y entrevistas y completar las tablas del punto 2; portada (escuela, sección, apellidos); puntos 9 (valorización y factibilidad) y 10 (presupuesto) cuando lleguen sus guías; gráficos propios del punto 2; confirmar fecha de entrega (el repo dice 2 de diciembre).
**Siguiente**: el líder decide los `[CONFIRMAR]` y revisa el cuerpo del punto 2, que excede las 4-7 páginas de la guía.


## 2026-11-05 (preparación de carga)

**Hecho**: se agregó `datos/preparar_carga.py`, que deja una fila trazable por código SIES al unir la oferta de Mineduc con las filas cruzadas de SIES y DEMRE. Escribe `datos/procesados/carga.csv` y su reporte; ambas salidas siguen ignoradas por git. Tiene pruebas sintéticas para el cruce, los vacíos y los códigos repetidos.
**Por qué**: los archivos `oferta_empleabilidad.csv` y `oferta_demre.csv` solo contienen las llaves de cruce; el script usa además `empleabilidad.csv` y `demre.csv` para conservar las cifras, su fuente, URL, fecha y período sin inventar valores ni transformar ausencias en cero.
**Pendiente**: completar la muestra humana de 15 filas en `datos/verificacion/demre_revision_humana_pendiente.csv`; definir en la migración cómo guardar UF, el tramo de ingreso y los motivos de vacantes vacías; el líder conecta Supabase y después el portal lee la oferta real.
**Siguiente**: el script ya se ejecutó con los datos reales (11.364 filas y 89 columnas; 7.299 con indicadores SIES y 2.086 con datos DEMRE; los cruces son coherentes y la salida es repetible byte a byte). Usar `carga.csv` como entrada del cargador de Supabase cuando exista el esquema final. Los nombres de columna (`oferta_`, `sies_`, `demre_`; sin prefijos repetidos) son el contrato con ese cargador.

## 2026-11-05 (tarde: carga de datos reales)

**Hecho**: fusionados #38 (portada enlaza al explorador), #39 (`datos/cargar_oferta.py`: 11.364 carreras de pregrado desde Mineduc, 23 s), #40 (`datos/cargar_empleabilidad.py`: SIES y cruce) y #41 (corrige el texto de empleabilidad). Las pruebas de Python corren en la CI. Salidas en `datos/procesados/` (ignorada por git); todavía NADA se carga a la base ni se muestra en el portal: el portal sigue con las 10 carreras de ejemplo.
**Por qué**: (1) el SIES publica por institución × carrera genérica, no por título: ese es el cruce correcto (94,1 % de las filas; 7.299 de 11.364 carreras reciben indicadores). (2) «Empleabilidad» = % de titulados que, con ingresos informados, ganó al menos el sueldo mínimo; no mide «tener trabajo». (3) Derecho: el SIES informa como «1.er año» el dato del 2.º; la nota de Cristóbal era correcta y mi cambio a `empleabilidad_2do_anio` fue un error (revertido). (4) Aranceles en UF (173 de pregrado): se guardan en UF y en pesos con la UF del día ($41.274,20 el 2026-11-05), aproximados.
**Fracasos a evitar**: Antigravity no puede abrir archivos oficiales en modo automático (pide ejecutar comandos); el texto plano del PDF del DEMRE separa los datos de su código (daba 70 vacantes en vez de 53: leer por posición con pypdf). En este entorno las barras invertidas dobles en comandos se reducen a una: escribir regex con la herramienta de archivos, no con heredocs.
**DEMRE (C8, PR #43)**: `datos/cargar_demre.py` lee el PDF por posición (el texto plano mezcla los datos entre filas vecinas): 2.157 de 2.159 filas validadas con la suma de ponderaciones = 100; 2.086 de las 2.138 carreras con código DEMRE reciben ponderaciones y vacantes. Un puntaje como «567,5» se perdía en silencio por no ser un entero: ahora se lee, y todo texto con cifras que no se reconozca manda la fila a revisión. **Falta verificar a mano el 10 %** (`datos/verificacion/demre_muestra.csv`, 258 filas): en esta máquina no hay renderizador de PDF y el navegador solo descarga. Tampoco se confirmó el significado de las columnas «especial», ni por qué 52 códigos DEMRE de la oferta no están en el PDF.
**Pendiente**: cargar a Supabase (paso del líder: aplicar migraciones y conectar); mostrar la oferta completa en el portal (hoy `lib/datos/carreras.ts` lee el JSON de ejemplo); nombres de carrera con tildes (usar la carrera genérica de Mineduc); mostrar la acreditación «al 30 de abril de 2026»; motivo de las vacantes `null` y de la matrícula de inscripción en 0 (450 carreras); cómo mostrar un indicador del SIES que aplica a una carrera genérica y no a un título exacto.
**Siguiente**: que una persona verifique la hoja del DEMRE; después, conectar la base (paso del líder) y hacer que el portal lea la oferta real.

## 2026-11-05 (mediodía, ya despierto el líder)

**Hecho**: fusionados #28 (tipografías) y #22 (datos de ejemplo, verificados contra los archivos oficiales). #35 (ficha) y #36 (explorador) actualizados sobre el nuevo `main`; la ficha muestra la matrícula total en su bloque. CI en verde en ambos.
**Por qué**: la verificación de #22 se hizo leyendo los tres archivos oficiales: arancel (Mineduc, `valor_arancel`), 53 vacantes (DEMRE, página 296) y 59,79 % (SIES, fila 97); y arancel y matrícula de las 10 carreras coinciden con el CSV de Mineduc. Antigravity no pudo hacerlo: abrir archivos exige ejecutar comandos y el modo automático se lo niega. El texto plano del PDF del DEMRE separa los datos de su código (daba 70 en vez de 53): hay que leerlo por posición en la página.
**Fracaso a evitar**: cambié Derecho a `empleabilidad_2do_anio` por fiarme de una nota de Cristóbal; el SIES trae ese valor en la columna del 1.er año. Revertido. No cambiar un dato por una nota sin mirarlo en la fuente. Tampoco `push --force` a ramas de PR: el modo automático lo bloquea; usar fusión de `main` en la rama.
**Pendiente**: Cristóbal debe aclarar la nota «excepción de Derecho» (las cohortes miden otro período) y el motivo de las vacantes `null` de institutos y CFT. #35 y #36 siguen en borrador. Lighthouse, 4G lenta y lector de pantalla sin medir. Reservas 1 y 2 del ADR 0003 (#33) sin medir.
**Después (mismo día)**: fusionados #29 (ADR 0013), #30 (cifras con su fuente original), #31 (reparto y bitácora), #33 (ADR 0003 aceptada con reservas) y #34 (insumos para la revisión profesional). #30 estaba apilado sobre #29 y por eso nunca había corrido su CI: tras fusionar #29 hubo que reapuntarlo a `main` y fusionar `main` en su rama (`-X ours`) antes de que pasara. Para la próxima vez: no apilar PR de documentación; abrirlos todos contra `main`.
**Ficha y explorador en producción**: #35 (ficha, A5) y #36 (explorador, A6) fusionados; Cloudflare los despliega solos en unos 4 minutos. `/carreras` y las 10 fichas responden en `agencia-de-enlace.rafajaqued.workers.dev`. La ficha y el explorador comparten `lib/datos/ruta.ts` y `fechas.ts`: no duplicar esa lógica (al fusionar `main` con `-X theirs` se había duplicado y hubo que reaplicarlo).
**Siguiente**: enlazar `/carreras` desde la portada; resolver con Cristóbal lo de Derecho y las vacantes de institutos y CFT; pedir la revisión profesional del protocolo de crisis (insumos en `docs/revision-profesional-crisis.md`).

## 2026-11-05 (noche)

**Hecho**: sitio desplegado en `agencia-de-enlace.rafajaqued.workers.dev` (PR #32 fusionado). PR #33 acepta con reservas el ADR 0003 y anota los términos de Cloudflare: no prohíben uso comercial, pero prohíben procesar tarjetas en el plan gratuito y pueden terminar el servicio gratuito sin aviso. PR #34 reúne insumos para la revisión profesional del protocolo de crisis.
**Por qué**: se ejecutaron 24 frases contra `detectarCrisis()`: `me voy a ahorcar` no se detecta (el patrón busca "ahorcarme"); es un error del patrón, no una cuestión clínica. No se corrigió: `lib/ia/` necesita tu decisión y la revisión profesional.
**Fracaso a evitar**: `codex exec` lanzado en segundo plano se colgó horas sin avisar (esperaba entrada por consola) y después se detuvo a pedir aprobación de su propio plan. Regla: pasar el prompt por archivo (`-`), decirle "no pidas confirmación" y revisar su CPU y su salida a los pocos minutos, en vez de esperar un aviso que no llega si el proceso no termina. Antigravity: usar `--mode plan` y `--print-timeout 8m` (con unidad). Sus respuestas se verifican antes de usarse: se equivocó con el adaptador de Cloudflare.
**Pendiente**: ficha de carrera en construcción por Codex (copia temporal, rama `feat/ficha-carrera`, base: datos de #22 y `lib/datos/carreras.ts`); reservas del ADR 0003 (4G lenta, CPU real, segundo despliegue automático); #22 espera la corrección de `matricula` y la verificación de tres valores; #28 espera que se aprueben sus verificaciones.
**Siguiente**: el viernes 6, revisar #22 y #28 y decidir qué fusionar de #29 a #34. Después, los borradores apilados: #35 (ficha, A5) y #36 (explorador, A6, sobre #35). Ambos dependen de #22 y deben actualizarse con `main` cuando se fusione.
**Por qué**: la ficha y el explorador salen de Codex en copias aparte (carpetas temporales); Claude los revisó y corrigió. Antigravity detectó problemas reales en la ficha (siglas sin explicar, duración formal sin fuente, tarjeta que podía quedar en blanco), todos arreglados; sobre el botón `disabled` y las cifras sin período se equivocó o exageró. La duración formal se quitó de la ficha: AGENTS.md 2.1 prohíbe publicar lo que no se verifica.
**Pendiente (datos)**: Derecho en la Universidad de Antofagasta muestra empleabilidad "al primer año" pero el período dice que es el indicador equivalente al 2.º año; mezcla dos indicadores. Falta decidirlo con Cristóbal. Sin medir: Lighthouse, 4G lenta y lector de pantalla (una llamada a `npx lighthouse` fue bloqueada por el modo automático; correrlo a mano desde Chrome DevTools).
**Fracaso a evitar**: `agy` no puede leer archivos fuera del repositorio en modo automático (devuelve vacío); hay que pegarle el código dentro del prompt.

## 2026-11-05 (tarde)

**Hecho**: PR #32 prepara el despliegue en Cloudflare con OpenNext (A4). En local compila, responde y el paquete pesa 4.687 KiB (996 KiB comprimido). Codex escribió `lib/datos/carreras.ts` con pruebas (rama `feat/lib-datos-carreras`, solo en una copia temporal, sin commit; depende de #22).
**Por qué**: Cloudflare ya recomienda `vinext` (build con Vite) y no OpenNext; se probó OpenNext primero porque no cambia el stack. Antigravity afirmó lo contrario y erró; sus límites del plan gratuito sí eran correctos. OpenNext 1.20.15 y no la 1.20.16, porque esta exige `next >=16.4.5`.
**Pendiente**: conectar el repo en el panel de Cloudflare y medir el despliegue real (carga en 4G lenta, 10 ms de CPU). Cristóbal debe corregir la unidad de `matricula` en #22 y alguien verificar tres valores. Alejandro: #28 espera que se aprueben sus verificaciones. Revisión profesional del protocolo de crisis: se pide el 6 de nov.
**Siguiente**: fusionar #32 tras tu revisión, conectar Cloudflare y, con #22 corregido, commitear la rama de Codex y construir la ficha de carrera (A5).

## 2026-11-05

**Hecho**: revisión de puntos fuertes y débiles del proyecto (sin cambios de código). Se crea esta bitácora; las entradas anteriores no se reconstruyeron desde los commits.
**Por qué**: el diagnóstico es que el proyecto tiene buena base (reglas, RLS probado, protocolo de crisis, trazabilidad de datos) pero casi nada de producto: la única página es un título y una frase, y no hay datos oficiales cargados. Quedan 4 semanas hasta la entrega del 2 de diciembre.
**Pendiente**: PR #28 (tipografías, Alejandro) y #22 (carreras de ejemplo, Cristóbal) abiertos esperando revisión. Los PR #29 y #30 (ADR 0013 y cifras) son documentación del líder. Sigue pendiente la revisión profesional del protocolo de crisis y la autorización escrita del CNED (ADR 0009).
**Siguiente**: revisar #28 y #22 el viernes 6 de nov. `docs/equipo/reparto.md` (PR #31) saca a Alejandro y Cristóbal del camino crítico: la meta es una ficha real desplegada el 16 de nov, construida por el líder, Claude y Codex o Antigravity; ellos entregan tareas cortas con fecha. La vía verde de revisión quedó como propuesta para después (necesita un ADR que cambie `AGENTS.md` 4.6).
**Por qué cambió el enfoque**: el primer borrador del reparto asumía que ambos entregarían a tiempo; el líder dijo que van retrasados y que parte del atraso son sus PR esperando revisión.
**Fracaso a evitar**: seguir sumando documentos (los últimos 5 commits fueron `docs:`) mientras la única página del portal es un título.
