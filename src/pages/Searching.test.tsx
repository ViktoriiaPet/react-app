import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from './Searching';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as getPokeListModule from '../servicios/getPokeList';

// Мокаем ShowScreen для теста handlePokemonClick
vi.mock('../components/ShowBlock', () => ({
  ShowScreen: ({ onPokemonClick }: any) => (
    <button onClick={() => onPokemonClick('pikachu')}>Click Pokemon</button>
  ),
}));

const mockData = {
  count: 25,
  next: null,
  previous: null,
  results: Array.from({ length: 20 }, (_, i) => ({
    name: `pokemon${i + 1}`,
    url: `url${i + 1}`,
  })),
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.spyOn(getPokeListModule, 'getData').mockResolvedValue(mockData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders and shows pagination buttons', async () => {
    render(
      <MemoryRouter initialEntries={['/react-app/?page=1']}>
        <Routes>
          <Route path="/react-app/*" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Welcome to the Main 'Pokemon' page!")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(getPokeListModule.getData).toHaveBeenCalledWith(0, 20);
    });

    expect(screen.getByText('Previous')).toBeDisabled();

    expect(screen.getByText('Next')).toBeEnabled();

    fireEvent.click(screen.getByText('Next'));
  });

  it('navigates to next page on button click', async () => {
    render(
      <MemoryRouter initialEntries={['/react-app/?page=1']}>
        <Routes>
          <Route path="/react-app/" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const nextBtn = await screen.findByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);

    expect(await screen.findByText(/Page 2/)).toBeInTheDocument();
  });

it('renders close detail page button and navigates back on click', async () => {
  render(
    <MemoryRouter initialEntries={['/react-app/pikachu?page=2']}>
      <Routes>
        <Route path="/react-app/:name" element={<SearchPage />} />
        <Route path="/react-app/" element={<SearchPage />} />
      </Routes>
    </MemoryRouter>
  );

  const closeButton = await screen.findByRole('button', { name: /close detail page/i });
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);

  // Проверяем, что теперь отображается контент главной страницы (без :name)
  expect(await screen.findByText("Welcome to the Main 'Pokemon' page!")).toBeInTheDocument();
});
});
