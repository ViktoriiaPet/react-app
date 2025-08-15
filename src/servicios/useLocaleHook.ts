'use client';
import { useSearchParams } from 'next/navigation';

export function useLocaleLink() {
  const searchParams = useSearchParams();

  function link(path: string, locale = 'en') {
    const params = searchParams?.toString();
    return `/${locale}${path}${params ? '?' + params : ''}`;
  }

  return { link };
}
