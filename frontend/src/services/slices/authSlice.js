import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api.js';

// const getInitialState = () => {
//   try {
//     const existingUserData = JSON.parse(localStorage.getItem('user') ?? '{}');
//     if (existingUserData.token && existingUserData.username) {
//       return {
//         username: existingUserData.username,
//         token: existingUserData.token,
//       };
//     }
//   } catch {
//     console.error('Failed to parse user data from localStorage.');
//   }
//   return {
//     username: null,
//     token: null,
//   };
// };

const handleAuthSuccess = (_, { payload }) => {
  localStorage.setItem('user', JSON.stringify(payload));
  return {
    username: payload.username,
    token: payload.token,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null },
  reducers: {
    clearUserData: () => {
      localStorage.removeItem('user');
      return { username: null, token: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        handleAuthSuccess,
      )
      .addMatcher(
        api.endpoints.signup.matchFulfilled,
        handleAuthSuccess,
      );
  },
});

export const { clearUserData } = authSlice.actions;
export default authSlice.reducer;
