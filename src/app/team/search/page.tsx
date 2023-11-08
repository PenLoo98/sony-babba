"use client";
import { useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";

type SearchTeamInfo = {
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
  let initialSearchTeam: SearchTeamInfo = {
    data: [
      {
        id: 0,
        leaderId: 0,
        leaderName: "위스",
        teamName: "손이바빠",
        introduction: "반갑습니다",
        area: "지역",
        sports: "종목",
        imageUrl: "/team-default-image.png",
        teamMemberCount: 0,
      },
    ],
  };
  // 2-2. 팀 검색 결과 저장
  const [searchTeamResult, setSearchTeamResult] =
    useState<SearchTeamInfo>(initialSearchTeam);
  // 2-3. 팀 검색 결과 보여주기
  const [showTeamResult, setShowTeamResult] = useState(false);

  // 2-5. 팀 검색 fetch
  async function searchTeamName() {
    // TODO: 팀 검색 fetch 구현하기
    // 팀 검색 API
    const searchTeamURL = `http://withsports.shop:8000/team-service/team/search/${searchTeam}`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 테스트 코드
    console.log("팀 검색: " + searchTeam);
    setShowTeamResult(true);

    // 팀 검색 fetch
    fetch(searchTeamURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          // TODO: 분기조건 수정하기
          alert("검색 결과가 없습니다.");
        } else {
          alert("팀 검색에 성공했습니다.");
          setSearchTeamResult(data);
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  // 3. 팀 가입 신청
  // 3-1. 팀 가입 모달창 보여주기
  const [showJoinModal, setShowJoinModal] = useState(false);
  const showJoinPage = () => {
    setShowJoinModal(!showJoinModal);
  };

  // 3-2. 자기소개 입력 저장
  const [typeIntro, setTypeIntro] = useState("");
  const changeIntro = (e: any) => {
    e.preventDefault();
    setTypeIntro(e.target.value);
  };

  // 3-3. 팀 가입 teamId 저장
  const [applyTeamId, setApplyTeamId] = useState(0);

  // 3-3. 팀 가입 API
  async function joinTeam() {
    const joinTeamURL = `https://withsports.shop:8000/team-service/teamuser`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 테스트 코드
    console.log("팀 가입 teamId: " + applyTeamId);
    console.log("팀 가입 introduction: " + typeIntro);

    // BODY에 담을 정보
    let teamId: number = applyTeamId
    let introduction: string = typeIntro;

    const joinTeamUserRequest = {
      teamId,
      introduction,
    };

    // 팀 가입 fetch
    fetch(joinTeamURL, {
      method: "POST",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(joinTeamUserRequest),
    })
      .then((res) => {
        // TODO: 응답 status에 맞춰서 처리하는지 확인하기
        if (res.status == 200) {
          alert("팀 가입 신청에 성공했습니다.");
          setTypeIntro("");
          console.log(res);
        } else if (res.status == 409) {
          alert("없는 팀입니다.");
          console.log(res);
        } else {
          alert("팀 가입 신청에 실패했습니다.");
          console.log(res);
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
            {
              <div>
                {searchTeamResult.data.map((team) => (
                  <div key={team.id}>
                  <h1>{team.teamName} 팀</h1>
                  <h2>팀장: {team.leaderName}</h2>
                  <p>{team.introduction}</p>
                  <Image
                    src={team.imageUrl}
                    alt={team.teamName}
                    width={100}
                    height={100}
                  />
                  <p>Area: {team.area}</p>
                  <p>Sports: {team.sports}</p>
                  <p>Team Members: {team.teamMemberCount}</p>
                  <Button onClick={showJoinPage}>가입하기</Button>
                  <ModalCustom show={showJoinModal} setShow={setShowJoinModal}>
                    <div className="joinTeam">
                      <h1>팀 가입 신청</h1>
                      <TextField
                        id="outlined-basic"
                        label="자기소개"
                        variant="outlined"
                        value={typeIntro}
                        onChange={changeIntro}
                        style={{ margin: "10px 0 10px 0" }}
                        multiline
                        rows={3}
                      />
                      <p>팀 가입 신청을 하시겠습니까?</p>
                      <Button onClick={()=>{
                        setApplyTeamId(team.id);
                        setTypeIntro(typeIntro);
                        joinTeam}
                      }>가입 신청하기</Button>
                    </div>
                  </ModalCustom>
                  </div>
                ))
                }


              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}
