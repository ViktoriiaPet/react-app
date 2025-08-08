import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { PokemonDetail } from '../pages/MasterScreen';
import { useMemo } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonByName: build.query<PokemonDetail, string>({
      query: (name: string) => `pokemon/${name}`,
    }),
    getPokemonList: build.query<
      {
        count: number;
        next: string | null;
        previous: string | null;
        results: { name: string; url: string }[];
      },
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
    }),
    getAllPokemonList: build.query<
      { results: { name: string; url: string }[] },
      void
    >({
      query: () => `pokemon?offset=0&limit=1300`,
    }),
    getPokemonBatch: build.query<PokemonDetail[], string[]>({
      async queryFn(names, _api, _extraOptions, fetchWithBQ) {
        const results = await Promise.all(
          names.map((name) => fetchWithBQ(`pokemon/${name}`))
        );
        const errorResult = results.find((result) => result.error);
        if (errorResult) {
          return {
            error: errorResult.error as FetchBaseQueryError,
          };
        }
        return {
          data: results.map((result) => result.data as PokemonDetail),
        };
      },
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  useGetAllPokemonListQuery,
  useGetPokemonBatchQuery,
} = pokemonApi;

export const useGetPokemonDetails = (names: string[]) => {
  const results = names.map((name) => useGetPokemonByNameQuery(name));
  return useMemo(() => results.map((result) => result.data), [results]);
};
