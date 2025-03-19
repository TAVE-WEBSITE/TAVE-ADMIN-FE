import client from "../client";
import axios from "axios";
import Cookies from "js-cookie";

// 리프레시 토큰 요청 API
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

// Axios 응답 인터셉터 설정 (401 처리)
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (error.response.data.message === "토큰 재발급이 필요합니다.") {
        const originalRequest = error.config;
        try {
          // 리프레시 토큰 발급을 요청
          const tokenResponse = await postRefreshToken(
            sessionStorage.getItem("email")
          );
          if (tokenResponse.status === 201) {
            const newAccessToken = tokenResponse.data.accessToken;

            // 새로 발급된 액세스 토큰을 세션스토리지에 저장
            sessionStorage.setItem("access_token", newAccessToken);

            // 기존 요청의 Authorization 헤더 업데이트 후 재요청
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          if (axios.isAxiosError(refreshError)) {
            if ([404, 422].includes(refreshError.response?.status)) {
              alert("로그인이 필요합니다.");
              window.location.replace("/login");
            } else {
              alert("토큰 갱신 실패");
            }
          }
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
