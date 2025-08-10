import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { vi, describe, it, beforeEach } from 'vitest';
import * as pokemonApi from '../servicios/getDetailPokemon';

vi.mock('../servicios/getDetailPokemon', async () => {
  const actual = await vi.importActual('../servicios/getDetailPokemon');
  return {
    ...(actual as object),
    useGetPokemonByNameQuery: vi.fn(),
  };
});

function PokemonComponent({ name }: { name: string }) {
  const { data, error, isLoading } = pokemonApi.useGetPokemonByNameQuery(name);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return <div>Pokemon name: {data.name}</div>;
}

describe('PokemonComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    (pokemonApi.useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: false,
      isSuccess: false,
      isError: false,
      refetch: () => {},
    });

    render(
      <Provider store={store}>
        <PokemonComponent name="pikachu" />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (pokemonApi.useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { status: 500, data: 'Error' },
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: true,
      refetch: () => {},
    });

    render(
      <Provider store={store}>
        <PokemonComponent name="pikachu" />
      </Provider>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders data state', () => {
    (pokemonApi.useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: { name: 'pikachu' },
      error: undefined,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: () => {},
    });

    render(
      <Provider store={store}>
        <PokemonComponent name="pikachu" />
      </Provider>
    );

    expect(screen.getByText('Pokemon name: pikachu')).toBeInTheDocument();
  });
});
