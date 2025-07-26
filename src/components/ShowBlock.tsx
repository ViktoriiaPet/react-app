import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


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

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedName = searchParams.get('selected');

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);

  const isListResponse = (res: ResultType): res is PokeListResponse => {
    return res !== null && 'results' in res && Array.isArray(res.results);
  };

  useEffect(() => {
  if (selectedName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedName}`)
      .then(res => res.json())
      .then(data => setSelectedPokemon(data))
      .catch(() => setSelectedPokemon(null));
  } else {
    setSelectedPokemon(null);
  }
}, [selectedName]);

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

  const handleSelect = (name: string) => {
  searchParams.set('selected', name);
  setSearchParams(searchParams);
};

  const handleClose = () => {
  searchParams.delete('selected');
  setSearchParams(searchParams);
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
          <ul>
            {detailedList.map((pokemon) => (
              <li key={pokemon.id} onClick={() => handleSelect(pokemon.name)} style={{ cursor: 'pointer' }}>
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
          {selectedPokemon && (
    <div className="detailPanel" style={{ flex: 1, padding: '1rem', borderLeft: '1px solid #ccc' }}>
      <button onClick={handleClose} style={{ float: 'right' }}>✖</button>
      <h3>{selectedPokemon.name}</h3>
      <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
      <p>ID: {selectedPokemon.id}</p>
      <p>Weight: {selectedPokemon.weight}</p>
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
