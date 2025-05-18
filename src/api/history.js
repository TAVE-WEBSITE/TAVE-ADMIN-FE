import client from "./client";

export async function getManagerHistory() {
  try {
    const response = await client.get("/normal/history");
    return response.data.result;
  } catch (error) {
    console.error("관리자 이력 조회 에러", error);
  }
}

export async function postHistory(data) {
  try {
    const response = await client.post("/manager/history", data);
    return response.data;
  } catch (error) {
    console.error("관리자 이력 추가 에러", error);
    throw error;
  }
}

export async function updateHistory(id, data) {
  try {
    const response = await client.patch(`/manager/history/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("관리자 이력 수정 에러", error);
    throw error;
  }
}

export async function deleteHistory(id) {
  try {
    const response = await client.delete(`/manager/history/${id}`);
    return response.data;
  } catch (error) {
    console.error("관리자 이력 삭제 에러", error);
    throw error;
  }
}
