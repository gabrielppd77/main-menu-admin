import AutoComplete from "@components/AutoComplete";

import { useCategoryGetAll } from "@libs/queries/category/useCategoryGetAll";

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
  } = useCategoryGetAll();
  const isLoading = _isLoading || isFetching;

  return (
    <AutoComplete
      options={data || []}
      isLoading={isLoading}
      label="Categoria"
      name={name}
      idField="id"
      renderOptions={(d) => d.name}
      required
    />
  );
}
