import client from './client';

export async function getProject(page = 0, size = 1000) {
    try {
        const response = await client.get(`/normal/project?page=${page}&size=${size}`);
        console.log(response.data.result);
        return response.data.result;
    } catch (error) {
        console.error('프로젝트 조회 에러', error);
    }
}

export async function postProject() {
    try {
        await client.post('/manager/project');
    } catch (error) {
        console.error('프로젝트 생성 에러', error);
    }
}

export async function modifyProject(id) {
    try {
        await client.put(`/manager/project/${id}`);
    } catch (error) {
        console.error('프로젝트 수정 에러', error);
    }
}

export async function deleteProject(id) {
    try {
        await client.delete(`/manager/project/${id}`);
    } catch (error) {
        console.error('프로젝트 삭제 에러', error);
    }
}
