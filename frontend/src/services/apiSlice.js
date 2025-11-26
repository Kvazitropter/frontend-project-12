import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { io } from 'socket.io-client';
import routes from '../routes';
import { setActiveChannel } from './uiSlice';

export const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
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
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.channelsPath(),
        method: 'GET',
        headers: getAuthHeader(),
      }),
      async onCacheEntryAdded(
        _,
        {
          cacheDataLoaded, dispatch,
        },
      ) {
        const { data: channels } = await cacheDataLoaded;
        const generalChannel = channels.find(({ name }) => name === 'general') ?? channels[0];
        dispatch(setActiveChannel(generalChannel.id));
      },
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channelsPath(),
        method: 'POST',
        data: channel,
        headers: getAuthHeader(),
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: routes.channelPath(id),
        method: 'DELETE',
        headers: getAuthHeader(),
      }),
    }),
    getMessages: builder.query({
      query: () => ({
        url: routes.messagesPath(),
        method: 'GET',
        headers: getAuthHeader(),
      }),
      async onCacheEntryAdded(
        _,
        {
          updateCachedData, cacheDataLoaded, cacheEntryRemoved,
        },
      ) {
        const socket = io({
          auth: {
            token: JSON.parse(localStorage.getItem('user'))?.token,
          },
        });

        await cacheDataLoaded;
        socket.on('newMessage', (message) => {
          updateCachedData((draft) => {
            draft.push(message);
          });
        });

        await cacheEntryRemoved;
        socket.disconnect();
      },
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messagesPath(),
        method: 'POST',
        data: message,
        headers: getAuthHeader(),
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
} = api;
