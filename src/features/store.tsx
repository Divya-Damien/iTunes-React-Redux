import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from './searchResultsSlice';

const store = configureStore({
  reducer: searchResultsReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


