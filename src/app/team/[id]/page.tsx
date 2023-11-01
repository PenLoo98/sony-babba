"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type PageParams = {
  id: number;
};

interface TeamInfo {
  id: number;
  teamName: string;
  leaderNickname: string;
  introduction: string;
  area: string;
  sports: string;
  teamMemberCount: number;
  pageable: string[];
  imageUrl: string;
}

export default function ShowTeam({ params }: { params: PageParams }) {
  const getTeamInfoURL: string = `https://withsports.shop:8000/team-service/team/${params.id}`;
  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  // 팀 정보를 불러왔는지 여부
  const [showTeamInfo, setShowTeamInfo] = useState(false);
  // 팀 정보
  const [data, setData] = useState({});

  // TODO: 응답값에서 팀 정보 가져오기
  useEffect(() => {
    async function fetchTeamData() {
      let teamInfo = await getTeamInfo(getTeamInfoURL);
      if (teamInfo) {
        console.log("teamInfo.data:");
        console.log(teamInfo);
        setData(teamInfo);
      }
      console.log("teamInfo:");
    }
    fetchTeamData();
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
      .then(res => res.text())
      .then((data) => {
        console.log("data:");
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });

    let body;
    if (response) {
      body = await JSON.parse(response).data;
      console.log("body:");
      console.log(body);
      return body;
    } else {
      console.log("응답이 없습니다.");
      return null;
    }
  }

  return (
    <div>
      {!showTeamInfo && <div>팀 정보를 불러오는 중입니다...</div>}
      {showTeamInfo && (
        <div>
          <h1>팀 정보를 불러오는데 성공했습니다.</h1>
          {/* <Image src={data.imageUrl} alt="팀 이미지" width={200} height={200} />
          <h1>팀 페이지</h1>
          <h2>팀 이름: {data.teamName}</h2>
          <h2>팀장 이름: {data.leaderNickname}</h2>
          <h2>팀 소개: {data.introduction}</h2>
          <h2>팀 지역: {data.area}</h2>
          <h2>팀 종목: {data.sports}</h2>
          <h2>팀 인원 수: {data.teamMemberCount}</h2>
          <h2>팀원 목록: {data.pageable}</h2> */}
        </div>
      )}
    </div>
  );
}
