import type { CreateLibraryRequest, LibraryApiResponse } from "@/types/library";
import apiClient from "./client";

// 라이브러리 생성
export const createLibrary = async (
  data: CreateLibraryRequest
): Promise<LibraryApiResponse> => {
  const response = await apiClient.post<LibraryApiResponse>("/libraries", data);
  return response.data;
};
