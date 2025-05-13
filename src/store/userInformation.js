import { create } from 'zustand';

const useStore = create((set) => ({
    user: null, 
    setUser: (userData) => set({ user: userData }), // 사용자 정보 저장
    logout: () => set({ user: null }), // 로그아웃 처리
}));

export default useStore;
