"use client";
import Image from "next/image";
import IsLeader from "./IsLeader";
import { Button } from "@mui/material";
import { useState } from "react";
import ModalCustom from "@/components/ModalCustom";
import TypeValid from "@/components/TypeValid";

type TeamMember = {
  teamId: number;
  userId: number;
  nickname: string;
  introduction: string;
  role: string;
  profileImage: string;
  area: string;
  winRate: number;
  tier: string;
  mvpCount: number;
};

type MemberListProps = {
  memberJSON: Array<TeamMember> | undefined;
  isLeader: boolean;
  setIsLeader: (isLeader: boolean) => void;
};

export default function MemberList({
  memberJSON,
  isLeader,
  setIsLeader,
}: MemberListProps) {
  // 팀 제명하기
  // 1. 팀 제명 모달
  const [showExpelModal, setShowExpelModal] = useState(false);
  const [currentMemberName, setCurrentMemberName] = useState("");
  const [currentMemberId, setCurrentMemberId] = useState(0);
  const [currentMemberTeamId, setCurrentMemberTeamId] = useState(0);

  // 2. 팀 제명 fetch
  async function expelMember() {
    let expelMemberName = currentMemberName;
    let expelMemberId = currentMemberId;
    let expelMemberTeamId = currentMemberTeamId;

    console.log("팀 제명 fetch");
    console.log("expelMemberName: " + expelMemberName);
    console.log("experlMemberId: " + expelMemberId);
    console.log("expelMemberTeamId: " + expelMemberTeamId);

    // 테스트 코드 (제명신청 완료 후 )
    setShowExpelModal(false);
    alert(expelMemberName + "님을 제명하였습니다.");
    location.reload();

    // // TODO: 팀원 제명 fetch 구현
    // const memberExpelURL = `https://withsports.shop:8000/team-service/team/${expelMemberTeamId}/teamUser/${expelMemberId}`;
    // const token = window.localStorage.getItem("accessToken");

    // const response = await fetch(memberExpelURL, {
    //     headers: {
    //         "Credentials": "include",
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`,
    //     },
    // })
    // .then((res) => {
    //     if(res.ok){
    //         console.log("팀원 제명 요청이 완료되었습니다.");
    //     }
    //     else{
    //         console.log("팀원 제명 요청이 실패하였습니다.");
    //     }
    // })
  }

  return (
    <div>
      <IsLeader isLeader={isLeader} setIsLeader={setIsLeader}>
        {memberJSON?.map((member: TeamMember) => (
          <div key={member.userId}>
            <p hidden>{member.teamId}</p>
            <Image
              src={member.profileImage}
              alt="profileImage"
              width={200}
              height={200}
            />
            <h3>{member.nickname}</h3>
            <div>{member.introduction}</div>
            <div>{member.role}</div>
            <div>{member.area}</div>
            <div>{member.winRate}%</div>
            <div>{member.tier} 티어</div>
            <div>MVP: {member.mvpCount}회</div>
            {isLeader && (
              <Button
                onClick={() => {
                  setCurrentMemberName(member.nickname);
                  setCurrentMemberId(member.userId);
                  setCurrentMemberTeamId(member.teamId);
                  setShowExpelModal(!showExpelModal);
                }}
                style={{ color: "red" }}
              >
                제명
              </Button>
            )}
            <ModalCustom show={showExpelModal} setShow={setShowExpelModal}>
              <div>정말로 {currentMemberName}님을 제명하시겠습니까?</div>
              <TypeValid
                buttonText="제명 신청"
                validText={currentMemberName + "/제명한다"}
                onClick={expelMember}
              ></TypeValid>
            </ModalCustom>
          </div>
        ))}
      </IsLeader>
    </div>
  );
}
