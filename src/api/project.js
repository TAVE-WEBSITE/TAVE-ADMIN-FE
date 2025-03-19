import client from './client';

export const getProject = async () => {
    try {
        const response = await client.post('/normal/project');
        return response.data.result;
    } catch (error) {
        console.error('프로젝트 조회 에러', error);
    }
};

export const postProject = async () => {
    try {
        await client.post('/manager/project');
    } catch (error) {
        console.error('프로젝트 생성 에러', error);
    }
};

export const modifyProject = async (id) => {
    try {
        await client.put(`/manager/project/${id}`);
    } catch (error) {
        console.error('프로젝트 수정 에러', error);
    }
};

export const deleteProject = async (id) => {
    try {
        await client.delete(`/manager/project/${id}`);
    } catch (error) {
        console.error('프로젝트 삭제 에러', error);
    }
};
