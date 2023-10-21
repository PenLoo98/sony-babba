"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function LoginTest() {
  function requestLogin() {
    // const ip = process.env.SERVER_IP;
    // const url = `http://54.180.109.176:8000/user-service/oauth2/authorization/naver`;
    const url = `http://211.110.223.59//user-service/oauth2/authorization/naver`;
    const authPopup = window.open(url, "authPopup", "width=800, height=600");

    // 쿼리 응답을 받음
    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => {
    //   // 액세스 토큰 로컬 스토리지에 저장
    //   localStorage.setItem("accessToken", res.data.accessToken);
    // });

    return (
      <Button
        onClick={requestLogin}
        startIcon={
          <Image src="/naver.png" alt="naver" width={50} height={50} />
        }
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
}
