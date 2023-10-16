export interface DataSource {
  name: string;
  description: string;
  uri: string;
  type: "API" | "Database" | "CSV" | "Excel" | "XML" | "PDF" | "JSON" | "File";
  id: string;
  created_at: string;
  updated_at: string;
}

export interface NewDataSource {
  name: string;
  description: string;
  uri: string;
  type: "API" | "Database" | "CSV" | "Excel" | "XML" | "PDF" | "JSON" | "File";
}

export interface dataSourceState {
  loading: boolean;
  items: {
    [chatStreamId: string]: Array<DataSource>;
  }

}

export interface dataSourceByChatStreamId {
  [chatStreamId: string]: Array<DataSource>
}

export interface createNewDataSourceData {
  newDataSourceData: NewDataSource;
  chatStreamName: string
}