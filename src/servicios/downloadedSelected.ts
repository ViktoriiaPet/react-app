import { createAsyncThunk } from '@reduxjs/toolkit';
import { pokemonApi } from './getDetailPokemon';
import type { PokemonData } from '../components/ShowBlock';

export const downloadSelectedPokemons = createAsyncThunk(
  'liked/downloadSelectedPokemons',
  async (ids: number[], { dispatch }) => {
    const results: PokemonData[] = [];

    for (const id of ids) {
      const result = await dispatch(
        pokemonApi.endpoints.getPokemonByName.initiate(id.toString())
      );

      if ('data' in result && result.data) {
        results.push(result.data as PokemonData);
      }
    }
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pokemons: results }),
    });

    if (!res.ok) throw new Error('Error with CSV in the server');

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `pokemons_${results.length}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return results;
  }
);

export const resetPokemonCacheCompletely = createAsyncThunk(
  'pokemon/resetCache',
  async (_, { dispatch }) => {
    dispatch(pokemonApi.util.invalidateTags(['Pokemon']));
    dispatch(pokemonApi.util.resetApiState());
  }
);
