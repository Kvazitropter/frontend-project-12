import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeChannelId: null,
    activeModal: null,
    clickedChannelId: null,
  },
  reducers: {
    setActiveChannel: (state, action) => ({
      ...state,
      activeChannelId: action.payload,
    }),
    setActiveModal: (state, action) => ({
      ...state,
      activeModal: action.payload,
    }),
    setClickedChannel: (state, action) => ({
      ...state,
      clickedChannelId: action.payload,
    }),
  },
});

export const { setActiveChannel, setActiveModal, setClickedChannel } = uiSlice.actions;
export default uiSlice.reducer;
