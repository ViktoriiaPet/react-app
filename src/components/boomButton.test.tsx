import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Boom from Boom button', () => {
  it('Boom from Boom button', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(<App />);
    const boomButton = screen.getByRole('button', { name: /BoomButton/i });
    expect(boomButton).toBeInTheDocument();
    await userEvent.click(boomButton);

    const errorMessage = await screen.findByText(/Anything was wrong/i);
    expect(errorMessage).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });
});
