import { DownoladedSelectedPokemons } from './downloadedSelected';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
import * as api from './getDetailPokemon';
import type { PokemonData } from '../components/ShowBlock';

vi.mock('./getDetailPokemon');

describe('DownoladedSelectedPokemons thunk', () => {
  const mockData: PokemonData = {
    id: 25,
    name: 'pikachu',
    weight: 60,
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
  };

  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock'),
      revokeObjectURL: vi.fn(),
    });

    vi.stubGlobal('Blob', vi.fn());

    vi.spyOn(document, 'createElement').mockImplementation(() => {
      return {
        setAttribute: vi.fn(),
        click: vi.fn(),
        href: '',
      } as unknown as HTMLAnchorElement;
    });

    vi.spyOn(document.body, 'appendChild').mockImplementation((child) => child);
    vi.spyOn(document.body, 'removeChild').mockImplementation((child) => child);
  });

  it('downloads and returns data', async () => {
    const mockedGetDetail = vi.mocked(api.getDetailPokemon);
    mockedGetDetail.mockResolvedValue(mockData);

    const thunk = DownoladedSelectedPokemons([25]);

    const dispatch = vi.fn();
    const getState = vi.fn();

    const action = await thunk(dispatch, getState, undefined);

    expect(action.payload).toEqual([mockData]);
    expect(mockedGetDetail).toHaveBeenCalledWith('25');
  });
});
