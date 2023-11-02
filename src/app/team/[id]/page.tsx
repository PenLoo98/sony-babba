"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type PageParams = {
  id: number;
};

type TeamInfo = {
  id: number;
  teamName: string;
  leaderNickname?: string;
  introduction: string;
  area: string;
  sports: string;
  teamMemberCount: number;
  pageable?: string[];
  imageUrl: string;
};

export default function ShowTeam({ params }: { params: PageParams }) {
  const getTeamInfoURL: string = `https://withsports.shop:8000/team-service/team/${params.id}`;
  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  // 팀 정보를 불러왔는지 여부
  const [showTeamInfo, setShowTeamInfo] = useState(false);

  // // 팀 정보 더미데이터
  // const initialData: TeamInfo = {
  //   id: 2,
  //   teamName: "asdf",
  //   introduction: "asdf",
  //   area: "충청남도",
  //   sports: "축구",
  //   imageUrl:
  //     "https://with-sports-s3.s3.ap-northeast-2.amazonaws.com/static/28972b8c-4f45-408a-88e9-90f3233760d3teamImage.jpg",
  //   teamMemberCount: 1,
  // };

  // // 팀 정보 저장할 useState
  let initialData: TeamInfo = {
    id: 0,
    teamName: "",
    leaderNickname: "",
    introduction: "",
    area: "",
    sports: "",
    teamMemberCount: 0,
    pageable: [],
    imageUrl: "",
  };
  const [data, setData] = useState<TeamInfo>(initialData);

  async function getTeamInfo(getTeamInfoURL: string) {
    const response = await fetch(getTeamInfoURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data:");
        // console.log(data);
        if (data.code === "SUCCESS") {
          console.log("팀 정보를 불러오는데 성공했습니다.");
        } else {
          console.log("팀 정보를 불러오는데 실패했습니다.");
        }
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });

    // 응답값 확인
    let body: TeamInfo;
    if (response) {
      body = await response.data;
      console.log("body:");
      console.log(body);
      return body;
    } else {
      console.log("응답이 없습니다.");
      return null;
    }
  }

  useEffect(() => {
    async function fetchTeamData() {
      let teamInfo = await getTeamInfo(getTeamInfoURL);
      if (teamInfo) {
        console.log("teamInfo:");
        console.log(teamInfo);
        setShowTeamInfo(true);
        setData(teamInfo);
        console.log("data:");
        console.log(data);
        console.log("data.imageUrl:");
        console.log(data.imageUrl);
      }
    }
    fetchTeamData();

    // // 테스트 코드
    // setShowTeamInfo(true);
  }, []);

  return (
    <div>
      {showTeamInfo && <div>팀 정보를 불러오는 중입니다...</div>}
      {!showTeamInfo && (
        <div>
          <h1>팀 정보를 불러오는데 성공했습니다.</h1>
          <Image src={data.imageUrl} alt="팀 이미지" width={200} height={200} />
          <h1>팀 페이지</h1>
          <h2>팀 이름: {data.teamName}</h2>
          <h2>팀장 이름: {data.leaderNickname}</h2>
          <h2>팀 소개: {data.introduction}</h2>
          <h2>팀 지역: {data.area}</h2>
          <h2>팀 종목: {data.sports}</h2>
          <h2>팀 인원 수: {data.teamMemberCount}</h2>
          <h2>팀원 목록: {data.pageable}</h2>
        </div>
      )}
    </div>
  );
}
