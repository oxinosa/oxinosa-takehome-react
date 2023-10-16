export interface ChatStream {
  name: string;
  userId: string,
  dataSource: Array<string>,
  id: string,
  createdAt: string,
  updatedAt: string
}

export interface NewChatStream {
  name: string;
  user_id: string;
  data_source_ids: Array<string>
}

export interface chatStreamState {
  chatStreams: Array<ChatStream>,
  loading: boolean
}

export interface ChatStreamItem {
  name: string;
  user_id: string;
  data_source_ids: Array<string>;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ChatStreamSchema {
  items_count: number,
  items: Array<ChatStreamItem>
}
