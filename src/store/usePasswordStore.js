import { create } from 'zustand';

const usePasswordStore = create((set) => ({
  nickname: '',
  email: '',
  authCode: '',
  isEmailVerified: false,
  password: '',
  confirmPassword: '',

  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setAuthCode: (authCode) => set({ authCode }),
  setIsEmailVerified: (status) => set({ isEmailVerified: status }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
}));

export default usePasswordStore;
