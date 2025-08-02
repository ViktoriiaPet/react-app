import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectLikedIds } from '../features/LikedSlice';
import { deleteAllLikedPokemons } from '../features/LikedSlice';

function TestComponent() {
  const dispatch = useAppDispatch();
  const liked = useAppSelector(selectLikedIds);
  return (
    <div>
      <span>Liked count: {liked.length}</span>
      <button onClick={() => dispatch(deleteAllLikedPokemons())}>
        Clear liked
      </button>
    </div>
  );
}

test('renders liked count and clears on button click', async () => {
  render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );

  expect(screen.getByText(/Liked count:/i)).toHaveTextContent('Liked count: 0');

  store.dispatch({ type: 'liked/toggleLike', payload: 1 });

  await waitFor(() => {
    expect(screen.getByText(/Liked count:/i)).toHaveTextContent(
      'Liked count: 1'
    );
  });

  fireEvent.click(screen.getByText(/clear liked/i));

  await waitFor(() => {
    expect(screen.getByText(/Liked count:/i)).toHaveTextContent(
      'Liked count: 0'
    );
  });
});
