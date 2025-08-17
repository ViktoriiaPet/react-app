'use client';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../messages/en.json';
import es from '../../messages/es.json';

export interface LocaleLayoutProps {
  children: ReactNode;
  locale: string;
}
type Locale = 'en' | 'es';
const allMessages: Record<Locale, Record<string, string>> = { en, es };

export default function LocaleLayout({ children, locale }: LocaleLayoutProps) {
  const lang = locale === 'es' ? 'es' : 'en';
  const messages = allMessages[lang] || allMessages['en'];

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <div style={{ minHeight: '100vh', overflowY: 'auto' }}>{children}</div>
    </NextIntlClientProvider>
  );
}
