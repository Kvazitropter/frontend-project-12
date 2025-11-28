import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQueryWithAuth = ({ baseUrl } = { baseUrl: '' }) => async ({
  url, method, data, params, headers,
}, { getState }) => {
  const state = getState();
  const { token } = state.auth;

  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        ...headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

const api = createApi({
  baseQuery: axiosBaseQueryWithAuth({ baseUrl: '' }),
  endpoints: () => ({}),
});

export default api;
