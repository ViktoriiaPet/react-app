import { getData } from './getPokeList';
import { vi } from 'vitest';

interface MockFetchResponse {
  ok: boolean;
  status?: number;
  json: () => Promise<unknown>;
}

describe('getData', () => {
  const mockData = { name: 'pikachu', id: 25 };

  beforeEach(() => {
    localStorage.setItem('words', 'pikachu');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('returns valid data when fetch succeeds', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const result = await getData();

    expect(result).toEqual(mockData);
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu/'
    );
  });

  it('logs error when fetch response is not ok', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockFetch: () => Promise<MockFetchResponse> = () =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      });

    vi.stubGlobal('fetch', mockFetch);

    const result = await getData();
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith('Response status: 404');
  });

  it('handles thrown error from fetch', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.stubGlobal('fetch', () => {
      throw new Error('Network failure');
    });

    const result = await getData();
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith('Network failure');
  });
});
