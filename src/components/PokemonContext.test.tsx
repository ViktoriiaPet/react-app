import { PokemonProvider } from './PokemonContext';
import PokemonContext from './PokemonContext';
import { getData } from '../servicios/getPokeList';
import type { PokemonShort } from './PokemonContext';

import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('../servicios/getPokeList', () => ({
  getData: vi.fn(),
  setCachedPokemonList: vi.fn(),
}));

const mockData = {
  results: [
    { name: 'pikachu', url: 'url1' },
    { name: 'bulbasaur', url: 'url2' },
  ],
};

describe('PokemonProvider', () => {
  it('fetches and sets allPokemon data', async () => {
    (getData as jest.Mock).mockResolvedValue(mockData);

    let contextValue: {
      allPokemon: PokemonShort[] | null;
      setAllPokemon: (data: PokemonShort[]) => void;
    } = {
      allPokemon: null,
      setAllPokemon: () => {},
    };

    render(
      <PokemonProvider>
        <PokemonContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </PokemonContext.Consumer>
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(contextValue.allPokemon).toEqual(mockData.results);
    });

    expect(getData).toHaveBeenCalledWith(0, 1300);
  });
});
