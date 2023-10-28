"use client";
import { useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
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
  const [show, setShow] = useState(false);
  const createTeam = () => {
    setShow(true);
  };

  // 팀 이름
  const [teamName, setTeamName] = useState("");
  const changeTeamName = (e: any) => {
    setTeamName(e.target.value);
    console.log(teamName);
  };

  return (
    <div className="teamSpecific">
      <Image src="/team-main.png" alt="team" width={180} height={180} />

      <div className="team-search">
        <TextField
          id="outlined-basic"
          label="팀/팀원 검색"
          variant="outlined"
          value={checkName}
          onChange={typeName}
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
      <Button variant="outlined" onClick={createTeam}>
        팀 생성
      </Button>
      <ModalCustom show={show} setShow={setShow}>
        <h1>팀 생성</h1>
        <Image src="/team-default-image.png" alt="team" width={200} height={200} />
        <TextField id="outlined-basic" label="팀 이름" variant="outlined" value={teamName} onChange={changeTeamName}/>
      </ModalCustom>
      
      <h1>팀원 구인</h1>
      <h2>손이바빠: 판교에서 같이 축구하실 분들 구합니다.</h2>
    </div>
  );
}
