// store/historyStore.js
import { create } from 'zustand';

const useHistoryStore = create((set) => ({
  isAddModal: false,
  searchInput: '',
  setIsAddModal: (state) => set({ isAddModal: state }),
  setSearchInput: (input) => set({ searchInput: input }),
}));

export default useHistoryStore;
