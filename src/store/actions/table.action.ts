import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {v4 as uuid} from "uuid";
import {Column, ColumnType, createNewTableData, NewTable, Table, TableItem} from "../interfaces/table.interface";

export const fetchVersionedTablesById = createAsyncThunk(
  'table/fetchVersionedTablesById',
  async (chatStreamId: string) => {
    try {
      // TODO: API string in constants file
      const response = await fetch(`https://api-test.reliant.ai/v1/table?skip=0&limit=100&chatstream_id=${chatStreamId}`);
      return (await response.json()) as Table
    } catch (e) {
      // TODO: Error management
    }
  }
)

export const createNewTable = createAsyncThunk(
  'table/createNewTable',
  async (data: createNewTableData, ThunkAPI) => {
    const tableData: NewTable = {
      name: data.tableName,
      table_structure: {
        columns: []
      },
      data_mapping: {},
      chat_stream_id: data.chatStreamId
    }
    await axios.post('https://api-test.reliant.ai/v1/table', tableData);
    await ThunkAPI.dispatch(fetchVersionedTablesById(data.chatStreamId));
  }
)

export const addColumnInVersionedTable = createAsyncThunk(
  'table/addColumnInVersionedTable',
  async (data: { title: string, type: ColumnType, tableData: TableItem }) => {
    const newColumn: Column = {
      id: uuid(),
      dataType: data.type,
      title: data.title
    }
    const editedColumns: Array<Column> = [...data.tableData.table_structure.columns, newColumn];
    const editedTable: NewTable = {
      name: data.tableData.name,
      chat_stream_id: data.tableData.chat_stream_id,
      data_mapping: data.tableData.data_mapping,
      table_structure: {
        columns: editedColumns
      }
    }
    const response = await axios.put(`https://api-test.reliant.ai/v1/table/${data.tableData.id}`, editedTable);
    return response.data as TableItem;
  }
)

export const deleteColumnInVersionedTable = createAsyncThunk(
  'table/deleteColumnInVersionedTable',
  async (data: { columnId: string, tableData: TableItem }, ThunkAPI) => {
    const columnToBeDeletedIndex = data.tableData.table_structure.columns.findIndex(e => e.id === data.columnId);
    const columns = [...data.tableData.table_structure.columns]
    columns.splice(columnToBeDeletedIndex, 1);
    const editedTable: NewTable = {
      name: data.tableData.name,
      chat_stream_id: data.tableData.chat_stream_id,
      data_mapping: data.tableData.data_mapping,
      table_structure: {
        columns: columns
      }
    }
    const response = await axios.put(`https://api-test.reliant.ai/v1/table/${data.tableData.id}`, editedTable);
    return response.data as TableItem;
  }
)