import { useState } from "react";

export default function useDialog<TData>() {
  const [data, setData] = useState<TData>();
  const [isOpen, setOpen] = useState(false);

  function toggle(d?: TData) {
    setOpen((prev) => !prev);
    setData(d);
  }

  return {
    toggle,
    data,
    isOpen,
  };
}
