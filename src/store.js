import { configureStore } from "@reduxjs/toolkit"; //1-create store , adding middelware
import favoritesReducer from "./features/favoritesSlice";
import moviesReducer from "./features/moviesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
});
