import {createSlice} from "@reduxjs/toolkit";
import {Table, TableItem, tableState} from "../interfaces/table.interface";
import {
  addColumnInVersionedTable,
  deleteColumnInVersionedTable,
  fetchVersionedTablesById
} from "../actions/table.action";

const initialState: tableState = {
  items: {},
  loading: false,
  showTable: false,
  editing: false
} as tableState;


const tableSlice = createSlice({
  name: 'table',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchVersionedTablesById.pending, (state) => {
      state.loading = true;
      state.items = {}
      state.showTable = true;
    })
    builder.addCase(fetchVersionedTablesById.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        action.payload.items.forEach((table: TableItem) => {
          const temp = {[table.id]: table};
          state = { ...state, items: {...state.items, ...temp}};
        })
      }
      state.loading = false;
      return state;
    })
    builder.addCase(addColumnInVersionedTable.pending, (state) => {
      state.editing = true;
    })
    builder.addCase(addColumnInVersionedTable.fulfilled, (state, action) => {
      state.items[action.payload.id] = action.payload;
      state.editing = false;
    })
    builder.addCase(deleteColumnInVersionedTable.pending, (state) => {
      state.editing = true;
    })
    builder.addCase(deleteColumnInVersionedTable.fulfilled, (state, action) => {
      state.items[action.payload.id] = action.payload;
      state.editing = false;
    })
  }
})

export default tableSlice.reducer;