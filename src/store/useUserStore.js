import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userName: "",
      department: "",

      setUserName: (userName) => set({ userName }),
      setDepartment: (department) => set({ department }),
    }),
    {
      name: "user-storage", 
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
