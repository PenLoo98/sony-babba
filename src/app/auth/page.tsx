"use client";
import ParsingQuery from "@/components/Auth/ParsingQuery";
import SelectArea from "@/components/Auth/SelectArea";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
    // 닉네임 중복 확인 API
    const nameCheckAPI = "http://localhost:3000/api/user/nickname";

    // 닉네임 입력 상태관리
    const [nickname, setNickname] = useState("");
    const handleNameChange = (event: any) => {
        setNickname(event.target.value);
    };

    // 지역 입력 상태관리
    const [area, setArea] = useState("");
    const handleAreaChange = (event: string) => {
        setArea(event);
    };

    // 회원정보 제출
    function sendForm(){
        // TODO: 회원정보 제출 fetch 구현하기
        console.log(JSON.stringify({nickname, area}));

    }

  return (
    <div style = {{padding: "20px"}}>
      <ParsingQuery />
      <br />
      
      <div className="nickname" style={{ display: "flex" }}>
        <TextField label="닉네임" variant="outlined" value={nickname} onChange={handleNameChange}/>
        <Link href={nameCheckAPI} style={{ textDecoration: "none" }}>
        <Button variant="contained" style={{margin:"10px"}}>중복 확인</Button>
        </Link>
      </div>
      <br />
      <SelectArea area={area} onAreaChange={handleAreaChange}/>
      <br />
      <Button onClick={sendForm} variant="contained">회원 정보 제출</Button>
    </div>
  );
}
