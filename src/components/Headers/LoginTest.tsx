"use client";
import { Button } from "@mui/material";
import Image from "next/image";

export default function LoginTest() {
//   async function requestLogin(target: string) {
//     const ip = process.env.SERVER_IP;
//     window.location.href = `http://${ip}:8000/user-service/oauth2/authorization/naver`;
//     console.log(`http://${ip}:8000/user-service/oauth2/authorization/naver`);
//   }
    const requestLogin = (target: string) => () => {
        const ip = process.env.SERVER_IP;
        const url = `http://54.180.109.176:8000/user-service/oauth2/authorization/naver`;
        const authPopup = window.open(url, "authPopup", "width=800, height=600");
    };

  return (
    <Button
      onClick={requestLogin("naver")}
      startIcon={<Image src="/naver.png" alt="naver" width={50} height={50} />}
      style={{
        background: "#27D34A",
        color: "black",
        marginBottom: "10px",
      }}
    >
      네이버 로그인 테스트
    </Button>
  );
}
