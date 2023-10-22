"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";
import Image from "next/image";
import SuccessMsg from "../Message/MsgButton";
export default function LogInOutNaver() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log(session);
    return (
      <div className="logout">
          <Button
            onClick={() => {
              signOut();
              console.log("로그아웃 되었습니다.");
            }}
            component="label"
            variant="contained"
            startIcon={
              <Image src="/naver.png" alt="naver" width={50} height={50} />
            }
            style={{
              background: "#27D34A",
              color: "black",
              marginBottom: "10px",
            }}
          >
            {session.user?.name}님 <br />
            로그아웃
          </Button>
      </div>
    );
  }
  return (
    <div className="login">
        <Button
          onClick={() => signIn("naver")}
          component="label"
          variant="contained"
          startIcon={
            <Image src="/naver.png" alt="naver" width={50} height={50} />
          }
          style={{
            background: "#27D34A",
            color: "black",
            marginBottom: "10px",
          }}
        >
          네이버로 로그인
        </Button>
    </div>
  );
}
