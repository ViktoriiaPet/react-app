import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getData } from '../servicios/getPokeList';
import { setCachedPokemonList } from '../servicios/getPokeList';

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

  useEffect(() => {
    const loadData = async () => {
      const data = await getData(0, 1300);
      if (data?.results) {
        setAllPokemon(data.results);
        setCachedPokemonList(data.results);
        console.log('saved results', data.results);
      }
    };

    loadData();
  }, []);

  return (
    <PokemonContext.Provider value={{ allPokemon, setAllPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
