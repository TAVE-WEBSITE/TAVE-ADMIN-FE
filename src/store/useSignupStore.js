import { create } from "zustand";

// 초기화 함수 추가

const useSignupStore = create((set, get) => ({
  step: 1,
  userData: {},
  isBtnDisabled: true,

  setStep: (step) => set({ step }),
  updateUserData: (key, value) =>
    set((state) => ({
      userData: { ...state.userData, [key]: value },
    })),
  validateStep: () => {
    const { step, userData } = get();
    let isValid = false;

    if (step === 1) isValid = userData.email && userData.email.trim() !== "";
    if (step === 2)
      isValid = userData.password && userData.password.trim() !== "";
    if (step === 3)
      isValid =
    userData.username && userData.username.trim() !== "" &&
    userData.generation && userData.generation.trim() !== "" &&
    userData.agitId && userData.agitId.trim() !== "" &&
    userData.department && userData.department.trim() !== "" &&
    (userData.department !== "PRINCIPAL"
      ? userData.job && userData.job.trim() !== ""
      : true);
  

    set({ isBtnDisabled: !isValid });
  },
  resetUserData: () => set({
    step:1,
    userData: {
      email: "",
      password: "",
      nickname: "",
      username: "",
      agitId: "",
      generation: "",
      department: "",
      job: "",
    },
  }),
}));

export default useSignupStore;
