import AboutPage from '../app/[locale]/about/aboutPage';
import { render, screen } from '@testing-library/react';

describe('AboutPage', () => {
  it('renders author info and course link button', () => {
    render(<AboutPage />);

    expect(screen.getByText(/about the author/i)).toBeInTheDocument();
    expect(screen.getByText(/my name is viktoriia/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /link to the course/i });
    expect(button).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
