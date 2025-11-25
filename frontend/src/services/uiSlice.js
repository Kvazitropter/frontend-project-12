import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeChannelId: null,
  },
  reducers: {
    setActiveChannel: (_, action) => ({ activeChannelId: action.payload }),
  },
});

export const { setActiveChannel } = uiSlice.actions;
export default uiSlice.reducer;
