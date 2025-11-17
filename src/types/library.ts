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

export interface Library {
  library_id: number;
  library_name: string;
  search_history_id: number;
  panel_count: number;
  panel_ids: string[];
  tags: string[];
  created_at: string;
}

export interface LibraryListResponse {
  libraries: Library[];
  total_count: number;
}

export interface LibraryListApiResponse {
  is_success: boolean;
  code: string;
  result: LibraryListResponse;
  message: string;
}

export interface Panel {
  panel_id: string;
  gender: string;
  age: number;
  age_group: string;
  residence: string | null;
  marital_status: string | null;
  children_count: number | null;
  occupation: string | null;
  profile_summary: string;
}

export interface SearchHistory {
  search_history_id: number;
  content: string;
  date: string;
  panel_count: number;
  created_at: string | null;
}

export interface Statistics {
  total_panels: number;
  gender_distribution: {
    male: number;
    female: number;
    none: number;
  };
  age_group_distribution: {
    "20대": number;
    "30대": number;
    "40대": number;
    "50대": number;
    "60대+": number;
  };
  residence_distribution: {
    seoul: number;
    gyeonggi: number;
    busan: number;
    other: number;
  };
}

export interface LibraryDetailResponse {
  tags: string[];
  library_id: number;
  library_name: string;
  panel_count: number;
  panel_ids: string[];
  panels: Panel[];
  search_histories: SearchHistory[];
  statistics: Statistics;
  created_at: string;
  updated_at: string;
}

export interface LibraryDetailApiResponse {
  is_success: boolean;
  code: string;
  result: LibraryDetailResponse;
  message: string;
}
