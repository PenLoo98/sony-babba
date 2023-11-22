"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import ModalCustom from "@/components/ModalCustom";
import TypeValid from "@/components/TypeValid";

type ExpelMemberProps = {
  teamId: number;
  memberId: number;
  memberName: string;
};

export default function ExpelMember({
  teamId,
  memberId,
  memberName,
}: ExpelMemberProps) {
  // 1. 팀 제명 모달
  const [showExpelModal, setShowExpelModal] = useState(false);

  // 2. 팀 제명 fetch
  async function expelMember() {
    // TODO: 팀원 제명 fetch 구현
    const memberExpelURL = `https://withsports.shop:8000/team-service/team/${teamId}/teamUser/${memberId}`;
    const token = window.localStorage.getItem("accessToken");

    const response = await fetch(memberExpelURL, {
      method: "DELETE",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("팀원 제명 요청이 완료되었습니다.");
      } else {
        console.log("팀원 제명 요청이 실패하였습니다.");
      }
    });
  }

  return (
    <div>
      <Button
        onClick={() => {
          setShowExpelModal(!showExpelModal);
        }}
        style={{ color: "red" }}
      >
        제명
      </Button>
      <ModalCustom show={showExpelModal} setShow={setShowExpelModal}>
        <div>정말로 {memberName}님을 제명하시겠습니까?</div>
        <TypeValid
          buttonText="멤버 제명하기"
          validText={memberName + "/제명한다"}
          onClick={expelMember}
        ></TypeValid>
      </ModalCustom>
    </div>
  );
}
