import client from './client';

export const getManagerReview = async (gerneration) => {
    try {
        const response = await client.get(`/manager/review/${gerneration}`);
        return response.data.result;
    } catch (error) {
        console.error('관리자 후기 조회 에러', error);
    }
};
