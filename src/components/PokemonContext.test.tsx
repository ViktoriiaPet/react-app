import { PokemonProvider } from "./PokemonContext";
import PokemonContext from "./PokemonContext";
import { getData } from '../servicios/getPokeList';

import { render, waitFor } from '@testing-library/react';
import { vi } from "vitest";

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

    let contextValue: any;

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
