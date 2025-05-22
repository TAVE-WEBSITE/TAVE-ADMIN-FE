import client from './client';

export async function getManagerReview(generation) {
    try {
        const token = sessionStorage.getItem('access_token');
        
        if (!token) {
            throw new Error('토큰이 없습니다');
        }

        const response = await client.get(`/manager/review/${generation}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('API 응답:', response.data); // API 응답 전체 확인

        if (response.data && response.data.result) {
            return response.data.result;
        } else {
            console.error('API 응답 형식이 올바르지 않습니다:', response.data);
            return [];
        }
    } catch (error) {
        console.error('관리자 후기 조회 에러', error);
        throw error;
    }
}

export async function modifyReview(reviewId, reviewData) {
    try {
        const token = sessionStorage.getItem('access_token');
        
        if (!token) {
            throw new Error('토큰이 없습니다');
        }

        const response = await client.patch(`/manager/review/${reviewId}`, reviewData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('후기 수정 에러', error);
        throw error;
    }
}

export async function deleteReview(reviewId) {
    try {
        const token = sessionStorage.getItem('access_token');
        
        if (!token) {
            throw new Error('토큰이 없습니다');
        }

        const response = await client.delete(`/manager/review/${reviewId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('후기 삭제 에러', error);
        throw error;
    }
}
