import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { CategoryResponseDTO } from "./dtos/CategoryResponseDTO";
import { extractError } from "@libs/alert";

export const query = ["category"];

interface UseCategoryGetAllProps {
  enabled?: boolean;
}

export function useCategoryGetAll({ enabled }: UseCategoryGetAllProps) {
  async function handleRequest() {
    const response = await api.get<CategoryResponseDTO[]>("/category");
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: query,
    queryFn: handleRequest,
    enabled,
  });

  if (error) {
    extractError(error);
  }

  return rest;
}
