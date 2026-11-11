export function Tren({ compacto = false }: { compacto?: boolean }) {
  return compacto ? (
    <svg viewBox="0 0 64 32" fill="none" aria-hidden="true">
      <path d="M3 4h39c9 0 17 9 19 20H3V4Z" fill="var(--color-accion)" stroke="var(--color-marca-fondo)" strokeWidth="2" />
      <path d="M9 9h10v8H9zm16 0h10v8H25zm17 0h3l9 8H42Z" fill="var(--color-marca-fondo)" />
      <path d="M6 25h52" stroke="var(--color-marca-texto)" strokeWidth="2" />
      <circle cx="15" cy="27" r="3" fill="var(--color-marca-texto)" /><circle cx="46" cy="27" r="3" fill="var(--color-marca-texto)" />
    </svg>
  ) : (
    <svg viewBox="0 0 640 440" fill="none" aria-hidden="true">
      <path d="M-50 405 299 65h402M-20 440 330 99h371" stroke="var(--color-marca-fondo)" strokeWidth="10" />
      <path d="m56 381 31 31m17-77 31 31m18-78 31 31m19-80 31 31m18-80 31 31m18-79 31 31m18-80 31 31M340 62v39m52-39v39m52-39v39m52-39v39m52-39v39m52-39v39" stroke="var(--color-marca-fondo)" strokeWidth="5" />
      <path d="m104 300 65 53h318l69-60-70-48H169l-65 55Z" fill="var(--color-marca-fondo)" />
      <path d="M101 179 167 126h294c35 0 66 48 83 91l-57 62H101V179Z" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="7" strokeLinejoin="round" />
      <path d="m101 179 66-53v155l-66 55V179Z" fill="var(--color-marca-linea)" stroke="var(--color-marca-fondo)" strokeWidth="7" strokeLinejoin="round" />
      <path d="M167 281h320l57-64v63l-57 61H167v-60Z" fill="var(--color-accion)" stroke="var(--color-marca-fondo)" strokeWidth="7" strokeLinejoin="round" />
      <path d="M187 162h54v67h-54zm72 0h54v67h-54zm72 0h54v67h-54z" fill="var(--color-marca-fondo)" />
      <path d="M409 162h41c23 0 41 27 52 55l-32 23h-61v-78Z" fill="var(--color-marca-fondo)" />
      <path d="m117 191 32-27v65l-32 27v-65Z" fill="var(--color-marca-fondo)" />
      <path d="M187 254h199M437 266h30" stroke="var(--color-marca-fondo)" strokeWidth="6" />
      <path d="m101 280 66 1v60l-66-18v-43Z" fill="var(--color-accion)" stroke="var(--color-marca-fondo)" strokeWidth="7" />
      <circle cx="223" cy="340" r="20" fill="var(--color-marca-fondo)" /><circle cx="429" cy="340" r="20" fill="var(--color-marca-fondo)" />
      <circle cx="223" cy="340" r="8" fill="var(--color-marca-linea)" /><circle cx="429" cy="340" r="8" fill="var(--color-marca-linea)" />
      <path d="M54 67h114m-57-36v72M540 363h58m-29-29v58" stroke="var(--color-marca-fondo)" strokeWidth="4" />
      <circle cx="299" cy="81" r="19" fill="var(--color-accion)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
      <circle cx="80" cy="401" r="17" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
    </svg>
  );
}

export function ComparacionIlustrada() {
  return <svg viewBox="0 0 640 440" fill="none" aria-hidden="true">
    <path d="M-20 370h174c52 0 63-192 128-192h95c65 0 79-110 140-110h150" stroke="var(--color-marca-linea)" strokeWidth="18" />
    <path d="M-20 396h168c85 0 89-70 152-70h144c65 0 78-127 141-127h80" stroke="var(--color-accion)" strokeWidth="10" />
    <path d="m130 89 182-28 38 247-182 28-38-247Z" fill="var(--color-marca-fondo)" />
    <path d="m138 78 182-28 38 247-182 28-38-247Z" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
    <path d="m176 116 103-16m-98 49 103-16m-98 50 103-16m-98 50 103-16m-98 50 63-10" stroke="var(--color-marca-fondo)" strokeWidth="10" />
    <path d="m330 114 181 29-39 246-181-29 39-246Z" fill="var(--color-marca-linea)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
    <path d="m357 159 102 16m-107 18 102 16m-107 18 102 16m-107 18 102 16m-107 18 65 10" stroke="var(--color-marca-fondo)" strokeWidth="10" />
    <circle cx="93" cy="370" r="17" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
    <circle cx="563" cy="199" r="17" fill="var(--color-accion)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
  </svg>;
}

export function CalendarioIlustrado() {
  return <svg viewBox="0 0 640 440" fill="none" aria-hidden="true">
    <path d="M-20 372h213c83 0 105-292 202-292h265" stroke="var(--color-marca-fondo)" strokeWidth="10" />
    <path d="m190 80 281 35-32 271-281-35 32-271Z" fill="var(--color-marca-fondo)" />
    <path d="m173 69 281 35-32 271-281-35 32-271Z" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="7" />
    <path d="m173 69 281 35-8 72-281-35 8-72Z" fill="var(--color-marca-linea)" stroke="var(--color-marca-fondo)" strokeWidth="7" />
    <path d="m227 49-8 61m156-42-8 61" stroke="var(--color-marca-fondo)" strokeWidth="14" strokeLinecap="round" />
    <path d="m200 189 35 4m28 4 35 4m28 4 35 4m28 4 18 2m-213 26 35 4m28 4 35 4m28 4 35 4m28 4 18 2m-213 26 35 4m28 4 35 4" stroke="var(--color-marca-fondo)" strokeWidth="14" />
    <circle cx="412" cy="319" r="58" fill="var(--color-marca-fondo)" stroke="var(--color-accion)" strokeWidth="9" />
    <path d="m389 318 17 18 30-37" stroke="var(--color-marca-texto)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="93" cy="372" r="17" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
  </svg>;
}

export function FuentesIlustradas() {
  return <svg viewBox="0 0 640 440" fill="none" aria-hidden="true">
    <path d="M20 375h139c83 0 98-280 187-280h300" stroke="var(--color-marca-linea)" strokeWidth="14" />
    <path d="m211 93 244 35-35 260-244-35 35-260Z" fill="var(--color-marca-linea)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
    <path d="m178 63 244 35-35 260-244-35 35-260Z" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
    <path d="m214 116 156 22m-163 22 156 22m-163 22 91 13m-98 31 74 10" stroke="var(--color-marca-fondo)" strokeWidth="10" />
    <circle cx="408" cy="288" r="74" fill="var(--color-accion)" stroke="var(--color-marca-fondo)" strokeWidth="7" />
    <path d="m388 295 34-32a18 18 0 0 1 25 26l-16 15m-20-23-33 33a18 18 0 0 1-25-26l16-16" stroke="var(--color-marca-fondo)" strokeWidth="10" strokeLinecap="round" />
    <circle cx="95" cy="375" r="17" fill="var(--color-marca-texto)" stroke="var(--color-marca-fondo)" strokeWidth="6" />
  </svg>;
}
