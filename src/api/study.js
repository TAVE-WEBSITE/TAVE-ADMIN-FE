import client from './client';

export async function getStudy(page, generation, field) {
    try {
        const response = await client.get(`/normal/study?${page}&${generation}&${field}`);
        console.log(response.data.result);
        return response.data.result;
    } catch (error) {
        console.error('스터디 조회 에러', error);
    }
}

export async function postStudy({ teamName, generation, field, topic, blogUrl }) {
    try {
        await client.post('/manager/study', {
            teamName,
            generation,
            field,
            topic,
            blogUrl,
        });
    } catch (error) {
        console.error('스터디 생성 에러', error);
    }
}

export async function modifyStudy(id, { teamName, generation, field, topic, blogUrl }) {
    try {
        await client.put(`/manager/study/${id}`, {
            teamName,
            generation,
            field,
            topic,
            blogUrl,
        });
    } catch (error) {
        console.error('스터디 수정 에러', error);
    }
}

export async function deleteStudy(id) {
    try {
        await client.delete(`/manager/study/${id}`);
    } catch (error) {
        console.error('스터디 삭제 에러', error);
    }
}
