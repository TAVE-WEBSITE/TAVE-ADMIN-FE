import client from './client';

export async function getSession() {
    try {
        const response = await client.get(`/normal/session`);
        return response.data.result;
    } catch (error) {
        console.error('정규 세션 조회 에러', error);
    }
}
export async function postSession(formDataToSend) {
    try {
        const token = sessionStorage.getItem('access_token'); 

        if (!token) {
            throw new Error('토큰이 없습니다');
        }

        // Content-Type : multipart/form-data인지 서버 점검 요청,,
        const response = await client.post('/manager/session', formDataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('서버 응답:', response);

        return response.data.result;
    } catch (error) {
        console.error('정규 세션 생성 에러', error);
        throw error;
    }
}



export async function modifySession(sessionId, data) {
    try {
        const response = await client.put(`/manager/session/${sessionId}`, data);
        return response.data; 
    } catch (error) {
        console.error('정규 세션 수정 에러', error);
        throw error; 
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
