import { useParams } from 'react-router-dom';

export function MasterPage() {
  const { name } = useParams();
  return (
    <div>
      <h2>Pokemon detail screen</h2>
      <div>
        <p>Name:{name}</p>
        <p>Photo</p>
        <p>age</p>
      </div>
    </div>
  );
}
