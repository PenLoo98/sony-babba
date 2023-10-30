"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function LogoutButton() {
  // TODO: 로그아웃 POST 요청 구현하기
  const url: string =
    "https://withsports.shop:8000/user-service/auth/logout";
    
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
          네이버 로그아웃
        </Button>
      </Link>
    </div>
  );
}
