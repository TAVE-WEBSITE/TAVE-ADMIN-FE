import client from './client';

export async function postEmailVerification(email, reset) {
    try {
      const response = await client.post("/normal/authenticate/email", {
        email: email,
        number: "", // 인증번호 입력 전이므로 비워둠
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return 400;
      }else{
        return 500;
      }
      throw error;
    }
  }
  
  export async function postEmailVerify(email, number) {
    try {
      const response = await client.post(`/normal/verify/number`, {
        email: email,
        number: number, 
      });
  
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return 400;
      }
      throw error;
    }
  }
  

export async function putResetPassword(nickname, password, validatedPassword) {
    try {
        const response = await client.put('/normal/reset/password', {
            nickname,
            password,
            validatedPassword,
        });
        return response;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
}
