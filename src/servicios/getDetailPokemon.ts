import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { PokemonDetail } from '../pages/MasterScreen';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonByName: build.query<PokemonDetail, string>({
      query: (name:string) => `pokemon/${name}`,
    }),
    getPokemonList: build.query< { 
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: { name: string; url: string }[] 
  }, 
    { offset: number; limit: number }>({
    query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
}),
  }),
})

export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi

