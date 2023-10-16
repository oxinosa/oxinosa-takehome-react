import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {createNewChatStream} from "./chatstream.action";
import {createNewDataSourceData, DataSource, dataSourceByChatStreamId} from "../interfaces/datasource.interface";
import {ApiUrl} from "../../utilities/constants";

export const fetchDataSourcesByIds = createAsyncThunk(
  'dataSource/fetchDataSourcesByIds',
  async (chatStreamIds: Array<string>, ThunkAPI) => {
    for (const id of chatStreamIds) {
      await ThunkAPI.dispatch(fetchDataSourcesById(id));
    }
  }
)

export const fetchDataSourcesById = createAsyncThunk<dataSourceByChatStreamId | undefined, string>(
  'dataSource/fetchDataSourcesById',
  async (chatStreamId: string) => {
    try {
      // TODO: API string in constants file
      const response = await fetch(`${ApiUrl}data_source?chatstream_id=${chatStreamId}&skip=0&limit=100`);
      const data = (await response.json()) as Array<DataSource>;
      return {[chatStreamId]: data}
    } catch (e) {
      // TODO: Error management
    }
  }
)

export const createNewDataSource = createAsyncThunk(
  'dataSource/createNewDataSource',
  async (data: createNewDataSourceData, ThunkAPI) => {
    const response = await axios.post(`${ApiUrl}data_source`, {
      name: data.newDataSourceData.name,
      description: data.newDataSourceData.description,
      uri: data.newDataSourceData.uri,
      type: data.newDataSourceData.type
    })
    await ThunkAPI.dispatch(createNewChatStream({
      dataSourceId: response.data.id,
      chatStreamName: data.chatStreamName
    }));
  }
)