"use client";
import { useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import SelectSports from "../teamComponent/SelectSports";
import SelectArea from "@/app/auth/AuthComponent/SelectArea";
import InsertTeamImage from "../teamComponent/InsertTeamImage";
import CheckTeamName from "../teamComponent/CheckTeamName";
import TeamRanking from "../teamComponent/TeamRanking";
import CheckSports from "../teamComponent/CheckSports";
export default function TeamSpecific() {
  // 팀 메인 페이지 그리드 스타일
  const teamMainStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 0.5fr",
    gridTemplateRows: "1fr 0.5fr",
    gap: "10px 10px",
    gridTemplateAreas: `
      ". . . ."
      ". . . ."
      `,
  };

  // 팀 생성 모달
  const [showForm, setShowForm] = useState(false);
  const createTeam = () => {
    setShowForm(true);
  };

  // 팀 이름
  const [teamName, setTeamName] = useState("");
  const changeTeamName = (e: any) => {
    setTeamName(e.target.value);
    console.log(teamName);
  };

  // 팀 이름 확인
  const [validName, setValidName] = useState(false);

  // 팀 종목
  const [sports, setSport] = useState("");
  const onSportChange = (selectedSports: string) => {
    setSport(selectedSports);
  };

  // 팀 종목 확인
  const [validSports, setValidSports] = useState(false);

  // 팀 지역
  const [area, setArea] = useState("");
  const onAreaChange = (selectedArea: string) => {
    setArea(selectedArea);
  };

  // 팀 소개
  const [teamIntro, setTeamIntro] = useState("");
  const changeTeamIntro = (e: any) => {
    setTeamIntro(e.target.value);
  };

  // 팀 이미지
  const [teamImage, setTeamImage] = useState("/team-default-image.png");

  // 팀 생성 제출
  async function postTeamInfo() {
    // TODO: 팀 생성 제출 fetch 구현하기
    // console.log(
    //   JSON.stringify({ image: teamImage, teamName, sports, area, introduction: teamIntro })
    // );
    // TODO: 팀 생성 API 정하기
    const createTeamURL = "https://withsports.shop:8000/team-service/team";

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // FormTeamData 생성
    const TeamInfoFormData = new FormData();

    let CreateTeamRequest = {
      teamName: teamName,
      sports: sports,
      area: area,
      introduction: teamIntro,
    };

    // 제출할 팀 이미지
    let teamImageFile: File = new File([teamImage], "teamImage.jpg");

    // FormTeamData에 데이터 추가
    TeamInfoFormData.append(
      "CreateTeamRequest",
      new Blob([JSON.stringify(CreateTeamRequest)], {
        type: "application/json",
      })
    );
    TeamInfoFormData.append("image", teamImageFile);

    fetch(createTeamURL, {
      method: "POST",
      headers: {
        Credentials: "include",
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: TeamInfoFormData,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("팀 생성에 성공했습니다.");
          console.log(res);
        } else {
          alert("팀 생성에 실패했습니다.");
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

        {/* 팀 팀원 검색 */}
        <Button
          className="teamMemberSearch"
          variant="outlined"
          startIcon={<SearchIcon />}
          href="/team/search"
        >
          팀/ 팀원 검색
        </Button>
      </div>
      <Button
        variant="outlined"
        onClick={createTeam}
        style={{ margin: "10px 0 10px 0", gridColumnStart: "2" }}
      >
        팀 생성
      </Button>

      {/* 팀 생성 모달 */}
      <ModalCustom show={showForm} setShow={setShowForm}>
        <h1>팀 생성</h1>
        <InsertTeamImage teamImage={teamImage} setTeamImage={setTeamImage} />
        <div
          className="teamNameVaild"
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            id="outlined-basic"
            label="팀 이름"
            variant="outlined"
            value={teamName}
            onChange={changeTeamName}
            style={{ margin: "10px 0 10px 0" }}
          />
          <CheckTeamName teamname={teamName} setValidName={setValidName} />
        </div>

        <div
          className="teamSports"
          style={{ display: "flex", alignItems: "center" }}
        >
          <SelectSports sports={sports} onSportChange={onSportChange} />
          <CheckSports sports={sports} setValidSports={setValidSports} />
        </div>

        <br />
        <SelectArea area={area} onAreaChange={onAreaChange} />
        <TextField
          id="outlined-basic"
          label="팀 소개"
          variant="outlined"
          value={teamIntro}
          onChange={changeTeamIntro}
          multiline
          rows={4}
          style={{ margin: "10px 0 10px 0" }}
        />
        {validName && validSports ? (
          <Button
            variant="outlined"
            onClick={postTeamInfo}
            style={{ display: "flex", alignItems: "center" }}
          >
            팀 생성하기
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={postTeamInfo}
            style={{ display: "flex", alignItems: "center" }}
            disabled
          >
            팀 생성하기
          </Button>
        )}
      </ModalCustom>

      {/* 소속팀  */}
      <Button
        component="label"
        variant="contained"
        startIcon={<PersonIcon />}
        style={{ backgroundColor: "orange" }}
      >
        소속팀
      </Button>

      {/* 팀 관리 */}
      <Button
        component="label"
        variant="contained"
        startIcon={<GroupsIcon />}
        style={{ backgroundColor: "green" }}
      >
        팀 관리
      </Button>

      <div className="teamRanking">
        <TeamRanking />
      </div>
    </div>
  );
}
