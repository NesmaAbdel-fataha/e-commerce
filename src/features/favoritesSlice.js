//1-
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;

      const exists = state.items.find((m) => m.id === movie.id);

      if (exists) {
        state.items = state.items.filter((m) => m.id !== movie.id);
      } else {
        state.items.push(movie);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;