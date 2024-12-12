import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';

const BASE_URL = 'https://restcountries.com/v3.1/all';

export const fetchCountries = createAsyncThunk(
   'country/fetchCountries',
   async function () {
      try {
         const res = await axios.get(`${BASE_URL}`);
         return res.data;
      } catch (err) {
         throw new Error(<ErrorMessage error={err} />);
      }
   },
);

const initialState = {
   darkMode: false,
   data: [],
   searchValue: '',
   filterValue: 1,
   status: 'idle',
   error: null,
};

const countrySlice = createSlice({
   name: 'country',
   initialState,
   reducers: {
      switchDarkMode(state) {
         state.darkMode = !state.darkMode;
      },
      searchValueCountry(state, action) {
         state.filterValue = 1;
         state.searchValue = action.payload;
      },
      filterValueByRegion(state, action) {
         state.searchValue = '';
         state.filterValue = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchCountries.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchCountries.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
            state.error = null;
         })
         .addCase(fetchCountries.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export const { switchDarkMode, searchValueCountry, filterValueByRegion } =
   countrySlice.actions;
export default countrySlice.reducer;
