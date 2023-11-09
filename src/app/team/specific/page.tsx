"use client";
import { useState, useEffect } from "react";
import IsLeader from "../teamComponent/IsLeader";

// TODO: 접속한 유저의 teamId를 가져오기
// TODO: 종목별로 페이지 나눠야한다.
// 다른방법으로 teamId를 가져오는 방법이 있을까?
// 사용자 프로필 조회 API 호출
// const getUserProfileURL: string = "https://withsports.shop:8000/user-service/user/profile";

// TODO: 이 페이지의 역할: teadId를 받아 해당 팀 상세페이지를 보여줌
export default function SpecificTeam() {
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
  }, []);

  return (
    <IsLeader isLeader={isLeader} setIsLeader={setIsLeader}>
      <h1>userId에 맞는 teamId로 이동</h1>
    </IsLeader>
  );
}
