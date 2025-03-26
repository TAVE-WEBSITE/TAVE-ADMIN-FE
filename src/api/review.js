import client from './client';

export async function getManagerReview(generation) {
    try {
        const response = await client.get(`/manager/review/${generation}`);
        return response.data.result;
    } catch (error) {
        console.error('관리자 후기 조회 에러', error);
    }
}
