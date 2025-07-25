import { useState } from 'react';
import { SearchingBlock } from '../components/SearchBlock';
import { ShowScreen } from '../components/ShowBlock';


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

export default function SearchPage () {

const [result, setResult] = useState<ResultType>(null);

 const handleResult = (data: ResultType) => {
    setResult(data);
  };

    return (
      <>
        <h1>Welcome to the Main &apos;Pokemon&apos; page!</h1>
        <h3>
          You can try to enter names of pokemons (for exapmle &quot;ditto&quot;,
          &quot;raichu&quot;, &quot;pikachu&quot;)
        </h3>
        <SearchingBlock onResult={handleResult} />
        <ShowScreen result={result} />
      </>
    );
}
