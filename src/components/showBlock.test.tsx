import { render, screen, waitFor } from '@testing-library/react';
import { ShowScreen } from './ShowBlock';
import { vi } from 'vitest';

global.fetch = vi.fn();

describe('ShowScreen', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders fallback when result is null', () => {
    render(<ShowScreen result={null} />);
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

    render(<ShowScreen result={fakeList} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'bulba.png');
    });
  });

  it('renders "No data available" if result is not a list and not null', () => {
    const fakePokemon = {
      id: 25,
      name: 'pikachu',
      weight: 60,
      sprites: { front_default: 'pikachu.png' },
    };

    render(<ShowScreen result={fakePokemon} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });
});
