"use client";

import React, { useEffect } from "react";

type Props = {
  teamId: number;
  isLeader: boolean;
  setIsLeader: (isLeader: boolean) => void;
  children: React.ReactNode;
};

/**팀 세부보기에서 팀장인지 확인 */
export default function IsLeader({teamId, isLeader, setIsLeader, children}: Props) {
  // TODO: 팀장 여부 확인하기
  // fetch를 통해 팀장 여부를 확인한다.
  async function getIsLeader() {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    
    let addTeamId: number = Number(teamId)+Number(1);

    const getIsLeaderAPI: string = `https://withsports.shop:8000/team-service/check/validation/teamLeader/${addTeamId}`

    const response = await fetch(getIsLeaderAPI, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:");
        console.log(data);
        if (data.data.message === "팀장이 아닙니다."){
          setIsLeader(false);
        }
        else if (data.data.code === "SUCCESS") {
          setIsLeader(true);
          console.log("팀 리더 확인에 성공했습니다.");
        } else {
          console.log("팀 리더 확인에 실패했습니다.");
          setIsLeader(false);
        }
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }
  useEffect(() => {
    getIsLeader();
  }, []);

  return (
    <div className="isLeader">
      <p>자격: {isLeader ? "팀장" : "팀원"}</p>
    {children}
    </div>
  );
}
