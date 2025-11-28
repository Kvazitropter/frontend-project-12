import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api.js';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeChannelId: null,
    activeModal: null,
    clickedChannelId: null,
  },
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload;
    },
    setActiveModal: (state, { payload }) => {
      state.activeModal = payload;
    },
    setClickedChannel: (state, { payload }) => {
      state.clickedChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getChannels.matchFulfilled,
        (state, { payload: channels }) => {
          if (state.activeChannelId === null) {
            const generalChannel = channels.find(({ name }) => name === 'general');
            state.activeChannelId = generalChannel.id;
          }
        },
      )
      .addMatcher(
        api.endpoints.addChannel.matchFulfilled,
        (state, { payload }) => {
          state.activeChannelId = payload.id;
        },
      )
      .addMatcher(
        api.endpoints.removeChannel.matchFulfilled,
        (state, { payload }) => {
          if (state.activeChannelId === payload.id) {
            state.activeChannelId = null;
          }
        },
      );
  },
});

export const { setActiveChannel, setActiveModal, setClickedChannel } = uiSlice.actions;
export default uiSlice.reducer;
