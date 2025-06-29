import client from "./client";
import useStore from "../store/userInformation";

// 수정 <- 수정완료 되면 삭제해주세요 !

export async function postRefreshToken(email) {
  try {
    //refreshToken:"eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDE2MjIzMjF9.gklFT5rII3z1lUL5ztBEkDvpt7u2mL05NoetmMLRYX0",
    //const refreshToken = Cookies.get("refreshToken");
    const response = await client.post("/auth/refresh", {
      email: email, // 이메일을 리프레시 토큰 발급 요청에 사용
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function postLogin(email, password) {
  try {
    const response = await client.post("/auth/signin", {
      email: email,
      password: password,
    });
    // 로그인 성공 후 사용자 정보 zustand store에 저장
    if (response.status === 200) {
      const { user } = response.data.result;
      console.log("로그인 성공:", response.data.result);
      useStore.getState().setUser(user);
      // 신규 지원 관리자에서 헤더에 사용자 이름을 표시해주기 위해서 추가
      sessionStorage.setItem("username", response.data.result.username);
    }

    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return 400;
    }
    throw error;
  }
}

export async function getLogout() {
  try {
    const token = sessionStorage.getItem("access_token");
    const response = await client.get("/auth/signout", null, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.error("로그아웃 에러", error);
    throw error;
  }
}
