"use client";
import { use, useEffect } from "react";
import Image from "next/image";

type PageParams = {
  id: number;
};

export default function ShowTeam({ params }: { params: PageParams }) {
  const getTeamInfoURL = `https://withsports.shop:8000/team-service/team/${params.id}`;

  async function getTeamInfo() {
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
        if (res.status === 200) {
          console.log("팀 정보 조회에 성공했습니다.");
          console.log(res);
          console.log(res.json());      
          res.json().then(responseData => {
            console.log(responseData.data);
            const input = responseData.data;
            return (
              <div>
                <Image
                  src={input.imageUrl}
                  alt="팀 이미지"
                  width={200}
                  height={200}
                />
                <h1>팀 페이지</h1>
                <h2>팀 이름: {input.teamName}</h2>
                <h2>팀 소개: {input.introduction}</h2>
                <h2>팀 지역: {input.area}</h2>
                <h2>팀 스포츠: {input.sports}</h2>
                <h2>팀 이미지: {input.image}</h2>
                <h2>팀 인원 수: {input.teamMemberCount}</h2>
              </div>
            );
          });
        } else {
          console.log("팀 정보 조회에 실패했습니다.");
          console.log(res);
          return <div>팀 정보 조회에 실패했습니다.</div>;
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  useEffect(() => {
    getTeamInfo();
  }, []);
}
