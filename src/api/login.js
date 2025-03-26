import client from './client';

// 수정 <- 수정완료 되면 삭제해주세요 !

export async function postRefreshToken(email) {
    try {
        //refreshToken:"eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDE2MjIzMjF9.gklFT5rII3z1lUL5ztBEkDvpt7u2mL05NoetmMLRYX0",
        //const refreshToken = Cookies.get("refreshToken");
        const response = await client.post('/auth/refresh', {
            email: email, // 이메일을 리프레시 토큰 발급 요청에 사용
        });
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function postLogin(email, password) {
    try {
        const response = await client.post('/auth/signin', {
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
