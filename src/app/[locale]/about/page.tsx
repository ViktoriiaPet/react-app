import { Suspense } from 'react';
import AboutPage from './aboutPage';

export default function AboutPageWrapper() {
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <AboutPage />
    </Suspense>
  );
}
