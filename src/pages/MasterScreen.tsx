import { useParams } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../servicios/getDetailPokemon';

export interface PokemonDetail {
  name: string;
  id: number;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
}

export function MasterPage() {
  const { name } = useParams();

  const { data, isError, isLoading } = useGetPokemonByNameQuery(`${name}`);

  console.log(data);
  return (
    <div>
      <h2>Pokemon detail screen</h2>
      {isLoading && <div className="load">Loading...</div>}
      {!isLoading && data && (
        <div>
          <p>Name: {name}</p>
          <div>
            <p>Photo: </p>
            <img src={data.sprites.front_default} alt={data.name} />
          </div>
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
        </div>
      )}
      {isError && (
        <div className="error-message">Error loading selected pokemons</div>
      )}
      {!isLoading && !data && <p>No data found</p>}
    </div>
  );
}
