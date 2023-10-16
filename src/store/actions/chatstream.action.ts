import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {ChatStreamSchema, NewChatStream} from "../interfaces/chatstream.interface";
import {fetchDataSourcesByIds} from "./datasource.action";
import {ApiUrl} from "../../utilities/constants";

export const fetchChatStreamsByUserId = createAsyncThunk<ChatStreamSchema | undefined, string>(
  'chatStream/fetchChatStreamsByUserId',
  async (userId: string, ThunkAPI) => {
    const response = await fetch(`${ApiUrl}chat_stream?user_id=${userId}&skip=0&limit=100`);
    const data = (await response.json()) as ChatStreamSchema;
    const ids = data.items.map(d => d.id);
    ThunkAPI.dispatch(fetchDataSourcesByIds(ids));
    return data;
  }
)

export const createNewChatStream = createAsyncThunk(
  'chatStream/createNewChatStream',
  async (data: { dataSourceId: string, chatStreamName: string }, ThunkAPI) => {
    const state: RootState = ThunkAPI.getState() as RootState;
    const newChatStreamData: NewChatStream = {
      data_source_ids: [
        data.dataSourceId
      ],
      name: data.chatStreamName,
      user_id: state.user.id
    }
    await axios.post(`${ApiUrl}chat_stream`, newChatStreamData);
    await ThunkAPI.dispatch(fetchChatStreamsByUserId(newChatStreamData.user_id));
  }
)