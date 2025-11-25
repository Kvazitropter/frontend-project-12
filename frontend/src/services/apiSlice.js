import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import routes from '../routes';
import { setActiveChannel } from './uiSlice';

export const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({
  url, method, data, params, headers,
}) => {
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
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

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  tagTypes: ['Channel', 'Message'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.channelsPath(),
        method: 'GET',
        headers: getAuthHeader(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: channels } = await queryFulfilled;
          const state = getState();
          if (state.ui.activeChannelId === null) {
            const activeChannel = channels.find(({ name }) => name === 'general') ?? channels[0];
            dispatch(setActiveChannel(activeChannel?.id || null));
          }
        } catch {}
      },
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channelsPath(),
        method: 'POST',
        data: channel,
        headers: getAuthHeader(),
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: routes.channelPath(id),
        method: 'DELETE',
        headers: getAuthHeader(),
      }),
      invalidatesTags: ['Channel', 'Message'],
    }),
    getMessages: builder.query({
      query: () => ({
        url: routes.messagesPath(),
        method: 'GET',
        headers: getAuthHeader(),
      }),
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messagesPath(),
        method: 'POST',
        data: message,
        headers: getAuthHeader(),
      }),
      invalidatesTags: ['Message'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: routes.messagePath(id),
        method: 'DELETE',
        headers: getAuthHeader(),
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = api;
