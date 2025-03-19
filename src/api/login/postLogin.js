import client from "../client";

export async function postLogin(email, password) {
  try {
    const response = await client.post("/auth/signin", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return 400;
    }
    throw error;
  }
}
