export interface CreateLibraryRequest {
  search_history_id: number;
  library_name: string;
  tags: string[];
  panel_ids?: string[] | null;
}

export interface CreateLibraryResponse {
  library_id: number;
  library_name: string;
  search_history_id: number;
  panel_count: number;
  panel_ids: string[];
  tags: string[];
  created_at: string;
}

export interface LibraryApiResponse {
  is_success: boolean;
  code: string;
  result: CreateLibraryResponse;
  message: string;
}
