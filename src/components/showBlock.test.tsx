import { render, screen, waitFor } from '@testing-library/react';
import { ShowScreen } from './ShowBlock';
import { vi } from 'vitest';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { toggleLike } from '../features/LikedSlice';

global.fetch = vi.fn();

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

    const fakeDetail = {
      id: 1,
      name: 'bulbasaur',
      weight: 69,
      sprites: {
        front_default: 'bulba.png',
      },
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(fakeDetail),
    });

    render(
      <Provider store={store}>
        <ShowScreen result={fakeList} />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /bulbasaur/i })).toHaveAttribute(
        'src',
        'bulba.png'
      );
    });
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

    const fakeDetail = {
      id: 1,
      name: 'bulbasaur',
      weight: 69,
      sprites: {
        front_default: 'bulba.png',
      },
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(fakeDetail),
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

    //  const likeButton = screen.getByRole('img', { name: /color/i });
    //  await userEvent.click(likeButton);

    expect(consoleSpy).toHaveBeenCalledWith(1);
  });
});
