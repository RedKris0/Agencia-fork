'use client';

import { useEffect, useState, type ReactNode } from 'react';
import estilos from './Explorador.module.css';

export function CargaExplorador({ children }: { children: ReactNode }) {
  const [cargando, establecerCargando] = useState(false);

  useEffect(() => {
    // Al volver con el historial, el navegador puede restaurar la página que estaba esperando.
    const restaurar = () => establecerCargando(false);
    window.addEventListener('pageshow', restaurar);
    return () => window.removeEventListener('pageshow', restaurar);
  }, []);

  return (
    <div className={estilos.contenido} data-cargando={cargando || undefined} onSubmit={() => establecerCargando(true)}>
      {children}
      <p role="status" className={estilos.estadoCarga}>{cargando ? 'Buscando carreras…' : ''}</p>
      <div hidden={!cargando} aria-hidden="true" className={estilos.carga}>
        {[0, 1, 2].map((indice) => (
          <div className={estilos.tarjeta} key={indice}>
            <div className={estilos.identidad}>
              <span className={`${estilos.esqueleto} ${estilos.esqueletoTitulo}`} />
              <span className={estilos.esqueleto} /><span className={estilos.esqueleto} />
            </div>
            <div className={estilos.datos}>
              {[0, 1].map((dato) => (
                <div className={estilos.dato} key={dato}>
                  <span className={estilos.esqueleto} />
                  <span className={`${estilos.esqueleto} ${estilos.esqueletoCifra}`} />
                  <div className={estilos.esqueletoTexto}>
                    <span className={estilos.esqueleto} /><span className={estilos.esqueleto} /><span className={estilos.esqueleto} />
                  </div>
                </div>
              ))}
            </div>
            <div className={estilos.enlace}><span className={estilos.esqueleto} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
