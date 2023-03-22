import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface SearchResults {
  results: [],
  loading: boolean,
  error: null,
  searchTerm: string,
  displayCount: number,
  header:string
}


export const fetchSearchResults = createAsyncThunk(
  "SearchResults/fetchSearchResults",
  async (searchTerm: string) => {
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${(searchTerm)}`
      );
      return response.data.results;
    } catch (error) {
  }
});

const searchResultsSlice = createSlice({
  name: 'SearchList',
  initialState: {
  results: [],
  loading: false,
  error: '',
  searchTerm: '',
  //displayCount: 10,
  //header:''
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.results = [];
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      })
  },
  reducers: {}
});

export default searchResultsSlice.reducer;