import type { PokemonShort } from '../components/PokemonContext';
import { useLocalStorage } from './useLocalStorage';

let cachedPokemonList: PokemonShort[] | null = null;

export function setCachedPokemonList(list: PokemonShort[]) {
  cachedPokemonList = list;
}

export async function getData(offset = 0, limit = 20) {
  const {getItem} = useLocalStorage('words')
  const searchWord = getItem()?.toLowerCase() || '';

  if (searchWord && cachedPokemonList) {
    const filtered = cachedPokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchWord)
    );

    const paginated = filtered.slice(offset, offset + limit);

    return {
      count: filtered.length,
      next: null,
      previous: null,
      results: paginated,
    };
  }

  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }
  }
}
