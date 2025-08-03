import { getData } from '../servicios/getPokeList';
import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../servicios/useLocalStorage';

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

export interface SearchingBlockProps {
  onResult: (data: ResultType) => void;
}

export function SearchingBlock({ onResult }: SearchingBlockProps) {
  const { setItem, getItem } = useLocalStorage('words');
  const [query, setQuery] = useState(() => getItem() || '');
  const [, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setItem(query.trim());

      try {
        const data = await getData();
        if (data) onResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [query, onResult]
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await getData();
        if (data) onResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Please, enter..."
        value={query}
        onChange={handleChange}
      ></input>
      <button type="submit" className="button">
        Search!
      </button>
    </form>
  );
}
