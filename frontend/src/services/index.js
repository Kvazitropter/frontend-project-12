import { configureStore } from '@reduxjs/toolkit';
import { api } from './apiSlice.js';
import uiReducer from './uiSlice.js';
import middlewares from '../middlewares/index.js';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, middlewares),
});
