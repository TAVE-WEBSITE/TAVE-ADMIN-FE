import client from './client';

export const getManagerHistory = async () => {
    try {
        const response = await client.get('/manager/history');
        return response.data.result;
    } catch (error) {
        console.error('관리자 이력 조회 에러', error);
    }
};
