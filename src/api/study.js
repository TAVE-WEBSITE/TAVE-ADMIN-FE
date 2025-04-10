import client from './client';

export async function getStudy(page = 0, size = 1000)  {
    try {
        const response = await client.get(`/normal/study?page=${page}&size=${size}`);
        // console.log('스터디 API 응답:', response.data); 
        return response.data;
    } catch (error) {
        console.error('스터디 조회 에러', error);
    }
};

export async function postStudy() {
    try {
        await client.post('/manager/study');
    } catch (error) {
        console.error('스터디 생성 에러', error);
    }
}

export async function modifyStudy(studyId) {
    try {
        await client.put(`/manager/study/${studyId}`);
    } catch (error) {
        console.error('스터디 수정 에러', error);
    }
}

export async function deleteStudy(studyId) {
    try {
        await client.delete(`/manager/study/${studyId}`);
    } catch (error) {
        console.error('스터디 삭제 에러', error);
    }
}
