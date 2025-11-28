import api from './api.js';
import routes from '../../routes.js';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: routes.loginPath(),
        method: 'POST',
        data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: routes.signupPath(),
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useSignupMutation } = userApi;
