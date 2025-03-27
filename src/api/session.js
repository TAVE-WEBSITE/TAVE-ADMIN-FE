import client from './client';

export async function getSession() {
    try {
        const response = await client.get(`/normal/session`);
        return response.data.result;
    } catch (error) {
        console.error('정규 세션 조회 에러', error);
    }
}

export async function postSession(data) {
    try {
        const response = await client.post(`/manager/session`, data);
        return response.data.result;
    } catch (error) {
        console.error('정규 세션 생성 에러', error);
    }
}

export async function modifySession(sessionId, data) {
    try {
        const response = await client.put(`/manager/session/${sessionId}`, data);
        return response.data.result;
    } catch (error) {
        console.error('정규 세션 수정 에러', error);
    }
}

export async function deleteSession(sessionId) {
    try {
        const response = await client.delete(`/manager/session/${sessionId}`);
        return response.data.result;
    } catch (error) {
        console.error('정규 세션 삭제 에러', error);
    }
}
