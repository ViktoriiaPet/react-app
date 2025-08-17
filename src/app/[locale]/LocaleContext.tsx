'use client';
import { createContext, useContext, ReactNode } from 'react';

type Locale = 'en' | 'es';

const LocaleContext = createContext<Locale>('en');

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children, locale }: { children: ReactNode; locale: Locale }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);
