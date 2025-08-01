import { ErrorBoundary } from './components/ErrorBoundary.js';
import { AboutPage } from './pages/About.js';
import { Route, Routes, Link } from 'react-router-dom';

import SearchPage from './pages/Searching.js';
import { MasterPage } from './pages/MasterScreen.js';
import { NotFoundPage } from './pages/ErrorPage.js';
import { ThemeProvider } from './providers/Theme.js';
import { ThemeButton } from './components/ButtonsTheme.js';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <ThemeProvider>
          <header>
            <Link to="/react-app/">
              <button className="button">Home</button>
            </Link>
            <Link to="/react-app/about">
              <button className="button">About</button>
            </Link>
            <ThemeButton />
          </header>
          <Routes>
            <Route path="/react-app/" element={<SearchPage />}>
              <Route path=":name" element={<MasterPage />} />
            </Route>
            <Route path="/react-app/*" element={<NotFoundPage />} />
            <Route path="/react-app/about" element={<AboutPage />} />
          </Routes>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
