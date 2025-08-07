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
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            throw new Error('토큰이 없습니다');
        }
        
        const response = await client.post('/manager/study', {
            teamName,
            generation,
            field,
            topic,
            blogUrl,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.result;
    } catch (error) {
        console.error('스터디 생성 에러', error);
        throw error;
    }
}

export async function modifyStudy(studyId, { teamName, generation, field, topic, blogUrl }) {
    try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            throw new Error('토큰이 없습니다');
        }
        
        const response = await client.put(`/manager/study/${studyId}`, {
            teamName,
            generation,
            field,
            topic,
            blogUrl,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('스터디 수정 에러', error);
        throw error;
    }
}

export async function deleteStudy(studyId) {
    try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            throw new Error('토큰이 없습니다');
        }
        
        await client.delete(`/manager/study/${studyId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('스터디 삭제 에러', error);
        throw error;
    }
}
