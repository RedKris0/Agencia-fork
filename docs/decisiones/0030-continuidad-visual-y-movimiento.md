# 0030 — Continuidad visual y movimiento del portal

Fecha: 2026-11-11 · Estado: propuesta (pendiente de aceptación del líder)

## Contexto

Cristóbal pidió apariciones más pausadas al desplazarse, continuidad con la
portada al navegar y tarjetas con mayor presencia visual. Solicitó investigar
referencias recientes antes de ajustar las páginas interiores.

## Opciones evaluadas

| Opción | A favor | Consideración |
|---|---|---|
| Ajustar solo la duración | Cambio localizado | Las páginas interiores siguen teniendo una composición diferente |
| Compartir navegación, ilustraciones y movimiento | Mantiene orientación e identidad entre páginas | Requiere comprobar el foco, las listas filtradas y la navegación |

## Decisión

Se comparten el logo, la navegación y el tren de la portada. Las cabeceras
interiores utilizan sus ilustraciones originales y encuentros diagonales.
Las tarjetas separan una cabecera gráfica de la información y sus fuentes.
La ficha individual utiliza esa cabecera y paneles de indicadores para
mantener la continuidad al abrir una carrera desde el explorador.

Se reutilizan los tiempos de entrada de 850 ms y escalonado de 90 ms,
incorporados en el PR #151 y documentados en el ADR 0029.
El escalonado de tarjetas se limita a dos posiciones para evitar esperas
acumuladas en catálogos largos. Los controles conservan sus tiempos breves.
Las apariciones funcionan al desplazarse y tras actualizar los resultados.
El foco muestra el contenido inmediatamente y la reducción de movimiento
presenta todos los elementos. Sin JavaScript, el contenido permanece visible.

## Justificación

La navegación compartida mantiene la orientación. Las cabeceras y tarjetas
aplican los colores y las ilustraciones propias para prolongar la identidad
de la portada. El movimiento acompaña la lectura y las interacciones.

La navegación identifica la página activa con texto, negrita y `aria-current`,
sin depender solo del color. Las superficies separan identidad, indicadores y
fuentes para facilitar su lectura. Se reutilizan los colores y dibujos de marca
del ADR 0029; las referencias estéticas no son evidencia de accesibilidad.
El foco revela cada elemento inmediatamente y `prefers-reduced-motion` elimina
la espera. Se comprueban estas condiciones junto con el contraste, la anchura
móvil y el texto ampliado, conforme a WCAG 2.2 AA.

## Consecuencias

Un observador compartido registra las apariciones del portal, incluidas las
tarjetas que se insertan al filtrar. Se verifica navegación, teclado, ausencia
de JavaScript, ambos temas, movimiento reducido y anchura móvil. Las consultas
y los catálogos mantienen sus contratos.

## Verificación

- Compilación directa de Next, lint y comprobación de tipos.
- Pares de contraste comprobados por el generador de tokens.
- La ejecución de las pruebas se registra en el PR de integración, una vez
  incorporadas sus dependencias, con sus resultados y fecha.
- Navegación entre páginas con identidad compartida y cierre del menú móvil.
- Apariciones repetidas, registro de tarjetas tras filtrar y foco inmediato.
- Reducción de movimiento y contenido completo sin JavaScript.
- Salto al contenido con teclado y JavaScript desactivado.
- Texto al 200 % y anchuras de 360, 375, 768 y 1280 px.
- Axe en las páginas interiores en ambos temas.

Las vistas de carreras, comparador y ficha se validan con la muestra existente
mediante un servicio local temporal. La conexión con Supabase real queda
pendiente de su configuración. La página de beneficios utiliza el catálogo
versionado del proyecto.
