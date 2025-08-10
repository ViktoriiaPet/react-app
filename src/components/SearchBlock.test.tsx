import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchingBlock } from './SearchBlock';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../servicios/getDetailPokemon';
import * as service from '../servicios/getDetailPokemon';
import { useGetAllPokemonListQuery } from '../servicios/getDetailPokemon';

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

vi.mock('../servicios/useLocalStorage', () => ({
  useLocalStorage: () => ({
    setItem: vi.fn(),
    getItem: vi.fn(() => ''),
  }),
}));

vi.mock('../servicios/getDetailPokemon', async () => {
  const originalModule = await vi.importActual('../servicios/getDetailPokemon');
  return {
    ...originalModule,
    useGetAllPokemonListQuery: vi.fn(),
  };
});

describe('SearchingBlock', () => {
  const mockAllPokemonList = {
    results: [
      { name: 'pikachu', url: 'url' },
      { name: 'bulbasaur', url: 'url2' },
      { name: 'charmander', url: 'url3' },
    ],
  };

  beforeEach(() => {
    (useGetAllPokemonListQuery as Mock).mockReturnValue({
      data: mockAllPokemonList,
      isSuccess: true,
      isLoading: false,
      refetch: vi.fn(),
      isError: false,
      error: undefined,
    });
  });

  it('calls onResult with filtered data after search submit', async () => {
    const onResult = vi.fn();

    render(
      <Provider store={store}>
        <SearchingBlock onResult={onResult} />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/please, enter/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith({
        count: 1,
        results: [{ name: 'pikachu', url: 'url' }],
        next: null,
        previous: null,
      });
    });
  });

  it('handles errors correctly', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (service.useGetAllPokemonListQuery as Mock).mockReturnValue({
      data: undefined,
      isSuccess: false,
      isLoading: false,
      refetch: vi.fn(),
      isError: true,
      error: new Error('fetch failed'),
    });

    const onResult = vi.fn();

    render(
      <Provider store={store}>
        <SearchingBlock onResult={onResult} />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    expect(onResult).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
