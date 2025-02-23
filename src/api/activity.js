import client from './client';


export const getManagerSession = async () => {
    try {
        const response = await client.get('/manager/review');
        return response.data.result;
    } catch (error) {
        console.error('관리자 정규세션 조회 에러', error);
    }
};

export const getManagerHistory = async () => {
    try {
        const response = await client.get('/manager/history');
        return response.data.result;
    } catch (error) {
        console.error('관리자 이력 조회 에러', error);
    }
};


export const getManagerReview = async () => {
    try {
        const response = await client.get('/manager/review');
        return response.data.result;
    } catch (error) {
        console.error('관리자 후기 조회 에러', error);
    }
};