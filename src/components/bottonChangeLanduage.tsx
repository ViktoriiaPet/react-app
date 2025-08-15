'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { locales } from '../features/locales';

export const HeaderLangSwitcher = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeLocale = (newLocale: string) => {
    const parts = pathname!.split('/');
    if (!locales.some((l) => l.code === parts[1])) {
      parts.splice(1, 0, newLocale);
    } else {
      parts[1] = newLocale;
    }
    const href = `${parts.join('/')}?${searchParams?.toString()}`;
    router.push(href);
  };

  return (
    <footer>
      {locales.map((l) => (
        <button key={l.code} onClick={() => handleChangeLocale(l.code)}>
          {l.label}
        </button>
      ))}
    </footer>
  );
};
