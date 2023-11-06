"use client";
import { useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ModalCustom from "@/components/ModalCustom";

type TeamSpecificProps = {
  id: number;
  teamName: string;
  leaderNickname: string;
  introduction: string;
  area: string;
  sports: string;
  imageUrl: string;
  pageable: Array<any>;
  teamMemberCount: number;
};

type MemberSpecificProps = {
  teamId: number;
  userId: number;
  nickname: string;
  introduction: string;
  role: string;
  profileImage: string;
  area: string;
  winRate: number;
  tier: string;
  mvpCount: number;
};

export default function TeamSpecific() {
  // TODO: 팀원 검색 API 테스트 (API 미구현)
  // TODO: 팀 가입 API 테스트 (API 미구현)
  // TODO: 팀 가입 API 테스트

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

  // 1. 검색할 팀원명
  const [searchMember, setSearchMember] = useState("");
  const typeMemberName = (e: any) => {
    e.preventDefault();
    setSearchMember(e.target.value);
  };

  // 1-1. 팀원 검색
  // 초기 데이터
  let initialMemberResult: MemberSpecificProps = {
    teamId: 0,
    userId: 0,
    nickname: "위스",
    introduction: "손이바빠요",
    role: "팀장",
    profileImage: "/default-profile.png",
    area: "서울",
    winRate: 70,
    tier: "1",
    mvpCount: 1,
  };
  // 1-2. 팀원 검색 결과 저장
  const [searchMemberResult, setSearchMemberResult] =
    useState<MemberSpecificProps>(initialMemberResult);
  // 1-3. 팀원 검색 결과 보여주기
  const [showMemberResult, setShowMemberResult] = useState(false);
  // 1-4. 팀원 배너만 보여주기
  const [showMemberBanner, setShowMemberBanner] = useState(false);
  const showMember = () => {
    if (showMemberBanner === false) {
      setShowMemberBanner(true);
      setShowTeamBanner(false);
      setShowTeamResult(false);
    }
  };

  // 1-5. 팀 검색 fetch
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

    // // 팀 검색 fetch
    // fetch(searchTeamURL, {
    //   method: "GET",
    //   headers: {
    //     Credentials: "include",
    //     ContentType: "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    // .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.length === 0) {
    //       // TODO: 분기조건 수정하기
    //       alert("검색 결과가 없습니다.");
    //       setShowMemberResult(false);
    //     } else {
    //       alert("팀 검색에 성공했습니다.");
    //       setSearchTeamResult(data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     throw new Error("서버 요청 실패!");
    //   });

    // 팀 검색결과 더미데이터
  }

  // 2. 검색할 팀명
  const [searchTeam, setSearchTeam] = useState("");
  const typeTeamName = (e: any) => {
    e.preventDefault();
    setSearchTeam(e.target.value);
  };

  // 2-1. 검색한 팀 결과
  // 초기 데이터
  let initialTeamResult: TeamSpecificProps = {
    id: 0,
    teamName: "손이바빠",
    leaderNickname: "위스",
    introduction: "반갑습니다",
    area: "지역",
    sports: "종목",
    imageUrl: "/team-default-image.png",
    pageable: [initialMemberResult],
    teamMemberCount: 0,
  };
  // 2-2. 팀 검색 결과 저장
  const [searchTeamResult, setSearchTeamResult] =
    useState<TeamSpecificProps>(initialTeamResult);
  // 2-3. 팀 검색 결과 보여주기
  const [showTeamResult, setShowTeamResult] = useState(false);

  // 2-4. 팀 배너만 보여주기
  const [showTeamBanner, setShowTeamBanner] = useState(false);
  const showTeam = () => {
    if (showTeamBanner === false) {
      setShowTeamBanner(true);
      setShowMemberBanner(false);
      setShowMemberResult(false);
    }
  };
  // 2-5. 팀원 검색 fetch
  async function searchMemberName() {
    // TODO: 팀원 검색 fetch 구현하기
    // TODO: 팀원 검색 API 수정하기
    const searchMemberURL = `http://withsports.shop:8000/team-service/team/search/${searchMember}`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 테스트 코드
    console.log("팀원 검색: " + searchMember);
    setShowMemberResult(true);

    // // 팀원 검색 fetch
    // fetch(searchMemberURL, {
    //   method: "GET",
    //   headers: {
    //     Credentials: "include",
    //     ContentType: "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.length === 0) {
    //       // TODO: 분기조건 수정하기
    //       alert("검색 결과가 없습니다.");
    //       setShowMemberResult(false);
    //     } else {
    //       alert("팀원 검색에 성공했습니다.");
    //       setSearchMemberResult(data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     throw new Error("서버 요청 실패!");
    //   });
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

  // 3-3. 팀 가입 API
  // TODO: 팀 가입 fetch 구현하기
  async function joinTeam() {
    const joinTeamURL = `https://withsports.shop:8000/team-service/teamuser`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 테스트 코드
    console.log("팀 가입 teamId: " + searchTeamResult.id);
    console.log("팀 가입 introduction: " + typeIntro);

    // BODY에 담을 정보
    let teamId: number = searchTeamResult.id;
    let introduction: string = typeIntro;
    
    const joinTeamUserRequest = {
      teamId,
      introduction,
    };

    // 팀 가입 fetch
    // TODO: 응답 처리 구현하기
    fetch(joinTeamURL, {
      method: "POST",
      headers: {
        'Credentials': "include",
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(joinTeamUserRequest),
    })
      .then((res) => {
        if (res.ok) {
          alert("팀 가입 신청에 성공했습니다.");
          setTypeIntro("");
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

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button startIcon={<PersonIcon />} onClick={showTeam}>
            팀
          </Button>
          <Button startIcon={<GroupsIcon />} onClick={showMember}>
            팀원
          </Button>
        </ButtonGroup>

        {/* 팀 검색 결과 */}
        {showTeamBanner && (
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
        )}
        {/* 팀 검색 결과 보여주기 */}
        {showTeamResult && (
          <div>
            {
              <div>
                <h1>{searchTeamResult.teamName}</h1>
                <h2>{searchTeamResult.leaderNickname}</h2>
                <p>{searchTeamResult.introduction}</p>
                <Image
                  src={searchTeamResult.imageUrl}
                  alt={searchTeamResult.teamName}
                  width={100}
                  height={100}
                />
                <p>Area: {searchTeamResult.area}</p>
                <p>Sports: {searchTeamResult.sports}</p>
                <p>Team Members: {searchTeamResult.teamMemberCount}</p>
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
                    <Button onClick={joinTeam}>가입 신청하기</Button>
                  </div>
                </ModalCustom>
              </div>
            }
          </div>
        )}

        {/* 팀원 검색 결과 */}
        {showMemberBanner && (
          <div className="member-search" style={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="팀원 검색"
              variant="outlined"
              value={searchMember}
              onChange={typeMemberName}
              style={{ margin: "10px 0 10px 0" }}
              fullWidth
            />
            <Image
              onClick={searchMemberName}
              src="/search.png"
              alt="search"
              width={40}
              height={40}
              style={{ margin: "10px 0 0 10px" }}
            />
          </div>
        )}

        {/* 팀원 검색 결과 보여주기 */}
        {showMemberResult && (
          <div>
            {
              <div>
                <h1>{searchMemberResult.nickname}</h1>
                <p>{searchMemberResult.introduction}</p>
                <Image
                  src={searchMemberResult.profileImage}
                  alt={searchMemberResult.nickname}
                  width={100}
                  height={100}
                />
                <p>Area: {searchMemberResult.area}</p>
                <p>Win Rate: {searchMemberResult.winRate}</p>
                <p>Tier: {searchMemberResult.tier}</p>
                <p>MVP Count: {searchMemberResult.mvpCount}</p>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}
