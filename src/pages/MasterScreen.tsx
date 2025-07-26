import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailPokemon } from '../servicios/getDetailPokemon';

interface PokemonDetail {
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
  const [isLoad, setIsLoad] = useState(false)
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  useEffect(() => {
      const fetchInitialData = async () => {
        if (!name) return;
        setIsLoad(true);
        try {
          const data = await getDetailPokemon(name);
          setPokemon(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoad(false);
        }
      };
      
      fetchInitialData();
    }, [name]);
    console.log(pokemon)
  return (
    <div>
      <h2>Pokemon detail screen</h2>
      {isLoad && <p>Loading...</p>}

      {!isLoad && pokemon && (
      <div>
        <p>Name:  {name}</p>
        <div>
        <p>Photo: </p>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          />
        </div>
        <p>Height:   {pokemon.height}</p>
        <p>Weight:   {pokemon.weight}</p>
      </div>
       )}
        {!isLoad && !pokemon && <p>No data found</p>}
    </div>
  );
}
