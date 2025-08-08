import type { PokemonShort } from '../components/PokemonContext';
import { pokemonApi } from './getDetailPokemon';
import { store } from '../app/store';

let cachedPokemonList: PokemonShort[] | null = null;

export function setCachedPokemonList(list: PokemonShort[]) {
  cachedPokemonList = list;
}

export async function getData(offset = 0, limit = 20) {
  const searchWord = localStorage.getItem('words')?.toLowerCase() || '';

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

  const result = await store.dispatch(
    pokemonApi.endpoints.getPokemonList.initiate(
      { offset, limit },
      { subscribe: false }
    )
  );

  if ('data' in result && result.data) {
    return {
      count: result.data.count,
      results: result.data.results,
      next: result.data.next ?? null,
      previous: result.data.previous ?? null,
    };
  } else {
    throw new Error('Ошибка при загрузке данных');
  }
}
