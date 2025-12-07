import { configureStore } from '@reduxjs/toolkit'
import api from './api/api.js'
import uiReducer from './slices/uiSlice.js'
import authReducer from './slices/authSlice.js'
import middlewares from '../middlewares/index.js'

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware, middlewares),
})
