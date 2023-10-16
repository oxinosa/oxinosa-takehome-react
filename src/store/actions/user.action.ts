import {createAsyncThunk} from "@reduxjs/toolkit";
import {setLoading} from "../reducers/ui.reducer";
import {fetchChatStreamsByUserId} from "./chatstream.action";
import {ApiUrl} from "../../utilities/constants";

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      // TODO: API string in constants file
      const response = await fetch(`${ApiUrl}user/${userId}`)
      // Inferred return type: Promise<MyData>
      const data = await response.json();
      thunkAPI.dispatch(fetchChatStreamsByUserId(data.id));
      return data;
    } catch (e) {
      // TODO: Error management
      console.error(e);
    } finally {
      thunkAPI.dispatch(setLoading(false))
    }
  });