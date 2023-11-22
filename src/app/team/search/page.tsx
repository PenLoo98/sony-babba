"use client";
import { useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import ApplyTeam from "../teamComponent/ApplyTeam";

type SearchTeamResponse = {
  code: string;
  message: string;
  data: Array<TeamSpecificProps>;
};

type TeamSpecificProps = {
  id: number;
  leaderId: number;
  leaderName: string;
  teamName: string;
  introduction: string;
  area: string;
  sports: string;
  imageUrl: string;
  teamMemberCount: number;
};

export default function TeamSpecific() {
  // TODO: 팀 가입 API 테스트 (API 미구현)
  // TODO: 팀 가입 API 테스트 (성공 응답 테스트만 하기))

  // 팀 메인 페이지 그리드 스타일
  const teamMainStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 0.5fr",
    gap: "10px 10px",
    gridTemplateAreas: `
      ". . . ."
      ". . . ."
      `,
  };

  // 2. 검색할 팀명
  const [searchTeam, setSearchTeam] = useState("");
  const typeTeamName = (e: any) => {
    e.preventDefault();
    setSearchTeam(e.target.value);
  };

  // 2-1. 검색한 팀 결과
  // 초기 데이터
  let initialSearchTeam: SearchTeamResponse = {
    code: "",
    message: "",
    data: [
      {
        id: 0,
        leaderId: 0,
        leaderName: "팀장",
        teamName: "팀이름",
        introduction: "소개",
        area: "지역",
        sports: "종목",
        imageUrl: "/team-default-image.png",
        teamMemberCount: 0,
      },
    ],
  };
  // 2-2. 팀 검색 결과 저장
  const [searchTeamResult, setSearchTeamResult] =
    useState<SearchTeamResponse>(initialSearchTeam);
  // 2-3. 팀 검색 결과 보여주기
  const [showTeamResult, setShowTeamResult] = useState(false);

  // 2-5. 팀 검색 fetch
  async function searchTeamName() {
    // TODO: 팀 검색 fetch 구현하기
    // 팀 검색 API
    const searchTeamURL = `https://withsports.shop:8000/team-service/team/teamname/${searchTeam}`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 팀 검색 fetch
    let response = await fetch(searchTeamURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: SearchTeamResponse) => {
        console.log(data);
        if (data.data) {
          alert("팀 검색에 성공했습니다.");
          setSearchTeamResult(data);
          setShowTeamResult(true);
        } else if (data.data == null) {
          alert("검색 결과가 없습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  return (
    <div className="teamSpecific">
      <div className="teamMain" style={teamMainStyle}>
        <Image src="/team-main.png" alt="team" width={180} height={180} />
        {/* 팀 검색 결과 */}
        <div
          className="team-search"
          style={{ display: "flex", alignContent: "center" }}
        >
          <TextField
            id="outlined-basic"
            label="팀 검색"
            variant="outlined"
            value={searchTeam}
            onChange={typeTeamName}
            style={{ margin: "10px 0 10px 0" }}
          />
          <Image
            onClick={searchTeamName}
            src="/search.png"
            alt="search"
            width={40}
            height={40}
            style={{
              justifyContent: "center",
              alignContent: "center",
              margin: "10px 0 0 10px",
            }}
          />
        </div>
        {/* 팀 검색 결과 보여주기 */}
        {showTeamResult && (
          <div>
            <table style={{ marginTop: "40px" }}>
              <thead>
                <tr style={{ backgroundColor: "deepskyblue" }}>
                  <th style={{ color: "black", padding: "10px" }}>팀 이미지</th>
                  <th style={{ color: "black", padding: "10px" }}>팀 이름</th>
                  <th style={{ color: "black", padding: "10px" }}>팀장</th>
                  <th style={{ color: "black", padding: "10px" }}>팀 소개</th>
                  <th style={{ color: "black", padding: "10px" }}>지역</th>
                  <th style={{ color: "black", padding: "10px" }}>종목</th>
                  <th style={{ color: "black", padding: "10px" }}>멤버 수</th>
                  <th style={{ color: "black", padding: "10px" }}>가입</th>
                </tr>
              </thead>

              <tbody>
                {searchTeamResult.data.map((team: TeamSpecificProps) => (
                  <tr key={team.id}>
                    <td>
                      <img
                        src={team.imageUrl}
                        alt={team.teamName}
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>{team.teamName}</td>
                    <td>{team.leaderName}</td>
                    <td>{team.introduction}</td>
                    <td>{team.area}</td>
                    <td>{team.sports}</td>
                    <td>{team.teamMemberCount}</td>
                    <td>
                      <ApplyTeam teamId={team.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
