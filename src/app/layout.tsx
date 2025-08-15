'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../app-hook/store';
import { PokemonProvider } from '../components/PokemonContext';
import { ThemeProvider } from '../providers/Theme';
import { ThemeButton } from '../components/ButtonsTheme';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Link from 'next/link';
import '../index.css';
import { HeaderLangSwitcher } from '../components/bottonChangeLanduage';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PokemonProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <header>
              <Link href="/" className="button">
                Home
              </Link>
              <Link href="/about" className="button">
                About
              </Link>
              <HeaderLangSwitcher />
              <ThemeButton />
            </header>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </PokemonProvider>
    </Provider>
  );
}
