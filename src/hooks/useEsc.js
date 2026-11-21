import { useEffect } from 'react';

// Fecha menus e diálogos com a tecla Esc
export default function useEsc(fn) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') fn(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [fn]);
}
