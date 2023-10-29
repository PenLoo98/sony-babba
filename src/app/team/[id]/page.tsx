"use client";
import { useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
import SelectSports from "../teamComponent/SelectSports";
import SelectArea from "@/app/auth/AuthComponent/SelectArea";
import InsertTeamImage from "../teamComponent/InsertTeamImage";
import ValidToken from "@/components/Auth/ValidToken";
import CheckTeamName from "../teamComponent/CheckTeamName";
export default function TeamSpecific() {
  // 검색할 팀/팀원 명
  const [checkName, setCheckname] = useState("");
  const typeName = (e: any) => {
    setCheckname(e.target.value);
  };
  const searchName = (e: any) => {
    e.preventDefault();
    // 입력값 확인
    alert("입력한 닉네임: " + checkName);
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
  const [sport, setSport] = useState("");
  const onSportChange = (selectedSports: string) => {
    setSport(selectedSports);
  };

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
  function postTeamInfo() {
    // TODO: 팀 생성 제출 fetch 구현하기
    console.log(
      JSON.stringify({ teamImage, teamName, sport, area, teamIntro })
    );
    // TODO: 팀 생성 API 정하기
    // const url = "https://withsports.shop:8000/team-service/signup/profile";

    // // 액세스 토큰 가져오기
    // const localStorage: Storage = window.localStorage;
    // const token = localStorage.getItem("accessToken");
  }

  return (
    <div className="teamSpecific">
      <ValidToken />
      <Image src="/team-main.png" alt="team" width={180} height={180} />

      <div className="team-search">
        <TextField
          id="outlined-basic"
          label="팀/팀원 검색"
          variant="outlined"
          value={checkName}
          onChange={typeName}
          style={{ margin: "10px 0 10px 0" }}
        />
        <Image
          onClick={searchName}
          src="/search.png"
          alt="search"
          width={40}
          height={40}
          style={{ margin: "10px 0 0 10px" }}
        />
      </div>
      <Button
        variant="outlined"
        onClick={createTeam}
        style={{ margin: "10px 0 10px 0" }}
      >
        팀 생성
      </Button>
      <ModalCustom show={showForm} setShow={setShowForm}>
        <h1>팀 생성</h1>
        <InsertTeamImage teamImage={teamImage} setTeamImage={setTeamImage} />
        <div className="teamNameVaild" style={{display: "flex", alignItems: "center"}}>
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
        <SelectSports sport={sport} onSportChange={onSportChange} />
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
        {validName ? (
          <Button variant="outlined" onClick={postTeamInfo} style={{display: "flex", alignItems: "center"}}>
            팀 생성하기
          </Button>
        ) : (
          <Button variant="outlined" onClick={postTeamInfo} style={{display: "flex", alignItems: "center"}} disabled>
            팀 생성하기
          </Button>
        )}
      </ModalCustom>

      <h1>팀원 구인</h1>
      <h2>손이바빠: 판교에서 같이 축구하실 분들 구합니다.</h2>
    </div>
  );
}
