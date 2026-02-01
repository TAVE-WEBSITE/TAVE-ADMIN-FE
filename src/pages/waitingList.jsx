import React from "react";
import { useState, useEffect } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import Pagination from "../components/pagination";
import SimpleModal from "../components/simpleModal";
import { approveMember, getMemberList, rejectMember } from "../api/memberList";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import {
  classifyDepartment,
  classifyJobType,
  ModalClassifyJobType,
} from "../utils/classifyMember";

export default function WaitingList() {
  const [categories, setCategories] = useState(["회원 명단", "가입 대기 명단"]);
  const [links, setLinks] = useState(["/memberList", "/waitingList"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState([]); // 현재 페이지 회원 리스트

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalAdditionalText, setModalAdditionalText] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 탈퇴 완료 모달
  const [actionType, setActionType] = useState("");

  //회장 접근권한
  const { department } = useUserStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (department !== "회장") {
      navigate("/session");
    }
  }, []);

  useEffect(() => {
    fetchMemberList(1);
  }, []);

  // 가입 대기 멤버 목록 불러오기
  const fetchMemberList = async (page = 1) => {
    try {
      setIsLoading(true);
      const data = await getMemberList("UNAUTHORIZED", page);
      
      // 서버에서 배열이 직접 반환되는 경우
      if (Array.isArray(data)) {
        setMemberData(data);
        setTotalPages(Math.ceil(data.length / 6));
      } else {
        // 기존 구조 (content와 page 정보가 있는 경우)
        setMemberData(data.content || []);
        setTotalPages(data.page?.totalPages || Math.ceil((data.content?.length || 0) / 6));
      }
    } catch (error) {
      console.error("가입 대기 명단 조회 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    fetchMemberList(pageNum);
  };

  // 승인 mutation
  const approveMutation = useMutation({
    mutationFn: (id) => approveMember(id),
    onSuccess: () => {
      // 현재 페이지 데이터 새로고침
      fetchMemberList(currentPage);
    },
    onError: () => {
      setModalText("승인 실패");
      setModalAdditionalText("요청을 처리할 수 없습니다.");
      setModalOpen(true);
    },
  });

  // 거절 mutation
  const rejectMutation = useMutation({
    mutationFn: (id) => rejectMember(id),
    onSuccess: () => {
      // 현재 페이지 데이터 새로고침
      fetchMemberList(currentPage);
    },
    onError: () => {
      setModalText("거절 실패");
      setModalAdditionalText("요청을 처리할 수 없습니다.");
      setModalOpen(true);
    },
  });

  const handleOpenModal = (member, action) => {
    setSelectedMember(member);
    setActionType(action);
    console.log(member);

    const text = `${ModalClassifyJobType(member.department, member.job)} ${
      member.username
    }님의`;
    const additionalText =
      action === "approve"
        ? "가입을 승인하시겠습니까?"
        : "가입을 거절하시겠습니까?";

    setModalText(text);
    setModalAdditionalText(additionalText);

    setModalOpen(true);
  };

  // 첫 번째 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // 승인 / 거절 실행
  const handleApproveOrReject = () => {
    if (!selectedMember) {
      setModalText("오류");
      setModalAdditionalText("회원을 찾을 수 없습니다.");
      setModalOpen(true);
      return;
    }

    // 첫 번째 모달 닫기
    setModalOpen(false);

    if (actionType === "reject") {
      rejectMutation.mutate(selectedMember.id, {
        onSuccess: () => {
          setModalOpen(false);
          setModalText(
            `${ModalClassifyJobType(
              selectedMember.department,
              selectedMember.job
            )} ${selectedMember.username}님에게`
          );
          setModalAdditionalText("가입 거절 메일이 발송되었습니다.");
          setConfirmModalOpen(true);
        },
      });
    } else if (actionType === "approve") {
      approveMutation.mutate(selectedMember.id, {
        onSuccess: () => {
          setModalOpen(false);
          setModalText(
            `${ModalClassifyJobType(
              selectedMember.department,
              selectedMember.job
            )} ${selectedMember.username}님에게`
          );
          setModalAdditionalText("가입 승인 메일이 발송되었습니다.");
          setConfirmModalOpen(true);
        },
      });
    }
  };

  return (
    <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
      <div className="grid place-items-center mb-20">
        <Tab category={categories} link={links} currentIndex={1} />
      </div>
      <div className="w-4/5 max-w-screen-xl mx-auto mb-40">
        <table className="w-full border-collapse text-white text-2xl leading-9 table-fixed ">
          {/* 테이블 헤더 */}
          <thead>
            <tr className="font-normal border-b border-white/30 text-left mb-4">
              <th className="py-5 px-4 w-32">이름</th>
              <th className="py-5 px-4 w-32">소속부서</th>
              <th className="py-5 px-4 w-24">직책</th>
              <th className="py-5 px-4 w-full">이메일</th>
              <th className="py-5 px-4 w-20">기수</th>
              <th className="py-5 px-4 w-60">아지트</th>
              <th className="py-5 px-4 w-52"></th> {/* 탈퇴 버튼 열  */}
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
                <td className="py-4 px-4 text-center">
                  <div className="flex gap-2 items-center justify-center">
                    <button
                      className="w-20 rounded-lg bg-[#FF0073CC] py-2 px-1 font-bold text-base hover:bg-[#FF0073BB]"
                      onClick={() => handleOpenModal(member, "reject")}
                    >
                      거절
                    </button>
                    <button
                      className="w-20 rounded-lg bg-[#195BFF] py-2 px-1 font-bold text-base hover:bg-[#195BFFCC]"
                      onClick={() => handleOpenModal(member, "approve")}
                    >
                      승인
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isModalOpen && (
        <SimpleModal
          title={modalText}
          description={modalAdditionalText}
          grayBtnText="취소"
          blueBtnText="확인"
          onClickGray={handleCloseModal}
          onClickBlue={handleApproveOrReject}
        />
      )}
      {isConfirmModalOpen && (
        <SimpleModal
          title={modalText}
          description={modalAdditionalText}
          blueBtnText="확인"
          onClickBlue={() => setConfirmModalOpen(false)}
        />
      )}
    </div>
  );
}
