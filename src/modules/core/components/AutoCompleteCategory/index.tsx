import { useCategoryGetAll } from "@libs/queries/category/useCategoryGetAll";
import AutoComplete from "../AutoComplete";

interface AutoCompleteCategoryProps {
  name: string;
}

export default function AutoCompleteCategory({
  name,
}: AutoCompleteCategoryProps) {
  const {
    data,
    isLoading: _isLoading,
    isFetching,
    refetch,
  } = useCategoryGetAll({ enabled: false });
  const isLoading = _isLoading || isFetching;

  return (
    <AutoComplete
      options={data || []}
      isLoading={isLoading}
      label="Categoria"
      name={name}
      idField="id"
      renderOptions={(d) => d.name}
      onRefetch={refetch}
      required
    />
  );
}
