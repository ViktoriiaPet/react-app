import { configureStore } from '@reduxjs/toolkit';
import { likedSliceOnly } from '../features/LikedSlice';
import { pokemonApi } from '../servicios/getDetailPokemon';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    liked: likedSliceOnly.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
