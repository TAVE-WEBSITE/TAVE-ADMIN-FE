import client from './client';

export const getStudy = async (generation, page, field) => {
    try {
        const response = await client.get(`/normal/study?${page}&${generation}&${field}`);
        return response.data.result;
    } catch (error) {
        console.error('스터디 조회 에러', error);
    }
};

export const postStudy = async () => {
    try {
        await client.post('/manager/study');
    } catch (error) {
        console.error('스터디 생성 에러', error);
    }
};

export const modifyStudy = async (id) => {
    try {
        await client.put(`/manager/study/${id}`);
    } catch (error) {
        console.error('스터디 수정 에러', error);
    }
};

export const deleteStudy = async (id) => {
    try {
        await client.delete(`/manager/study/${id}`);
    } catch (error) {
        console.error('스터디 삭제 에러', error);
    }
};
