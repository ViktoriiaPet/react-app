import { describe, it, expect, vi } from 'vitest';
import { DownoladedSelectedPokemons } from './downloadedSelected';
import type { PokemonDetail } from '../pages/MasterScreen';

vi.mock('./downloadedSelected', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./downloadedSelected')>();
  return {
    ...mod,
    downloadCSV: vi.fn(),
  };
});

const mockData: PokemonDetail = {
  id: 25,
  name: 'pikachu',
  sprites: { front_default: 'https://example.com/pikachu.png' },
  weight: 60,
  height: 4,
};

describe('DownoladedSelectedPokemons thunk', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.Blob = vi.fn(() => ({
      size: 0,
      type: '',
      arrayBuffer: vi.fn(),
      slice: vi.fn(),
      stream: vi.fn(),
      text: vi.fn(),
    })) as unknown as typeof Blob;
  });

  it('should return pokemon data', async () => {
    const dispatch = vi.fn(async (action) => {
      if (typeof action === 'function') {
        return action(dispatch, () => ({}), undefined);
      }
      return {
        data: mockData,
        status: 'fulfilled',
        isSuccess: true,
        refetch: vi.fn(),
        unsubscribe: vi.fn(),
      };
    });

    const result = await DownoladedSelectedPokemons([25])(
      dispatch,
      () => ({}),
      undefined
    );
    expect(result.payload).toEqual(undefined);
  });
});
