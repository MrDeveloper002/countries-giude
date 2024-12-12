import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './Features/countrySlice';

const store = configureStore({
   reducer: {
      country: countryReducer,
   },
});

export default store;
