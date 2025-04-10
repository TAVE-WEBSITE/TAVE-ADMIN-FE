import axios from 'axios';
import { postRefreshToken } from './login';

const SERVER_URL = process.env.REACT_APP_BASE_URL;

const client = axios.create({
    baseURL: `${SERVER_URL}/v1`,
    withCredentials: true,
});

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            if (error.response.data.message === '토큰 재발급이 필요합니다.') {
                const originalRequest = error.config;
                try {
                    const tokenResponse = await postRefreshToken(sessionStorage.getItem('email'));
                    if (tokenResponse.status === 201) {
                        const newAccessToken = tokenResponse.data.accessToken;
                        sessionStorage.setItem('access_token', newAccessToken);
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return client(originalRequest);
                    }
                } catch (refreshError) {
                    if (axios.isAxiosError(refreshError)) {
                        if ([404, 422].includes(refreshError.response?.status)) {
                            alert('로그인이 필요합니다.');
                            window.location.replace('/login');
                        } else {
                            alert('토큰 갱신 실패');
                        }
                    }
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

client.interceptors.request.use(
    async (config) => {
        if (typeof window !== undefined) {
            const token = sessionStorage.getItem('access_token');
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default client;
