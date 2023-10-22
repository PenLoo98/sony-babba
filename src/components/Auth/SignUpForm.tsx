"use client";
import CheckNickButton from "@/components/Auth/CheckNickButton";
import ExportUserInfoButton from "@/components/Auth/ExportUserInfoButton";
import ParsingQuery from "@/components/Auth/ParsingQuery";
import SelectArea from "@/components/Auth/SelectArea";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function SignUpForm() {
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

  return (
    <div style = {{padding: "20px"}}>
      <ParsingQuery />
      <br />
      
      <div className="nickname" style={{ display: "flex" }}>
        <TextField label="닉네임" variant="outlined" value={nickname} onChange={handleNameChange}/>
        <CheckNickButton  nickname={nickname}/>
      </div>
      <br />
      <SelectArea area={area} onAreaChange={handleAreaChange}/>
      <br />
      <ExportUserInfoButton nickname={nickname} area={area} />
    </div>
  );
}
