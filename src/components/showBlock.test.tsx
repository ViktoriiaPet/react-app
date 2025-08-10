import { render, screen, waitFor } from '@testing-library/react';
import { ShowScreen } from './ShowBlock';
import { vi } from 'vitest';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { toggleLike } from '../features/LikedSlice';
import userEvent from '@testing-library/user-event';

import * as pokemonApi from '../servicios/getDetailPokemon';

vi.mock('../servicios/getDetailPokemon', async () => {
  const actual = await vi.importActual('../servicios/getDetailPokemon');
  return {
    ...(actual as object),
    useGetPokemonBatchQuery: vi.fn(),
  };
});

beforeEach(() => {
  (pokemonApi.useGetPokemonBatchQuery as jest.Mock).mockImplementation(
    (options) => {
      if (options?.skip) {
        return {
          data: undefined,
          isLoading: false,
          isError: false,
          refetch: () => {},
        };
      }
      return {
        data: undefined,
        isLoading: false,
        isError: false,
        refetch: () => {},
      };
    }
  );
});

describe('ShowScreen', () => {
  afterEach(() => {
    vi.clearAllMocks();
    store.dispatch({ type: 'liked/deleteAllLikedPokemons' });
  });

  it('renders fallback when result is null', () => {
    render(
      <Provider store={store}>
        <ShowScreen result={null} />
      </Provider>
    );
    expect(screen.getByText(/will show here/i)).toBeInTheDocument();
  });

  it('renders list of Pokémon when result is PokeListResponse', async () => {
    const fakeList = {
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    };

    const fakeDetails = [
      {
        id: 1,
        name: 'bulbasaur',
        weight: 69,
        sprites: {
          front_default: 'bulba.png',
        },
      },
    ];

    (pokemonApi.useGetPokemonBatchQuery as jest.Mock).mockReturnValue({
      data: fakeDetails,
      isLoading: false,
      isError: false,
      refetch: () => {},
    });

    render(
      <Provider store={store}>
        <ShowScreen result={fakeList} />
      </Provider>
    );

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /bulbasaur/i })).toHaveAttribute(
        'src',
        'bulba.png'
      );
    });
  });

  it('renders loading state when fetching', () => {
    (pokemonApi.useGetPokemonBatchQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: () => {},
    });

    const fakeList = {
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    };

    render(
      <Provider store={store}>
        <ShowScreen result={fakeList} />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders "No data available" if result is not a list and not null', () => {
    const fakePokemon = {
      id: 25,
      name: 'pikachu',
      weight: 60,
      sprites: { front_default: 'pikachu.png' },
    };

    render(
      <Provider store={store}>
        <ShowScreen result={fakePokemon} />
      </Provider>
    );
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('logs id when unliking a pokemon', async () => {
    const fakeList = {
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    };

    const fakeDetails = [
      {
        id: 1,
        name: 'bulbasaur',
        weight: 69,
        sprites: {
          front_default: 'bulba.png',
        },
      },
    ];

    (pokemonApi.useGetPokemonBatchQuery as jest.Mock).mockReturnValue({
      data: fakeDetails,
      isLoading: false,
      isError: false,
      refetch: () => {},
    });

    store.dispatch(toggleLike(1));

    const consoleSpy = vi.spyOn(console, 'log');

    render(
      <Provider store={store}>
        <ShowScreen result={fakeList} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });

    const likeButton = screen.getByRole('img', { name: /like button/i });
    await userEvent.click(likeButton);

    expect(consoleSpy).toHaveBeenCalledWith(1);
  });
});
