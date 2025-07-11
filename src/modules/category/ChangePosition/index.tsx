import { useState } from "react";
import { SortableList } from "@modules/core/components/SortableList";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const data = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Name ${i + 1}`,
}));

export default function ChangePosition() {
  const [dataHere, setDataHere] = useState(data);
  return (
    <SortableList
      items={dataHere}
      onChange={setDataHere}
      className="flex flex-col gap-1"
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <SortableList.DragHandle className="flex h-9 w-full cursor-pointer items-center justify-between rounded bg-slate-50 px-4">
            {item.name}
            <DragIndicatorIcon color="primary" />
          </SortableList.DragHandle>
        </SortableList.Item>
      )}
    />
  );
}
