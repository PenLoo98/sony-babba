"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import IsLeader from "../teamComponent/IsLeader";
import TypeValid from "@/components/TypeValid";
import { Button } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
import MemberList from "../teamComponent/MemberList";
import EditTeamProfile from "../teamComponent/EditTeamProfile";
import ShowApplyList from "../teamComponent/showApplyList";

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
  pageable?: Array<TeamMember>;
  imageUrl: string;
};

type TeamMember = {
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

// TODO: 팀 해체 - 팀 해체버튼 API 테스트
// TODO: 팀 탈퇴 - 팀 탈퇴버튼 API 테스트
// TODO: 팀 프로필 수정 - 팀 프로필 수정 API 테스트
// TODO: 팀원 제명 구현 - 팀원 제명 API 테스트
// TODO: 팀원 목록 조회 - API 테스트

// 여기부터 시작하기!!
// TODO: 팀원 신청 목록 조회 구현
// TODO: 팀원 신청 수락/거절 구현
// TODO: 팀 매칭 일정 보기 구현

export default function ShowTeamPage({ params }: { params: PageParams }) {
  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  // 팀장 여부
  const [isLeader, setIsLeader] = useState(false);

  // 0. 팀 정보 불러오기
  const getTeamInfoURL: string = `https://withsports.shop:8000/team-service/team/${params.id}`;

  // 0-1. 팀 정보를 불러왔는지 여부
  // TODO: 테스트 하러 true로 바꿔놓음 -> 끝나면 false로 바꿔놓기
  const [showTeamInfo, setShowTeamInfo] = useState(true);

  // 0-2. 팀 정보 저장할 useState
  let initialData: TeamInfo = {
    id: 0,
    teamName: "",
    leaderNickname: "",
    introduction: "",
    area: "",
    sports: "",
    teamMemberCount: 0,
    pageable: [
      {
        teamId: 0,
        userId: 0,
        nickname: "김",
        introduction: "안녕하세요",
        role: "팀장",
        profileImage: "/team-default-image.png",
        area: "서울",
        winRate: 50,
        tier: "골드",
        mvpCount: 2,
      },
      {
        teamId: 0,
        userId: 1,
        nickname: "박",
        introduction: "반갑습니다",
        role: "부팀장",
        profileImage: "/default-profile.png",
        area: "서울",
        winRate: 50,
        tier: "골드",
        mvpCount: 1,
      },
    ],
    imageUrl: "",
  };
  const [data, setData] = useState<TeamInfo>(initialData);

  // 0-3. 팀 정보 불러오는 함수
  async function getTeamInfo() {
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
        console.log("data:");
        console.log(data);
        // TODO: 없는 teamId 요청
        // TODO: 잘못된 요청
        if (data.code === "SUCCESS") {
          console.log("팀 정보를 불러오는데 성공했습니다.");
          return data;
        } else if (data.code === "ERROR") {
          console.log("없는 팀 정보입니다.");
          alert("없는 팀 정보입니다.");
        } else {
          console.log("팀 정보를 불러오는데 실패했습니다.");
        }
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

  // 1. 팀 해체
  // 1-1 팀 해체 Modal
  const [showDisbandModal, setShowDisbandModal] = useState(false);
  // 1-2 팀 해체 함수
  async function fetchDisbandTeam() {
    // TODO:팀 아이디 가져오기
    const teamId = params.id;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // TODO: 팀 해체 신청 API 호출
    const teamDisbandAPI = `http://withsports.shop:8000/team-service/team/${teamId}`;

    const response = await fetch(teamDisbandAPI, {
      method: "DELETE",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("팀 해체 신청 성공");
          setShowDisbandModal(false);
          alert("팀 해체 신청이 완료되었습니다.");
          location.href = "/team/main";
        } else {
          console.log("팀 해체 신청 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 2. 팀 탈퇴
  // 2-1. 팀 탈퇴 Modal
  const [showResignModal, setShowResignModal] = useState(false);
  // 2-2. 팀 탈퇴 함수
  async function fetchResignTeam() {
    // TODO:팀 아이디 가져오기
    const teamId = params.id;

    // TODO: 팀 이름 가져오기 (선택사항)

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // TODO: 팀 탈퇴 신청 API 호출
    const teamResignAPI = `https://withsports.shop:8000/team-service/teamuser/${teamId}`;

    const response = await fetch(teamResignAPI, {
      method: "DELETE",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("팀 탈퇴 신청 성공");
          setShowResignModal(false);
        } else {
          console.log("팀 탈퇴 신청 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  // 4. 팀원 목록 조회
  // 4-1. 팀원 목록 조회 접기/펼치기
  const [showMemberList, setShowMemberList] = useState(false);

  // 7. 팀원 신청 수락
  // 7-1. 팀원 신청 정보 저장
  const [applyUserId, setApplyUserId] = useState<number>(0);
  const [applyTeamId, setApplyTeamId] = useState<number>(0);

  // TODO: 7-2. 팀원 신청 수락 fetch
  async function fetchAcceptApply() {
    // const acceptApplyAPI = `https://withsports.shop:8000/team-service/team/${teamId}/teamUser/acceptance/${userId}`;
  }

  // 8. 팀원 신청 거절
  // 9. 팀 매칭 일정 보기

  useEffect(() => {
    async function fetchTeamData() {
      let teamInfo = await getTeamInfo();
      if (teamInfo) {
        console.log("teamInfo:");
        console.log(teamInfo);
        setData(teamInfo);
        setShowTeamInfo(true);
        console.log("data:");
        console.log(data);
        console.log("data.imageUrl:");
        console.log(data.imageUrl);
      }
    }
    fetchTeamData();
  }, []);

  return (
    <div>
      <IsLeader
        teamId={params.id}
        isLeader={isLeader}
        setIsLeader={setIsLeader}
      >
        {!showTeamInfo && <div>팀 정보를 불러오는 중입니다...</div>}
        {showTeamInfo && (
          <div>
            <Image
              src={data.imageUrl}
              alt="팀 이미지"
              width={200}
              height={200}
            />
            <h1>팀 페이지</h1>
            <h2>팀 이름: {data.teamName}</h2>
            <h2>팀장 이름: {data.leaderNickname}</h2>
            <h2>팀 소개: {data.introduction}</h2>
            <h2>팀 지역: {data.area}</h2>
            <h2>팀 종목: {data.sports}</h2>
            <h2>팀 인원 수: {data.teamMemberCount}</h2>

            {isLeader && (
              <div>
                {/* 팀 프로필 수정 */}
                <EditTeamProfile teamId={params.id} sports={data.sports}/>

                {/* 가입 신청 조회 */}
                <ShowApplyList teamId={params.id} />

                {/* 팀 해체 */}
                <Button
                  variant="text"
                  onClick={() => {
                    setShowDisbandModal(!showDisbandModal);
                  }}
                  style={{ color: "red" }}
                >
                  팀 해체
                </Button>
                <ModalCustom
                  show={showDisbandModal}
                  setShow={setShowDisbandModal}
                >
                  <h1>팀 해체</h1>
                  <TypeValid
                    buttonText="팀 해체"
                    validText={`${data.teamName}/해체한다`}
                    onClick={fetchDisbandTeam}
                  />
                </ModalCustom>
              </div>
            )}
            {/* 팀 탈퇴 */}
            {!isLeader && (
              <div>
                <Button
                  variant="text"
                  onClick={() => {
                    setShowResignModal(!showResignModal);
                  }}
                  style={{ color: "red" }}
                >
                  팀 탈퇴
                </Button>
                <ModalCustom
                  show={showResignModal}
                  setShow={setShowResignModal}
                >
                  <h1>팀 탈퇴</h1>
                  <TypeValid
                    buttonText="팀 탈퇴"
                    validText={`${data.teamName}/해체한다`}
                    onClick={fetchResignTeam}
                  />
                </ModalCustom>
              </div>
            )}

            {/* 팀원 목록 조회 */}
            {/* TODO: 팀원의 프로필+이미지만 보여주고 누르면 자세한 정보 보여주도록 구현 */}
            <h2
              onClick={() => {
                setShowMemberList(!showMemberList);
              }}
            >
              {"->"} 팀원 목록
            </h2>
            {showMemberList && (
              <MemberList
                teamId={params.id}
                isLeader={isLeader}
                setIsLeader={setIsLeader}
                memberJSON={data.pageable}
              />
            )}
          </div>
        )}
      </IsLeader>
    </div>
  );
}
