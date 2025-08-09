import { createAsyncThunk } from '@reduxjs/toolkit';
import { pokemonApi } from './getDetailPokemon';
import type { PokemonData } from '../components/ShowBlock';

export const DownoladedSelectedPokemons = createAsyncThunk(
  'liked/downloadSelectedPokemons',
  async (ids: number[], { dispatch }) => {
    const results: PokemonData[] = [];

    for (const id of ids) {
      const result = await dispatch(
        pokemonApi.endpoints.getPokemonByName.initiate(id.toString())
      );

      if ('data' in result && result.data) {
        results.push(result.data as PokemonData);
      } else {
        console.error(`Ошибка загрузки покемона с id ${id}`);
      }
    }

    const csv = generateCSV(results);
    downloadCSV(csv, results.length);
    return results;
  }
);

function downloadCSV(csvContent: string, count: number) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const filename = `${count}__items.csv`;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function generateCSV(data: PokemonData[]) {
  if (data.length === 0) return '';

  const headers = ['id', 'name', 'weight', 'sprite'];

  const rows = data.map((pokemon) => {
    const { id, name, weight, sprites } = pokemon;
    const spriteUrl = sprites.front_default || '';

    return [
      id.toString(),
      `"${name.replace(/"/g, '""')}"`,
      weight.toString(),
      `"${spriteUrl.replace(/"/g, '""')}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

export const resetPokemonCacheCompletely = createAsyncThunk(
  'pokemon/resetCache',
  async (_, { dispatch }) => {
    dispatch(pokemonApi.util.invalidateTags(['Pokemon']));
    dispatch(pokemonApi.util.resetApiState());
  }
);
