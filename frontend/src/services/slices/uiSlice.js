import { createSlice } from '@reduxjs/toolkit'
import api from '../api/api.js'

const defaultChannelName = 'general'

const initModalInfo = {
  type: null,
  channelId: null,
  channelName: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeChannelId: null,
    modalInfo: initModalInfo,
  },
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload
    },
    setModalInfo: (state, { payload }) => {
      state.modalInfo = { ...state.modalInfo, ...payload }
    },
    clearModalInfo: (state) => {
      state.modalInfo = initModalInfo
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getChannels.matchFulfilled,
        (state, { payload: channels }) => {
          if (state.activeChannelId === null) {
            const generalChannel = channels.find(({ name }) => name === defaultChannelName)
            state.activeChannelId = generalChannel.id
          }
        },
      )
      .addMatcher(
        api.endpoints.addChannel.matchFulfilled,
        (state, { payload }) => {
          state.activeChannelId = payload.id
          state.modalInfo = initModalInfo
        },
      )
      .addMatcher(
        api.endpoints.updateChannel.matchFulfilled,
        (state) => {
          state.modalInfo = initModalInfo
        },
      )
      .addMatcher(
        api.endpoints.removeChannel.matchFulfilled,
        (state, { payload }) => {
          if (state.activeChannelId === payload.id) {
            state.activeChannelId = null
          }
          state.modalInfo = initModalInfo
        },
      )
  },
})

export const { setActiveChannel, setModalInfo, clearModalInfo } = uiSlice.actions
export default uiSlice.reducer
