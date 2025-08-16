'use client';
import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../servicios/useLocalStorage';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '../servicios/getDetailPokemon';
import { useGetAllPokemonListQuery } from '../servicios/getDetailPokemon';
import { useGetPokemonListQuery } from '../servicios/getDetailPokemon';
import { resetPokemonCacheCompletely } from '../servicios/downloadedSelected';
import { deleteAllLikedPokemons } from '../features/LikedSlice';

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
  const [query, setQuery] = useState(() => {
    if (typeof window === 'undefined') return '';
    const stored = getItem();
    return stored || '';
  });

  const dispatch = useDispatch();

  const {
    data: allPokemonList,
    refetch: refetchAll,
    isError: allPokemonError,
    isError: isAllPokemonError,
    isLoading,
  } = useGetAllPokemonListQuery(undefined);
  const {
    refetch: refetchPaginated,
    error: paginatedError,
    isError: isPaginatedError,
  } = useGetPokemonListQuery({
    offset: 0,
    limit: 20,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setItem(query.trim());
      if (!allPokemonList) return;

      const filtered = allPokemonList.results.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      onResult({
        count: filtered.length,
        results: filtered.slice(0, 20),
        next: null,
        previous: null,
      });
    },
    [query, allPokemonList, onResult]
  );
  const hadleResetCache = async () => {
    dispatch(pokemonApi.util.resetApiState());
    resetPokemonCacheCompletely();
    dispatch(deleteAllLikedPokemons());
    refetchAll();
    refetchPaginated();
  };

  useEffect(() => {
    if (allPokemonList) {
      onResult({
        count: allPokemonList.results.length,
        results: allPokemonList.results.slice(0, 20),
        next: null,
        previous: null,
      });
    }
  }, [allPokemonList]);

  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <div className="load">Loading...</div>}
      <input
        placeholder="Please, enter..."
        value={query}
        onChange={handleChange}
      ></input>
      <button type="submit" className="button">
        Search!
      </button>
      <button className="button" onClick={hadleResetCache}>
        Reset Cache
      </button>
      {isAllPokemonError && (
        <div className="error-message">
          Error loading all pokemons: {JSON.stringify(allPokemonError)}
        </div>
      )}
      {isPaginatedError && (
        <div className="error-message">
          Error loading paginated: {JSON.stringify(paginatedError)}
        </div>
      )}
    </form>
  );
}
