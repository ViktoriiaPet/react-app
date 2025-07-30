import { useState, useEffect } from 'react';
import lleno from '../assets/corazon-lleno.png'
import vacio from '../assets/corazón-vacío.png'

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

interface ShowScreenProps {
  result: ResultType;
  onPokemonClick?: (name: string) => void;
}

type ResultType = PokemonData | PokeListResponse | null;

export function ShowScreen({ result, onPokemonClick }: ShowScreenProps) {
  const [detailedList, setDetailedList] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

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

  const handleClickCard = ()=> {
    if (liked == true) {
      setLiked(false)
    } else {
      setLiked(true)
    }
    
  }

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
        <div className="showPantalla">
          <h2>Pokémon list</h2>
          <ul 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2vw'
          }}>
            {loading && <p>Loading...</p>}

            {detailedList.map((pokemon) => (
              <li
                key={pokemon.id}
                style={{ cursor: 'pointer',
                  width: '12vw',
                  height: '13vw'
                 }}
                onClick={() => onPokemonClick?.(pokemon.name)}
              >
                <div id={pokemon.name}>
                  <strong>{pokemon.name}</strong> —{' '}
                  {pokemon.sprites.front_default && (
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                    />
                  )}
                </div>
                <div
                onClick={(handleClickCard)}>

                {
                  liked == false ? (
                  <img src={`${lleno}`}
                  style={{
                    width: '2vw',
                    height: '2vw'
                  }}/>
                  ) : (
                  <img src={`${vacio}`}
                  style={{
                    width: '2vw',
                    height: '2vw'
                  }}/>
                  )
                }
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
