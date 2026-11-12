"""Genera diseno/tokens.css desde diseno/tokens.json y verifica contraste WCAG 2.2.

Uso:  python3 scripts/tokens.py           (genera y verifica)
      python3 scripts/tokens.py --check   (solo verifica; falla si algo no cumple)

Por qué existe: cada color del sistema debe cumplir un contraste mínimo
(WCAG 2.2: 4,5:1 texto normal, 3:1 componentes de interfaz). Verificarlo a mano
es fácil de olvidar; este script lo hace en cada cambio y en la integración continua.
"""
import json
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "diseno" / "tokens.json"
SALIDA = RAIZ / "diseno" / "tokens.css"


def luminancia(hexa: str) -> float:
    # Fórmula de luminancia relativa definida por WCAG 2.2.
    h = hexa.lstrip("#")
    canales = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in canales]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def contraste(a: str, b: str) -> float:
    claro, oscuro = sorted((luminancia(a), luminancia(b)), reverse=True)
    return (claro + 0.05) / (oscuro + 0.05)


def verificar(t: dict) -> list[str]:
    fallas = []
    for modo, colores in t["color"].items():
        for primero, segundo, minimo in t["contraste_requerido"]:
            valor = contraste(colores[primero], colores[segundo])
            estado = "ok " if valor >= minimo else "FALLA"
            print(f"[{estado}] {modo:6} {primero:24} sobre {segundo:12} {valor:5.2f}:1 (mínimo {minimo})")
            if valor < minimo:
                fallas.append(f"{modo}: {primero}/{segundo} = {valor:.2f}")
    return fallas


def generar_css(t: dict) -> str:
    def bloque(colores: dict) -> str:
        return "\n".join(f"  --color-{k}: {v};" for k, v in colores.items())

    tipo, esp, forma, mov = t["tipografia"], t["espacio"], t["forma"], t["movimiento"]
    otros = [f"  --fuente-texto: {tipo['familia-texto']};",
             f"  --fuente-cifras: {tipo['familia-cifras']};",
             f"  --interlineado: {tipo['interlineado-texto']};",
             f"  --interlineado-titulos: {tipo['interlineado-titulos']};",
             f"  --medida: {tipo['medida-maxima']};",
             f"  --medida-comparativa: {tipo['medida-comparativa']};"]
    otros += [f"  --texto-{k.replace('-', 'm')}: {v};" for k, v in tipo["pasos"].items()]
    otros += [f"  --espacio-{k}: {v};" for k, v in esp.items()]
    otros += [f"  --{k}: {v};" for k, v in forma.items()]
    otros += [f"  --mov-{k}: {v};" for k, v in mov.items()]
    claro, oscuro = bloque(t["color"]["claro"]), bloque(t["color"]["oscuro"])
    duraciones = [k for k in mov if k != "curva"]
    anulaciones = " ".join(f"--mov-{k}: 0ms;" for k in duraciones)
    bloque_reducido = (
        "@media (prefers-reduced-motion: reduce) {\n"
        f"  :root {{ {anulaciones} }}\n"
        "}\n"
    )
    return (
        "/* ARCHIVO GENERADO por scripts/tokens.py desde diseno/tokens.json. No editar a mano. */\n"
        f":root {{\n{claro}\n" + "\n".join(otros) + "\n  color-scheme: light dark;\n}\n\n"
        "@media (prefers-color-scheme: dark) {\n  :root:not([data-tema=\"claro\"]) {\n"
        + "\n".join("  " + linea for linea in oscuro.splitlines()) + "\n  }\n}\n\n"
        f":root[data-tema=\"oscuro\"] {{\n{oscuro}\n}}\n\n"
        + bloque_reducido
    )


def main() -> int:
    tokens = json.loads(FUENTE.read_text(encoding="utf-8"))
    fallas = verificar(tokens)
    if fallas:
        print("\nContraste insuficiente:\n- " + "\n- ".join(fallas))
        return 1
    if "--check" not in sys.argv:
        SALIDA.write_text(generar_css(tokens), encoding="utf-8")
        print(f"\nGenerado {SALIDA.relative_to(RAIZ)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
