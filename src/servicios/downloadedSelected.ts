import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDetailPokemon } from './getDetailPokemon';
import type { PokemonData } from '../components/ShowBlock';

export const DownoladedSelectedPokemons = createAsyncThunk(
  'liked/downloadSelectedPokemons',
  async (ids: number[]) => {
    const data = await Promise.all(
      ids.map((id) => getDetailPokemon(id.toString()))
    );
    const csv = generateCSV(data);
    downloadCSV(csv, ids.length);
    return data;
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
