import { useState, useEffect } from 'react';
interface PokemonData {
  name: string;
  id: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

interface PokemonShort {
  name: string;
  url: string;
}

interface PokeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonShort[];
}

type ResultType = PokemonData | PokeListResponse | null;

interface ShowScreenProps {
  result: ResultType;
}
export function ShowScreen({ result }: ShowScreenProps) {
  const [detailedList, setDetailedList] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);

  const isListResponse = (res: ResultType): res is PokeListResponse => {
    return res !== null && 'results' in res && Array.isArray(res.results);
  };

  useEffect(() => {
    if (isListResponse(result)) {
      setLoading(true);
      Promise.all(
        result.results.map(async (p) => {
          const res = await fetch(p.url);
          return (await res.json()) as PokemonData;
        })
      )
        .then((data) => {
          setDetailedList(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [result]);

  if (!result) {
    return (
      <div className="granPantalla">
        <h2>Your results</h2>
        <div className="showPantalla">
          <p>Will show here</p>
        </div>
      </div>
    );
  }

  if (isListResponse(result)) {
    return (
      <div className="granPantalla">
        <h2>Pokémon list</h2>
        <div className="showPantalla">
          <ul>
            {detailedList.map((pokemon) => (
              <li key={pokemon.id}>
                <div id={pokemon.name}>
                  <strong>{pokemon.name}</strong> —{' '}
                  {pokemon.sprites.front_default && (
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (loading) {
    return <p>Loading images...</p>;
  }

  return (
    <div className="granPantalla">
      <h2>Your results</h2>
      <div className="showPantalla">
        <p>No data available</p>
      </div>
    </div>
  );
}
