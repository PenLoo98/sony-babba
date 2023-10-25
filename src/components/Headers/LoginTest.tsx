"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function LoginTest() {
  // const ip = process.env.SERVER_IP;
  // const port = process.env.SERVER_PORT;
  const url: string =
    "http://3.37.203.5:8000/user-service/oauth2/authorization/naver";
    
  return (
    <div className="loginNaver">
      <Link href={url}>
        <Button
          startIcon={
            <Image src="/naver.png" alt="naver" width={50} height={50} />
          }
          style={{
            background: "#27D34A",
            color: "black",
            margin: "20px",
          }}
        >
          네이버 로그인 테스트
        </Button>
      </Link>
    </div>
  );
}
