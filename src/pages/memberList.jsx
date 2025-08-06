import React from "react";
import { useState, useEffect } from "react";
import { getMemberList, deleteMember } from "../api/memberList";
import Tab from "../components/tab";
import Header from "../components/header";
import Pagination from "../components/pagination";
import SimpleModal from "../components/simpleModal";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import {
  classifyDepartment,
  classifyJobType,
  ModalClassifyJobType,
} from "../utils/classifyMember";

export default function MemberList() {
  const [categories, setCategories] = useState(["회원 명단", "가입 대기 명단"]);
  const [links, setLinks] = useState(["/memberList", "/waitingList"]);
  const [memberData, setMemberData] = useState([]); // 현재 페이지 회원 리스트
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false); // 탈퇴 버튼 모달
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 탈퇴 완료 모달
  const [modalText, setModalText] = useState("");
  const [modalAdditionalText, setModalAdditionalText] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState(null); // 탈퇴 대상 ID

  useEffect(() => {
    fetchMemberList(0);
  }, []);

  const { department } = useUserStore();
  const navigate = useNavigate();

  //회장권한
  useEffect(() => {
    if (department !== "회장") {
      navigate("/session");
    }
  }, []);

  // 운영진 멤버 목록 불러오기
  const fetchMemberList = async (page = 0) => {
    try {
      setIsLoading(true);
      const data = await getMemberList("AUTHORIZED", page);
      // console.log(data);
      
      // 서버에서 배열이 직접 반환되는 경우
      if (Array.isArray(data)) {
        setMemberData(data);
        setTotalPages(Math.ceil(data.length / 8));
      } else {
        // 기존 구조 (content와 page 정보가 있는 경우)
        setMemberData(data.content || []);
        setTotalPages(data.page?.totalPages || Math.ceil((data.content?.length || 0) / 8));
      }
    } catch (error) {
      console.error("회원 명단 조회 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNum) => {
    const pageIndex = pageNum ; // 페이지 번호를 0-based 인덱스로 변환
    setCurrentPage(pageNum);
    fetchMemberList(pageIndex);
  };

  // 탈퇴 버튼 클릭 시 실행 (탈퇴할 멤버의 ID를 설정)
  const handleOpenModal = (member) => {
    setSelectedMemberId(member.id);
    setModalText(
      `${ModalClassifyJobType(member.department, member.job)} ${
        member.username
      }님을`
    );
    setModalAdditionalText("정말 탈퇴시키겠습니까?");
    setModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMemberRemoval = async () => {
    if (!selectedMemberId) {
      setModalText("오류");
      setModalAdditionalText("탈퇴할 회원을 찾을 수 없습니다.");
      setModalOpen(true);
      return;
    }

    try {
      await deleteMember(selectedMemberId);
      // 선택된 멤버 찾기
      const memberToRemove = memberData.find(
        (member) => member.id === selectedMemberId
      );
      if (memberToRemove) {
        // 기존 모달 닫기
        setModalOpen(false);

        // 탈퇴 완료 모달 열기
        setTimeout(() => {
          setModalText(
            `${ModalClassifyJobType(
              memberToRemove.department,
              memberToRemove.job
            )} ${memberToRemove.username}님의`
          );
          setModalAdditionalText("탈퇴 처리가 완료되었습니다.");
          setConfirmModalOpen(true);

          // 멤버 리스트 새로고침 (현재 페이지 유지)
          fetchMemberList(currentPage - 1);
        }, 300);
      }
    } catch (error) {
      setModalText("오류");
      setModalAdditionalText("탈퇴 처리 중 오류가 발생했습니다.");
      setModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
      <div className="grid place-items-center mb-20">
        <Tab category={categories} link={links} currentIndex={0} />
      </div>
      <div className="w-4/5 max-w-screen-xl mx-auto mb-40">
        <table className="w-full border-collapse text-white text-2xl leading-9 table-fixed ">
          {/* 테이블 헤더 */}
          <thead>
            <tr className="font-regular border-b border-white/30 text-left mb-4">
              <th className="py-5 px-4 w-32">이름</th>
              <th className="py-5 px-4 w-32">소속부서</th>
              <th className="py-5 px-4 w-24">직책</th>
              <th className="py-5 px-4 ">이메일</th>
              <th className="py-5 px-4 w-24">기수</th>
              <th className="py-5 px-4 w-60">아지트</th>
              <th className="py-5 px-4 w-40"></th> {/* 탈퇴 버튼 열  */}
            </tr>
          </thead>
          {/* 테이블 바디 */}
          <tbody>
            {memberData.map((member, index) => (
              <tr key={index} className="">
                <td className="py-4 px-4">{member.username}</td>
                <td className="py-4 px-4">
                  {classifyDepartment(member.department)}
                </td>
                <td className="py-4 px-4">{classifyJobType(member.job)}</td>
                <td className="py-4 px-4">{member.email}</td>
                <td className="py-4 px-4">{member.generation}</td>
                <td className="py-4 px-4">{member.agitId}</td>
                <td className="py-4 px-4 w-12 text-center">
                  <button
                    className="w-20 rounded-lg bg-white/20 py-2 px-1 font-bold text-base hover:bg-white/30"
                    onClick={() => handleOpenModal(member)}
                  >
                    탈퇴
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* 탈퇴 확인 모달 */}
          {isModalOpen && (
            <SimpleModal
              title={modalText}
              description={modalAdditionalText}
              grayBtnText="취소"
              blueBtnText="탈퇴"
              onClickGray={handleCloseModal}
              onClickBlue={handleMemberRemoval}
              onClose={handleCloseModal}
            />
          )}

          {isConfirmModalOpen && (
            <SimpleModal
              title={modalText}
              description={modalAdditionalText}
              blueBtnText="확인"
              onClickBlue={() => setConfirmModalOpen(false)}
              onClose={() => setConfirmModalOpen(false)}
            />
          )}
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
