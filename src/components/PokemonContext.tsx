import { createContext, useState } from "react";
import type { ReactNode } from 'react';

export interface PokemonShort {
  name: string;
  url: string;
}

interface Props {
  children: ReactNode;
}

const PokemonContext = createContext<{
  allPokemon: PokemonShort[] | null;
  setAllPokemon: (data: PokemonShort[]) => void;
}>({
  allPokemon: null,
  setAllPokemon: () => {},
});

export const PokemonProvider = ({ children }: Props) => {
  const [allPokemon, setAllPokemon] = useState<PokemonShort[] | null>(null);
  return (
    <PokemonContext.Provider value={{ allPokemon, setAllPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

