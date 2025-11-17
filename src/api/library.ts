import type {
  CreateLibraryRequest,
  LibraryApiResponse,
  LibraryListApiResponse,
} from "@/types/library";
import apiClient from "./client";

// 라이브러리 생성
export const createLibrary = async (
  data: CreateLibraryRequest
): Promise<LibraryApiResponse> => {
  const response = await apiClient.post<LibraryApiResponse>("/libraries", data);
  return response.data;
};

// 라이브러리 목록 조회
export const getLibraries = async (): Promise<LibraryListApiResponse> => {
  const response = await apiClient.get<LibraryListApiResponse>("/libraries");
  return response.data;
};
