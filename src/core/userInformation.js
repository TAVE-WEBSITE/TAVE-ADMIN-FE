import { create } from 'zustand';

const useStore = create((set) => ({
    user: null, // 사용자 정보 초기값
    setUser: (userData) => set({ user: userData }), // 사용자 정보 저장
    logout: () => set({ user: null }), // 로그아웃 처리
}));

export default useStore;
