import {createSlice} from "@reduxjs/toolkit";
import {dataSourceState} from "../interfaces/datasource.interface";
import {createNewDataSource, fetchDataSourcesById, fetchDataSourcesByIds} from "../actions/datasource.action";



const initialState: dataSourceState = {
  loading: true,
  items: {}
} as dataSourceState;

const dataSourceSlice = createSlice({
  name: 'dataSource',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDataSourcesById.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchDataSourcesById.fulfilled, (state: dataSourceState, { payload }) => {
      return state = {...state, items: {...state.items, ...payload}}
    })
    builder.addCase(fetchDataSourcesByIds.fulfilled, (state) => {
      state.loading = false;
    })
    builder.addCase(createNewDataSource.fulfilled, (state: dataSourceState, { payload }) => {
      console.log(payload)
    })
  }
})

export default dataSourceSlice.reducer;