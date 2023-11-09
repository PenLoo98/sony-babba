"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import IsLeader from "../teamComponent/IsLeader";
import TypeValid from "@/components/TypeValid";
import { Button, TextField } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
import InsertTeamImage from "../teamComponent/InsertTeamImage";
import SelectArea from "../teamComponent/SelectArea";
import SelectSports from "../teamComponent/SelectSports";
import MemberList from "../teamComponent/MemberList";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EditIcon from "@mui/icons-material/Edit";

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
    // 테스트 코드
    // alert("팀 해체 신청이 완료되었습니다.");
    // setShowDisbandModal(false);

    // TODO:팀 아이디 가져오기
    // teamInfo에서 가져오기
    const teamId = 1;

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
    // 테스트 코드
    alert("팀 탈퇴 신청이 완료되었습니다.");
    setShowResignModal(false);

    // TODO:팀 아이디 가져오기
    // 팀 아이디 가져오기
    const teamId = 1;

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

  // 3. 팀 프로필 수정
  // 3-1. 팀 프로필 수정 Modal
  const [showEditModal, setShowEditModal] = useState(false);
  // 3-2. 팀 프로필 수정 값 저장
  type EditTeamInfo = {
    teamImage: string;
    teamName: string;
    introduction: string;
    area: string;
    sports: string;
  };

  const [editTeamImage, setEditTeamImage] = useState<string>(
    "/team-default-image.png"
  );
  const [editTeamName, setEditTeamName] = useState<string>("");
  const [editIntroduction, setEditIntroduction] = useState<string>("");
  const [editArea, setEditArea] = useState<string>("");
  const [editSports, setEditSports] = useState<string>("");
  function handleEditTeamNameChange(e: any) {
    setEditTeamName(e.target.value);
  }
  function handleEditIntroductionChange(e: any) {
    setEditIntroduction(e.target.value);
  }

  // TODO: 팀 프로필 수정 구현하기
  // 3-3. 팀 프로필 수정 Fetch 함수
  async function fetchEditTeam() {
    // 테스트 코드
    alert("팀 프로필 수정 신청이 완료되었습니다.");
    console.log("editTeamImage: " + editTeamImage);
    console.log("editTeamName: " + editTeamName);
    console.log("editIntroduction: " + editIntroduction);
    console.log("editArea: " + editArea);
    console.log("editSports: " + editSports);

    setShowEditModal(false);
  }

  // 4. 팀원 목록 조회
  // 4-1. 팀원 목록 조회 접기/펼치기
  const [showMemberList, setShowMemberList] = useState(false);

  // 5. 팀원 제명
  // MemberList.tsx에서 구현함

  // 6. 팀원 신청 목록 조회
  // 6-1. 팀원 신청 목록 조회 Modal
  const [showApplyListModal, setShowApplyListModal] = useState(false);
  // 6-2. 팀원 신청 목록 조회 값 저장

  // 6-3. 팀원 신청 목록 조회 fetch 함수
  async function fetchApplyList() {
    // 테스트 코드
    alert("팀원 신청 목록 조회가 완료되었습니다.");
    // setShowApplyListModal(true);
  }

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
      <IsLeader isLeader={isLeader} setIsLeader={setIsLeader}>
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
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowEditModal(!showEditModal);
                  }}
                  startIcon={<EditIcon />}
                >
                  팀 프로필 수정
                </Button>
                <ModalCustom show={showEditModal} setShow={setShowEditModal}>
                  <div>
                    <h1>팀 프로필 수정</h1>
                    <InsertTeamImage
                      teamImage={editTeamImage}
                      setTeamImage={setEditTeamImage}
                    />
                    <TextField
                      id="outlined-basic"
                      label="팀 이름"
                      variant="outlined"
                      value={editTeamName}
                      onChange={handleEditTeamNameChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="팀 소개"
                      variant="outlined"
                      multiline
                      rows={3}
                      value={editIntroduction}
                      onChange={handleEditIntroductionChange}
                    />
                    <SelectArea area={editArea} onAreaChange={setEditArea} />
                    <SelectSports
                      sports={editSports}
                      setSports={setEditSports}
                    />
                    <Button onClick={fetchEditTeam}>수정 제출</Button>
                  </div>
                </ModalCustom>

                {/* 가입 신청 조회 */}
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowApplyListModal(!showApplyListModal);
                  }}
                  startIcon={<HandshakeIcon />}
                  style={{ backgroundColor: "#7CE24B", color: "black" }}
                >
                  가입 신청 조회
                </Button>
                <ModalCustom
                  show={showApplyListModal}
                  setShow={setShowApplyListModal}
                >
                  <div>
                    <h1>팀 가입 신청 목록</h1>
                    {/* TODO:팀 가입 신청 목록 fetch */}
                    {/* TODO:팀 가입 신청 목록 데이터 표시 */}
                    {/* TODO:팀 가입 신청 목록 신청/수락 처리 */}
                  </div>
                </ModalCustom>

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
                    validText="손이바빠/해체한다"
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
                    validText="손이바빠/탈퇴한다"
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
