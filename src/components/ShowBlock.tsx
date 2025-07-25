
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
export function ShowScreen ({result}:ShowScreenProps) {
  console.log('ShowScreen result:', result);

  const isPokemonData = (res: ResultType): res is PokemonData => {
  return res !== null && 'sprites' in res;
};

  const isListResponse = (res: ResultType): res is PokeListResponse => {
  return res !== null && 'results' in res && Array.isArray(res.results);
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

    if (isPokemonData(result)) {
    return (
      <div className="granPantalla">
        <h2>Your results</h2>
        <div className="showPantalla">
          <h3>{result.name}</h3>
          <img src={result.sprites.front_default} alt={result.name} />
          <p>ID: {result.id}</p>
          <p>Weight: {result.weight}</p>
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
            {result.results.map((pokemon, index) => (
              <li key={index}>
                <div id={pokemon.name}>
                <strong>{pokemon.name}</strong> — <a href={pokemon.url}>link</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
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
