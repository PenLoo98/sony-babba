"use client";
import CheckNickButton from "@/app/auth/AuthComponent/CheckNickButton";
import ExportUserInfoButton from "@/app/auth/AuthComponent/ExportUserInfoButton";
import ParsingQuery from "@/app/auth/AuthComponent/ParsingQuery";
import SelectArea from "@/app/auth/AuthComponent/SelectArea";
import { TextField } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  const { query } = context;

  // 쿼리 파라미터를 처리하는 로직
  const accessToken: any | null = query.get("accessToken");
  const expiredTime: any | null = query.get("expiredTime");
  const userId: any | null = query.get("userId");

  // 브라우저로 전달되는 props에는 처리된 데이터만 포함
  return { props: { data: {accessToken,expiredTime,userId} } };
}

export default function SignUp(props: any) {
  // 쿼리 파라미터를 처리하는 로직
  const accessToken: any | null = props.data.accessToken;
  const expiredTime: any | null = props.data.expiredTime;
  const userId: any | null = props.data.userId;

  // 로컬스토리지에 저장
  const localStorage: Storage = window.localStorage;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("expiredTime", expiredTime);
  localStorage.setItem("userId", userId);

  // 닉네임 입력 상태관리
  const [nickname, setNickname] = useState("");
  const handleNameChange = (event: any) => {
    setNickname(event.target.value);
  };

  // 닉네임 중복 상태관리
  const [validName, setValidName] = useState(false);

  // 지역 입력 상태관리
  const [area, setArea] = useState("");
  const handleAreaChange = (event: string) => {
    setArea(event);
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div className="signupForm">
        <h1>같이 운동하고 싶을 때</h1>
        <h1 style={{ color: "#248CC7" }}>With Sports</h1>
        <br />
        <br />
        <div
          className="token"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* <ParsingQuery /> */}
        </div>
        <br />
        <div
          className="inputUserInfo"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="nickname">
            <TextField
              label="닉네임"
              variant="outlined"
              value={nickname}
              onChange={handleNameChange}
            />
            <CheckNickButton nickname={nickname} setValidName={setValidName}/>
            <br />
            <br />
            <div className="area">
              <SelectArea area={area} onAreaChange={handleAreaChange} />
            </div>
          </div>
        </div>
        <br />
        <div
          className="exportUserBtn"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ExportUserInfoButton nickname={nickname} validName={validName} area={area} />
        </div>
      </div>
      <Image
        src="/auth-page.png"
        alt="auth-page-image"
        width={800}
        height={800}
        style={{ marginLeft: "50px" }}
      />
    </div>
  );
}
