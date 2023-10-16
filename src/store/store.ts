import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user.reducer';
import uiSlice from './reducers/ui.reducer';
import chatStreamSlice from './reducers/chatstream.reducer'
import dataSourceSlice from './reducers/datasource.reducer';
import tableSlice from './reducers/table.reducer';
import { fetchUserById } from './actions/user.action';
import {UserId} from "../utilities/constants";

export const store = configureStore({
  reducer: {
    user: userSlice,
    globalUI: uiSlice,
    chatStreams: chatStreamSlice,
    dataSource: dataSourceSlice,
    table: tableSlice
  }
})

// Initialize application
// @ts-ignore
store.dispatch(fetchUserById(UserId))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch