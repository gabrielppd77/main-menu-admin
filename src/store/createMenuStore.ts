import { create } from "zustand";

export interface MenuStoreProps {
  open: boolean;
  toggleOpen: () => void;
}

const createMenuStore = () =>
  create<MenuStoreProps>((set) => ({
    open: false,
    toggleOpen: () => set((state) => ({ open: !state.open })),
  }));

export default createMenuStore;
