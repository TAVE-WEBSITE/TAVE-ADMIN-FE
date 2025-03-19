import client from './client';

export const getSession = async (generation, page, size) => {
    try {
        const response = await client.get(`/session/${generation}/${page}/${size}`);
        return response.data.result;
    } catch (error) {
        console.error('정규 세션 조회 에러', error);
    }
};
