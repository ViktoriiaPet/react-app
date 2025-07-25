import { ErrorBoundary } from './components/ErrorBoundary.js';
import { AboutPage } from './pages/About.js';
import { Route, Routes, Link } from 'react-router-dom';

import SearchPage from './pages/Searching.js';
import { MasterPage } from './pages/MasterScreen.js';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <header>
          <Link to="/react-app/">
            <button>Home</button>
          </Link>
          <Link to="/react-app/about">
            <button>About</button>
          </Link>
        </header>
        <Routes>
          <Route path="/react-app/" element={<SearchPage />} />
          <Route path="/react-app/about" element={<AboutPage />} />
          <Route path="/react-app/masterPage/:name" element={<MasterPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
