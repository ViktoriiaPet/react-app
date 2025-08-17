import { PokemonProvider } from './PokemonContext';
import PokemonContext from './PokemonContext';
import { render, waitFor } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import * as service from '../servicios/getDetailPokemon';

const mockData = {
  results: [
    { name: 'pikachu', url: 'url1' },
    { name: 'bulbasaur', url: 'url2' },
  ],
};

vi.mock('../servicios/getDetailPokemon');

describe('PokemonProvider', () => {
  it('fetches and sets allPokemon data', async () => {
    (service.useGetAllPokemonListQuery as Mock).mockReturnValue({
      data: mockData,
      isSuccess: true,
      isLoading: false,
      error: undefined,
    });

    let contextValue: {
      allPokemon: typeof mockData.results | null;
    } = { allPokemon: null };

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
  });
});
