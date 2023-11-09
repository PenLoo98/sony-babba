"use client";
import Image from "next/image";
import { useEffect, useState } from "react";


type MatchInfo = {
    id : number;
    title : string; // 방 제목
    sports : string; // 운동 종목
    area : string; // 경기 지역
    capacity : number; // 수용 인원
  };
  
export default function MatchingPage(){
  const getTeamInfoURL: string = `https://withsports.shop:8000/matching-service/matchingrooms`;
  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");


  return (
    <div>
      매칭방 목록
    </div>
  );
}