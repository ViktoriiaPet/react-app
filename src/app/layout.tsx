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
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '/en';
  const pathParts = pathname.split('/');
  const locale = pathParts[1] === 'es' ? 'es' : 'en'; 
  return (
    <html>
      <body>
        <Provider store={store}>
          <PokemonProvider>
            <ThemeProvider>
              <ErrorBoundary>
                <header
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100vw',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding: '2vw',
                    backgroundColor: 'gray',
                  }}
                >
                  <Link href={`/${locale}/search?page=1`} className="button">
                    Home
                  </Link>
                  <Link href={`/${locale}/about`} className="button">
                    About
                  </Link>
                  <HeaderLangSwitcher />
                  <ThemeButton />
                </header>
                {children}
                <footer
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100vw',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding: '2vw',
                    backgroundColor: 'gray',
                  }}
                >
                  <div>Rolling Scopes School</div>
                  <Link href="https://rs.school/courses/reactjs">
                    <button className="button">Link to the course</button>
                  </Link>
                </footer>
              </ErrorBoundary>
            </ThemeProvider>
          </PokemonProvider>
        </Provider>
      </body>
    </html>
  );
}
