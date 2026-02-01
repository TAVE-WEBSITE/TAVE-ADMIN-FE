import client from './client';

export async function getProject(page = 0, size = 1000) {
    try {
        const response = await client.get(`/normal/project?page=${page}&size=${size}`);
        return response.data.result;
    } catch (error) {
        console.error('프로젝트 조회 에러', error);
    }
}

export async function postProject(formData) {
    try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            throw new Error('토큰이 없습니다');
        }
        
        for (let [key, value] of formData.entries()) {
            if (key === 'req') {
                const reader = new FileReader();
                reader.onload = function() {
                    console.log('req 내용:', JSON.parse(reader.result));
                };
                reader.readAsText(value);
            } else {
                console.log(`${key}:`, value);
            }
        }
        
        const response = await client.post('/manager/project', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            transformRequest: [(data) => data]
        });
        return response.data.result;
    } catch (error) {
        console.error('프로젝트 생성 에러', error);
        throw error;
    }
}

export async function modifyProject(projectId, formData) {
    try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            throw new Error('토큰이 없습니다');
        }
        
        const response = await client.put(`/manager/project/${projectId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: [(data) => data]
        });
        return response.data;
    } catch (error) {
        console.error('프로젝트 수정 에러', error);
        throw error;
    }
}

export async function deleteProject(id) {
    try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            throw new Error('토큰이 없습니다');
        }
        
        await client.delete(`/manager/project/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('프로젝트 삭제 에러', error);
        throw error;
    }
}
