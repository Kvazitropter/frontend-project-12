import api from './api.js';
import routes from '../../routes.js';

const channelsApi = api.injectEndpoints({
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.channelsPath(),
        method: 'GET',
      }),
      providesTags: (result) => result?.map(({ id }) => ({ type: 'Channel', id })),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channelsPath(),
        method: 'POST',
        data: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    updateChannel: builder.mutation({
      query: ({ id, data }) => ({
        url: routes.channelPath(id),
        method: 'PATCH',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Channel', id }],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: routes.channelPath(id),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Channel', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
