import { configureStore } from '@reduxjs/toolkit';
import { likedSliceOnly } from '../features/LikedSlice';

export const store = configureStore({
  reducer: {
    cards: likedSliceOnly.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
