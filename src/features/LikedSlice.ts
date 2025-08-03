import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

const initialState: number[] = [];

export const likedSliceOnly = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.includes(id)) {
        return state.filter((item) => item !== id);
      } else {
        return [...state, id];
      }
    },
    getAllLikedPokemons: (state) => {
      console.log(state);
    },
    deleteAllLikedPokemons: () => {
      return initialState;
    },
  },
});

export const { toggleLike, getAllLikedPokemons, deleteAllLikedPokemons } =
  likedSliceOnly.actions;
export default likedSliceOnly.reducer;

export const selectLikedIds = (state: RootState) => state.liked;
