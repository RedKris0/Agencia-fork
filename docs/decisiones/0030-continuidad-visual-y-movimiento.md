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

El token de entrada pasa de 500 a 850 ms y el escalonado de 60 a 90 ms.
El escalonado de tarjetas se limita a dos posiciones para evitar esperas
acumuladas en catálogos largos. Los controles conservan sus tiempos breves.
Las apariciones funcionan al desplazarse y tras actualizar los resultados.
El foco muestra el contenido inmediatamente y la reducción de movimiento
presenta todos los elementos. Sin JavaScript, el contenido permanece visible.

## Justificación

La navegación compartida mantiene la orientación. Las cabeceras y tarjetas
aplican los colores y las ilustraciones propias para prolongar la identidad
de la portada. El movimiento acompaña la lectura y las interacciones.

Se consultaron referencias de composición y movimiento publicadas en Awwwards.
La adaptación a AE-SE conserva sus fuentes locales, tokens y requisitos de
trazabilidad. Las observaciones visuales orientan la composición.

- [Andrew Reff, marzo de 2026](https://www.awwwards.com/sites/andrew-reff-product-designer).
- [Maximus, abril de 2025](https://www.awwwards.com/sites/maximus).
- [Lando Norris, noviembre de 2025](https://www.awwwards.com/sites/lando-norris).

## Consecuencias

Un observador compartido registra las apariciones del portal, incluidas las
tarjetas que se insertan al filtrar. Se verifica navegación, teclado, ausencia
de JavaScript, ambos temas, movimiento reducido y anchura móvil. Las consultas
y los catálogos mantienen sus contratos.

## Verificación

- Compilación directa de Next, lint y comprobación de tipos aprobados.
- 44 pares de contraste verificados por el generador de tokens.
- 189 pruebas de Node y 27 pruebas Playwright aprobadas con Edge.
- Navegación entre páginas con identidad compartida y cierre del menú móvil.
- Apariciones repetidas, registro de tarjetas tras filtrar y foco inmediato.
- Reducción de movimiento y contenido completo sin JavaScript.
- Salto al contenido comprobado con teclado y JavaScript desactivado.
- Texto al 200 % y anchuras de 360, 375, 768 y 1280 px sin desbordamiento.
- Axe sin infracciones detectadas en las páginas interiores en ambos temas.

Las vistas de carreras, comparador y ficha se validan con la muestra existente
mediante un servicio local temporal. La conexión con Supabase real queda
pendiente de su configuración. La página de beneficios utiliza el catálogo
versionado del proyecto.
