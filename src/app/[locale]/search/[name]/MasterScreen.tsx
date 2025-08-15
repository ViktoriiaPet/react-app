'use client';
import { useGetPokemonByNameQuery } from '../../../../servicios/getDetailPokemon';

export interface PokemonDetail {
  name: string;
  id: number;
  weight: number;
  height: number;
  sprites: { front_default: string };
}

export function MasterPage({ name }: { name: string }) {
  const { data, isError, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) return <div className="load">Loading...</div>;
  if (isError)
    return <div className="error-message">Error loading pokemon</div>;
  if (!data) return <p>No data found</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Pokemon detail</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Name: {data.name}</p>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
    </div>
  );
}
