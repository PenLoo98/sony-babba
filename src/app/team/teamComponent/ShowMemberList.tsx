"use client";
import { useState } from "react";
import ExpelMember from "./ExpelMember";
import { Button } from "@mui/material";

type Member = {
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

type MemberListResponse = {
  code: string;
  message: string;
  data: Member[];
};

type MemberListProps = {
  teamId: number;
  isLeader: boolean;
};

export default function ShowMemberList({ teamId, isLeader }: MemberListProps) {
  // 팀원 목록 데이터 state
  const intialMemberListResponse: MemberListResponse = {
    code: "",
    message: "",
    data: [],
  };
  const [memberJSON, setMemberJSON] = useState<MemberListResponse>(
    intialMemberListResponse
  );

  // 팀원 목록을 불러오는지 확인하는 state
  const [isMemberListLoaded, setIsMemberListLoaded] = useState(false);

  // 팀원 목록 fetch
  async function getMemberList() {
    // 토큰 가져오기
    const token = window.localStorage.getItem("accessToken");

    // 팀원 목록 API
    const memberListURL = `https://withsports.shop:8000/team-service/teamusers/${teamId}`;

    const response = await fetch(memberListURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: MemberListResponse) => {
        setMemberJSON(data);
        setIsMemberListLoaded(true);
      });
  }

  return (
    <div>
      <Button onClick={getMemberList}>팀원 목록 불러오기</Button>
      {isMemberListLoaded && (
        <table>
          <thead>
            <tr>
              <th>사진</th>
              <th>닉네임</th>
              <th>소개</th>
              <th>역할</th>
              <th>지역</th>
              <th>승률</th>
              <th>티어</th>
            </tr>
          </thead>
          <tbody>
            {memberJSON.data.map((member: Member) => (
              <tr key={member.userId}>
                <th>
                  <img
                    src={member.profileImage}
                    alt="profileImage"
                    width={40}
                    height={40}
                  />
                </th>
                <th>{member.nickname}</th>
                <th>{member.introduction}</th>
                <th>{member.role}</th>
                <th>{member.area}</th>
                <th>{member.winRate}%</th>
                <th>{member.tier} 티어</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
