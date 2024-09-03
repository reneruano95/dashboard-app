import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  data: any;
  onOpen: () => void;
  onClose: () => void;
  setData(data: any): void;
}

export const useDialog = create<DialogState>((set) => ({
  isOpen: false,
  data: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setData: (data) => set({ data }),
}));
