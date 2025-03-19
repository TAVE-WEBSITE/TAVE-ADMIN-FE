// import client from './client';


// export const getMemberList = async () => {
//     try {
//         const response = await client.get('/admin/manager');
//         return response.data.result;
//     } catch (error) {
//         console.error('관리자 멤버 조회 에러', error);
//     }
// };

// // 가입대기 승인/거절
// export const getWaitingList = async (memberId) => {
//     try {
//         const response = await client.get(`/admin/unauthorized-manager/${memberId}`);
//         return response.data.result;
//     } catch (error) {
//         console.error('관리자 가입 대기 멤버 승인/거절 에러', error);
//     }
// };

// // 운영진 강제 탈퇴
// export const removeMember = async (memberId) => {
//     try {
//         const response = await client.get(`/admin/${memberId}`);
//         return response.data.result;
//     } catch (error) {
//         console.error('관리자 멤버 조회 에러', error);
//     }
// };