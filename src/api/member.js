import useSignupStore from "../store/useSignupStore";
import client from "./client";

export async function postEmailVerification(email) {
  const response = await client.post("/normal/authenticate/email", {
    email,
    number: "", // 인증번호 입력 전이므로 비워둠
  });
  return response;
}

export async function postEmailVerify(email, number) {
  const response = await client.post("/normal/verify/number", {
    email,
    number,
  });
  return response;
}


export async function postSignUp() {
  const userData = useSignupStore.getState().userData;
  
  const response = await client.post(`/auth/signup`, {
    email: userData.email,
    password: userData.password,
    nickname: userData.username,
    username: userData.username,
    agitId: userData.agitId,
    generation: userData.generation,
    department: userData.department,
    job: userData.job,
  });

  return response;
}