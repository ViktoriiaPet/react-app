import { createContext } from 'react';
import type { ReactNode } from 'react';
import { useGetAllPokemonListQuery } from '../servicios/getDetailPokemon';

export interface PokemonShort {
  name: string;
  url: string;
}

interface Props {
  children: ReactNode;
}

const PokemonContext = createContext<{
  allPokemon: PokemonShort[] | null;
}>({
  allPokemon: null,
});

export const PokemonProvider = ({ children }: Props) => {
  const { data, isSuccess } = useGetAllPokemonListQuery(undefined);

  const allPokemon = isSuccess ? data?.results || null : null;

  return (
    <PokemonContext.Provider value={{ allPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
