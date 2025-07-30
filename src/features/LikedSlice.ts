import { createSlice } from '@reduxjs/toolkit';

export const likedSliceOnly = createSlice({
  name: 'like',
  initialState: {
    isLiked: false,
  },
  reducers: {
    addLikeToCard: (state) => {
      state.isLiked = false;
    },
    deleteLikeFromCard: (state) => {
      state.isLiked = true;
    },
    getAllLikedPokemons: (state) => {
      console.log(state);
    },
    deleteAllLikedPokemons: (state) => {
      console.log(state);
    },
  },
});

export const {
  addLikeToCard,
  deleteLikeFromCard,
  getAllLikedPokemons,
  deleteAllLikedPokemons,
} = likedSliceOnly.actions;
export default likedSliceOnly.reducer;
