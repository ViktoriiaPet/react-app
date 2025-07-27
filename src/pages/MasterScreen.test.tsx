import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MasterPage } from './MasterScreen';
import * as getDetailPokemonModule from '../servicios/getDetailPokemon';
import { vi } from 'vitest';

const mockPokemon = {
  name: 'pikachu',
  id: 25,
  weight: 60,
  height: 4,
  sprites: {
    front_default: 'pikachu.png',
  },
};

describe('MasterPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading and then pokemon data', async () => {
    vi.spyOn(getDetailPokemonModule, 'getDetailPokemon').mockResolvedValue(
      mockPokemon
    );

    render(
      <MemoryRouter initialEntries={['/react-app/pikachu']}>
        <Routes>
          <Route path="/react-app/:name" element={<MasterPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(getDetailPokemonModule.getDetailPokemon).toHaveBeenCalledWith(
        'pikachu'
      )
    );

    expect(screen.getByText(/Name:/i)).toHaveTextContent('Name: pikachu');
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText(/Height:/i)).toHaveTextContent('Height: 4');
    expect(screen.getByText(/Weight:/i)).toHaveTextContent('Weight: 60');
  });

  it('shows "No data found" if no pokemon data', async () => {
    vi.spyOn(getDetailPokemonModule, 'getDetailPokemon').mockResolvedValue(
      null
    );

    render(
      <MemoryRouter initialEntries={['/react-app/unknownpokemon']}>
        <Routes>
          <Route path="/react-app/:name" element={<MasterPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(getDetailPokemonModule.getDetailPokemon).toHaveBeenCalled()
    );

    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });
});
