'use client';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../messages/en.json';
import es from '../../messages/es.json';

export interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}
type Locale = 'en' | 'es';
const allMessages: Record<Locale, Record<string, string>> = { en, es };

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = (params.locale === 'es' ? 'es' : 'en') as Locale;
  const messages = allMessages[locale] || allMessages['en'];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div style={{ minHeight: '100vh', overflowY: 'auto' }}>{children}</div>
    </NextIntlClientProvider>
  );
}
