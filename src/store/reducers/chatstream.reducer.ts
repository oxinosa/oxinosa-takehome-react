import {createSlice} from "@reduxjs/toolkit";
import {fetchChatStreamsByUserId} from "../actions/chatstream.action";
import {ChatStreamItem, ChatStreamSchema, chatStreamState} from "../interfaces/chatstream.interface";

const initialState: chatStreamState = {
  chatStreams: [],
  loading: false
} as chatStreamState;

const chatStreamSlice = createSlice({
  name: 'chatStream',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChatStreamsByUserId.pending, (state: chatStreamState, action) => {
      state.loading = true;
      state.chatStreams = [];
    })
    builder.addCase(fetchChatStreamsByUserId.fulfilled, (state: chatStreamState, {payload}) => {
      if (payload !== undefined) {
        payload.items.forEach((item: ChatStreamItem) => {
          state.chatStreams.push({
            dataSource: item.data_source_ids,
            createdAt: item.created_at,
            id: item.id,
            updatedAt: item.updated_at,
            userId: item.user_id,
            name: item.name
          })
        })
      }
      state.loading = false;
    })
    builder.addCase(fetchChatStreamsByUserId.rejected, (state) => {
      // THIS IS HOW WE CAN MANAGE ERRORS
      // TODO:
    })
  }
})

export default chatStreamSlice.reducer;