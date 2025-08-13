import '../../index.css';
import SearchPage from '../../pages/Searching';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <SearchPage />;
}
