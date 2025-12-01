import { io } from 'socket.io-client';
import api from './api.js';
import routes from '../../routes.js';

const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: routes.messagesPath(),
        method: 'GET',
      }),
      async onCacheEntryAdded(
        _,
        {
          updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState,
        },
      ) {
        const state = getState();
        const socket = io({
          auth: {
            token: state.auth.token,
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
      providesTags: (result) => result?.map(({ channelId }) => ({ type: 'Channel', id: channelId })),
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messagesPath(),
        method: 'POST',
        data: message,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
