"use client";
import Image from "next/image";
import { useState } from "react";

type PageParams = {
  id: number;
};

export default function ShowTeam({ params }: { params: PageParams }) {
  const getTeamInfoURL: string = `https://withsports.shop:8000/team-service/team/${params.id}`;

  const [showTeamInfo, setShowTeamInfo] = useState(false);
  // TODO: 응답값에서 팀 정보 가져오기
  const data = getTeamInfo(getTeamInfoURL);

  async function getTeamInfo(getTeamInfoURL: string) {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
  
    const response = await fetch(getTeamInfoURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // 응답이 성공적으로 왔을 때
        if (res.status === 200) {
          console.log("팀 정보 조회에 성공했습니다.");
          setShowTeamInfo(true);
          return res.body !== null ? res.text().then(JSON.parse) : null;
        } else {
          console.log("팀 정보 조회에 실패했습니다.");
          console.log(res);
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }
  

  return (
    <div>
      {!showTeamInfo && <div>팀 정보를 불러오는 중입니다...</div>}
      {showTeamInfo && (
        <div>
          <h1>팀 정보를 불러오는데 성공했습니다.</h1>
          {/* <Image
    src={data.imageUrl}
    alt="팀 이미지"
    width={200}
    height={200}
  />
  <h1>팀 페이지</h1>
  <h2>팀 이름: {data.teamName}</h2>
  <h2>팀 소개: {data.introduction}</h2>
  <h2>팀 지역: {data.area}</h2>
  <h2>팀 스포츠: {data.sports}</h2>
  <h2>팀 이미지: {data.image}</h2>
  <h2>팀 인원 수: {data.teamMemberCount}</h2> */}
        </div>
      )}
    </div>
  );
}
