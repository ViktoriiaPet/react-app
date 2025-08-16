'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { locales } from '../features/locales';

export const HeaderLangSwitcher = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1];
  const availableLocales = locales.map((l) => l.code);

  const currentIndex = availableLocales.indexOf(
    currentLocale || locales[0].code
  );

  const nextLocale =
    availableLocales[(currentIndex + 1) % availableLocales.length];

  const handleChangeLocale = () => {
    if (!pathname) return;
    const parts = pathname.split('/');
    if (!availableLocales.includes(parts[1])) {
      parts.splice(1, 0, nextLocale);
    } else {
      parts[1] = nextLocale;
    }
    const href = `${parts.join('/')}?${searchParams?.toString()}`;
    router.push(href);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1vw',
      }}
    >
      <button onClick={handleChangeLocale}>
        {locales.find((l) => l.code === nextLocale)?.label}
      </button>
    </div>
  );
};
