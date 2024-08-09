import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { CategoryResponseDTO } from "./dtos/CategoryResponseDTO";
import { extractError } from "@libs/alert";

const query = ["category"];

export function useCategoryGetAll() {
  async function handleRequest() {
    const response = await api.get<CategoryResponseDTO[]>("/category");
    return response.data;
  }

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: query,
    queryFn: handleRequest,
  });

  if (error) {
    extractError(error);
  }

  return { data, isLoading, isFetching };
}
