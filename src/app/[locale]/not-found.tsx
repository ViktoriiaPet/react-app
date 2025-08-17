'use client';
import { useLocale } from './LocaleContext';

export default function NotFound() {
  const locale = useLocale();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '4vw',
        alignItems: 'center',
      }}
    >
      <h1>404</h1>
      <p>{locale === 'es' ? 'La pagina no existe' : 'Page is not found'}</p>
    </div>
  );
}
