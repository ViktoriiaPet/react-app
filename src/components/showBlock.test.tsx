import { render, screen } from '@testing-library/react';
import { ShowScreen } from './ShowBlock';

describe('ShowScreen', () => {
  it('renders placeholder when result is null', () => {
    render(<ShowScreen result={null} />);
    expect(screen.getByText(/Will show here/i)).toBeInTheDocument();
  });

  it('renders Pokémon data when result is provided', () => {
    const mockResult = {
      name: 'Pikachu',
      id: 25,
      weight: 60,
      sprites: {
        front_default: 'https://pokeapi.co/pikachu.png',
      },
    };

    render(<ShowScreen result={mockResult} />);

    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/ID: 25/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 60/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockResult.sprites.front_default
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Pikachu');
  });
});
