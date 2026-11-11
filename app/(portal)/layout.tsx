import type { ReactNode } from 'react';
import Link from 'next/link';
import { Apariciones } from '@/app/_componentes/Apariciones';

import estilos from '@/app/_componentes/componentes.module.css';

// Pie común de las páginas del portal. Solo enlaces que existen: Privacidad y
// Contacto se agregan cuando estén revisados (AGENTS.md 2.2 y 2.4).
export default function LayoutPortal({ children }: { children: ReactNode }) {
  return (
    <>
      <Apariciones />
      {children}
      <footer className={estilos.pie}>
        <p>Datos oficiales de Mineduc (SIES y Datos Abiertos) y DEMRE. Cada dato muestra su fuente y su fecha de consulta.</p>
        <nav aria-label="Secciones del portal">
          <ul className={estilos.navegacion}>
            <li><Link className={estilos.enlace} href="/carreras">Explorar carreras</Link></li>
            <li><Link className={estilos.enlace} href="/comparador">Comparar carreras</Link></li>
            <li><Link className={estilos.enlace} href="/beneficios">Beneficios y plazos</Link></li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
