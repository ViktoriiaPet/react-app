import type { PokemonShort } from '../[locale]/search/page';

export async function getPokemons(offset = 0, limit = 20) {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemons: ${response.status}`);
  }
  const json = await response.json();
  return json as {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonShort[];
  };
}
