import { create } from 'zustand';

const useSessionStore = create((set) => ({
  isModalOpen: false,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setPage: (page) => set({ currentPage: page }),
}));

export default useSessionStore;
