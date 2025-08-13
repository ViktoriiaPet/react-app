import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from './Searching';
import { vi, beforeEach, afterEach, describe, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../app-hook/store';
import { Provider } from 'react-redux';
import type { Mock } from 'vitest';
import {
  useGetPokemonListQuery,
  useGetAllPokemonListQuery,
} from '../servicios/getDetailPokemon';

vi.mock('../components/ShowBlock', () => ({
  ShowScreen: ({
    onPokemonClick,
  }: {
    onPokemonClick: (name: string) => void;
  }) => (
    <button onClick={() => onPokemonClick('bulbasaur')}>Click Pokemon</button>
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock('../servicios/getDetailPokemon', async () => {
  const actual: typeof import('../servicios/getDetailPokemon') =
    await vi.importActual('../servicios/getDetailPokemon');

  return {
    ...actual,
    useGetPokemonListQuery:
      vi.fn<
        (
          ...args: Parameters<typeof actual.useGetPokemonListQuery>
        ) => ReturnType<typeof actual.useGetPokemonListQuery>
      >(),

    useGetAllPokemonListQuery:
      vi.fn<
        (
          ...args: Parameters<typeof actual.useGetAllPokemonListQuery>
        ) => ReturnType<typeof actual.useGetAllPokemonListQuery>
      >(),
  };
});

const mockPageData = {
  count: 25,
  next: null,
  previous: null,
  results: [
    { name: 'pikachu', url: 'url_pikachu' },
    { name: 'bulbasaur', url: 'url_bulbasaur' },
    { name: 'charmander', url: 'url_charmander' },
    { name: 'wartortle', url: 'url_wartortle' },
    { name: 'squirtle', url: 'url_squirtle' },
    { name: 'charizard', url: 'url_charizard' },
    { name: 'venusaur', url: 'url_venusaur' },
    { name: 'metapod', url: 'url_metapod' },
    { name: 'blastoise', url: 'url_blastoise' },
    { name: 'caterpie', url: 'url_caterpie' },
    { name: 'metapod', url: 'url_metapod' },
    { name: 'weedle', url: 'url_weedle' },
    { name: 'beedrill', url: 'url_beedrill' },
    { name: 'pidgey', url: 'url_pidgey' },
    { name: 'raticate', url: 'url_raticate' },
    { name: 'pidgeotto', url: 'url_pidgeotto' },
    { name: 'rattata', url: 'url_rattata' },
    { name: 'jigglypuff', url: 'url_jigglypuff' },
    { name: 'wigglytuff', url: 'url_wigglytuff' },
    { name: 'ninetales', url: 'url_ninetales' },
  ],
};

const mockAllData = {
  results: [
    { name: 'pikachu', url: 'url_pikachu' },
    { name: 'bulbasaur', url: 'url_bulbasaur' },
    { name: 'charmander', url: 'url_charmander' },
    { name: 'wartortle', url: 'url_wartortle' },
    { name: 'squirtle', url: 'url_squirtle' },
    { name: 'charizard', url: 'url_charizard' },
    { name: 'venusaur', url: 'url_venusaur' },
    { name: 'metapod', url: 'url_metapod' },
    { name: 'blastoise', url: 'url_blastoise' },
    { name: 'caterpie', url: 'url_caterpie' },
    { name: 'metapod', url: 'url_metapod' },
    { name: 'weedle', url: 'url_weedle' },
    { name: 'beedrill', url: 'url_beedrill' },
    { name: 'pidgey', url: 'url_pidgey' },
    { name: 'raticate', url: 'url_raticate' },
    { name: 'pidgeotto', url: 'url_pidgeotto' },
    { name: 'rattata', url: 'url_rattata' },
    { name: 'jigglypuff', url: 'url_jigglypuff' },
    { name: 'wigglytuff', url: 'url_wigglytuff' },
    { name: 'ninetales', url: 'url_ninetales' },
  ],
};

describe('SearchPage', () => {
  beforeEach(() => {
    (useGetPokemonListQuery as Mock).mockReturnValue({
      data: mockPageData,
      isLoading: false,
      error: undefined,
    });

    (useGetAllPokemonListQuery as Mock).mockReturnValue({
      data: mockAllData,
      isLoading: false,
      error: undefined,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderPage = (initialRoute = '/react-app/?page=1') => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/react-app/*" element={<SearchPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render main page', async () => {
    renderPage();

    expect(
      screen.getByText("Welcome to the Main 'Pokemon' page!")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeDisabled();
    });
  });

  it('should navigate to next page', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Next')).toBeEnabled();
    });

    fireEvent.click(screen.getByText('Next'));
    expect(await screen.findByText(/Page 2/)).toBeInTheDocument();
  });

  it('should handle API errors', async () => {
    (useGetPokemonListQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Error' },
    });

    renderPage();

    expect(await screen.findByText(/Error/)).toBeInTheDocument();
  });
  it('should render error message for pageError from useGetPokemonListQuery', async () => {
    (useGetPokemonListQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Page Error' },
    });
    (useGetAllPokemonListQuery as Mock).mockReturnValue({
      data: mockAllData,
      isLoading: false,
      error: undefined,
    });

    renderPage();

    expect(
      await screen.findByText(/Error with getting page/i)
    ).toBeInTheDocument();
  });

  it('should render error message for allError from useGetAllPokemonListQuery', async () => {
    (useGetPokemonListQuery as Mock).mockReturnValue({
      data: mockPageData,
      isLoading: false,
      error: undefined,
    });
    (useGetAllPokemonListQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'All Pokemons Error' },
    });

    renderPage();

    expect(
      await screen.findByText(/Error loading all pokemons/i)
    ).toBeInTheDocument();
  });
});
