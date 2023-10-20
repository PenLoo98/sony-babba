"use client";
import { useSession } from "next-auth/react";
import LogInOutNaver from "./LogInOutNaver";
import HomeButton from "./HomeButton";
import MenuBar from "./MenuBar";
import { redirect } from "next/dist/server/api-utils";
// TODO: 로그인 href를 /user/login이 아닌 /user/login?redirect=... 로 바꾸기
export default function Header() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log(session);
    return (
      // 로그아웃 버튼
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
        }}
      >
        <HomeButton />
        <div style={{ display: "flex" }}>
          <MenuBar />
          <LogInOutNaver />
        </div>
      </div>
    );
  }
  return (
    // 로그인 버튼
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
      }}
    >
      <HomeButton />
      <LogInOutNaver />
    </div>
  );
}
