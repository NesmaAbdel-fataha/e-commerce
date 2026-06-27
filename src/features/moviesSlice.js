import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "6fc779c72e732f9345e260221e111d10";

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async ({ language = "en-US" } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${encodeURIComponent(
          language
        )}`
      );
      return data.results || [];
    } catch {
      return rejectWithValue("Failed to fetch movies");
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async ({ id, language = "en-US" }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${encodeURIComponent(
          language
        )}`
      );
      return data;
    } catch {
      return rejectWithValue("Failed to fetch movie");
    }
  }
);


const initialState = {
  list: [],
  details: null,
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieDetails: (state) => {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearMovieDetails } = moviesSlice.actions;
export default moviesSlice.reducer;

