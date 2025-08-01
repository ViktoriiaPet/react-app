import { useState, useEffect } from 'react';
import lleno from '../assets/corazon-lleno.png';
import vacio from '../assets/corazón-vacío.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectLikedIds } from '../features/LikedSlice';
import { toggleLike, deleteAllLikedPokemons } from '../features/LikedSlice';
import { DownoladedSelectedPokemons } from '../servicios/downloadedSelected';
import type { AppDispatch } from '../app/store';

export interface PokemonData {
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
  const selectPokemons = useSelector(selectLikedIds);
  const dispatch = useDispatch<AppDispatch>();

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

  const handleClickToLike = (id: number) => {
    if (selectPokemons.includes(id)) {
      dispatch(toggleLike(id));
      console.log(id);
    } else {
      dispatch(toggleLike(id));
    }
  };
  const handleDownload = () => {
    dispatch(DownoladedSelectedPokemons(selectPokemons));
  };
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
              gap: '2vw',
            }}
          >
            {loading && <p>Loading...</p>}

            {detailedList.map((pokemon) => (
              <li
                key={pokemon.id}
                style={{
                  cursor: 'pointer',
                  listStyleType: 'none',
                }}
                className="card"
              >
                <div
                  id={pokemon.name}
                  onClick={() => onPokemonClick?.(pokemon.name)}
                  style={{
                    border: 'black, dotted, 1px',
                    borderRadius: '16px',
                    padding: '1vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <strong>{pokemon.name}</strong>{' '}
                  {pokemon.sprites.front_default && (
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                    />
                  )}
                </div>
                <div onClick={() => handleClickToLike(pokemon.id)}>
                  {selectPokemons.includes(pokemon.id) ? (
                    <img
                      src={`${vacio}`}
                      className='color'
                    />
                  ) : (
                    <img
                      src={`${lleno}`}
                      className='color'
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {selectPokemons.length > 0 && (
          <div className="selectedBlock">
            <p>You already selected {selectPokemons.length} pokemons</p>
            <div style={{
              display: 'flex',
              gap: '1vw'
            }}>
              <button
                className="button"
                onClick={() => {
                  dispatch(deleteAllLikedPokemons());
                }}
              >
                Reject all pokemons
              </button>
              <button
                className="button"
                onClick={() => {
                  handleDownload();
                }}
              >
                Download selected pokemons
              </button>
            </div>
            <div></div>
          </div>
        )}
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
