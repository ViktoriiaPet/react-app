import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { store } from './app-hook/store';
import { Provider } from 'react-redux';

describe('App routing and layout', () => {
  it('renders Home and About buttons', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/react-app/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    screen.debug();

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /switch to dark|light mode/i })
    ).toBeInTheDocument();
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
