export interface createNewTableData {
  chatStreamId: string;
  tableName: string;
}

export interface NewTable {
  chat_stream_id: string;
  name: string;
  table_structure: {
    columns: Array<any>
  };
  data_mapping: any;
}

export type ColumnType = "string" | "number" | "boolean" | "date";


export interface Column {
  id: string;
  title: string;
  dataType: ColumnType
}

export interface TableItem {
  chat_stream_id: string;
  name: string;
  table_structure: {
    columns: Array<Column>
  }
  data_mapping: any,
  id: string;
  version: number;
  version_timestamp: string;
  created_at: string;
  updated_at: string;
}

export interface Table {
  items: Array<TableItem>;
  item_count: number;
}

export interface tableState {
  items: {
    [id: string]: TableItem
  };
  loading: boolean;
  showTable: boolean;
  editing: boolean
}