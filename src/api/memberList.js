import client from './client';

export async function getMemberList(status, page = 0) {
    try {
        const response = await client.get(`/admin/manager?status=${status}&page=${page}`);
        return response.data.result;
    } catch (error) {
        console.error('가입 명단 조회 에러', error);
    }
}


export async function deleteMember(id) {
    try {
        await client.delete(`/admin/${id}`);
    } catch (error) {
        console.error('강제 탈퇴 에러', error);
    }
}

export async function approveMember(id) {
    try {
        await client.patch(`/admin/unauthorized-manager/${id}`);
    } catch (error) {
        console.error('운영진 승인 에러', error);
    }
}

export async function rejectMember(id) {
    try {
        await client.delete(`/admin/unauthorized-manager/${id}`);
    } catch (error) {
        console.error('운영진 거절 에러', error);
    }
}
