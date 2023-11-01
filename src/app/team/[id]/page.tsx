"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type PageParams = {
  id: number;
};

export default function ShowTeam({ params }: { params: PageParams }) {
  const getTeamInfoURL: string = `https://withsports.shop:8000/team-service/team/${params.id}`;
  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  const [showTeamInfo, setShowTeamInfo] = useState(false);
  const [data, setData] = useState({});

  // TODO: 응답값에서 팀 정보 가져오기
  useEffect(() => {
    getTeamInfo(getTeamInfoURL);
  }, []);

  async function getTeamInfo(getTeamInfoURL: string) {
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
        } else {
          console.log("팀 정보 조회에 실패했습니다.");
          console.log(res);
          setShowTeamInfo(false);
          return null;
        }
        res.text();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });

    let body;
    if (response) {
      body = await JSON.parse(response);
      console.log(body);
      setData(body);
      return body;
    } else {
      return null;
    }
  }

  return (
    <div>
      <h1>팀 정보를 불러오는 중입니다...</h1>
      {!showTeamInfo && <div>팀 정보를 불러오는 중입니다...</div>}
      {showTeamInfo && (
        <div>
          <h1>팀 정보를 불러오는데 성공했습니다.</h1>
          <Image src={data.data.imageUrl} alt="팀 이미지" width={200} height={200} />
          <h1>팀 페이지</h1>
          <h2>팀 이름: {data.data.teamName}</h2>
          <h2>팀장 이름: {data.data.leaderNickname}</h2>
          <h2>팀 소개: {data.data.introduction}</h2>
          <h2>팀 지역: {data.data.area}</h2>
          <h2>팀 종목: {data.data.sports}</h2>
          <h2>팀 인원 수: {data.data.teamMemberCount}</h2>
          <h2>팀원 목록: {data.data.pageable}</h2>
        </div>
      )}
    </div>
  );
}
