import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing and layout', () => {
  it('renders Home and About buttons', () => {
    render(
      <MemoryRouter initialEntries={['/react-app/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/react-app/unknown-route/unknown-route']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/is not exist/i)).toBeInTheDocument();
  });
});
