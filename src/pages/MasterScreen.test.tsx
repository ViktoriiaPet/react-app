import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MasterPage } from '../app/[locale]/search/[name]/MasterScreen';
import type { PokemonDetail } from '../app/[locale]/search/[name]/MasterScreen';
import * as service from '../servicios/getDetailPokemon';
import { vi } from 'vitest';

type QueryResult = ReturnType<typeof service.useGetPokemonByNameQuery>;

const mockPokemon: PokemonDetail = {
  name: 'pikachu',
  id: 25,
  weight: 60,
  height: 4,
  sprites: { front_default: 'pikachu.png' },
};

describe('MasterPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state', () => {
    const loadingMock: QueryResult = {
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
      isFetching: true,
      isSuccess: false,
      error: undefined,
      status: 'pending',
    } as QueryResult;

    vi.spyOn(service, 'useGetPokemonByNameQuery').mockReturnValue(loadingMock);

    render(
      <MemoryRouter initialEntries={['/react-app/pikachu']}>
        <Routes>
          <Route path="/react-app/:name" element={<MasterPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows pokemon data after loading', () => {
    const successMock: QueryResult = {
      data: mockPokemon,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
      isSuccess: true,
      error: undefined,
      status: 'fulfilled',
    } as QueryResult;

    vi.spyOn(service, 'useGetPokemonByNameQuery').mockReturnValue(successMock);

    render(
      <MemoryRouter initialEntries={['/react-app/pikachu']}>
        <Routes>
          <Route path="/react-app/:name" element={<MasterPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Name:/i)).toHaveTextContent('Name: pikachu');
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText(/Height:/i)).toHaveTextContent('Height: 4');
    expect(screen.getByText(/Weight:/i)).toHaveTextContent('Weight: 60');
  });

  it('shows error message on error', () => {
    const errorMock: QueryResult = {
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
      isFetching: false,
      isSuccess: false,
      error: { status: 500, data: 'error' },
      status: 'rejected',
    } as QueryResult;

    vi.spyOn(service, 'useGetPokemonByNameQuery').mockReturnValue(errorMock);

    render(
      <MemoryRouter initialEntries={['/react-app/pikachu']}>
        <Routes>
          <Route path="/react-app/:name" element={<MasterPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/error loading selected pokemons/i)
    ).toBeInTheDocument();
  });

  it('shows "No data found" if no data and no error', () => {
    const noDataMock: QueryResult = {
      data: undefined,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
      isSuccess: false,
      error: undefined,
      status: 'fulfilled',
    } as QueryResult;

    vi.spyOn(service, 'useGetPokemonByNameQuery').mockReturnValue(noDataMock);

    render(
      <MemoryRouter initialEntries={['/react-app/pikachu']}>
        <Routes>
          <Route path="/react-app/:name" element={<MasterPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });
});
