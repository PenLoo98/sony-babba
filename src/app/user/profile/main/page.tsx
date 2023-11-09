"use client";
import { useEffect } from "react";

export default function UserProfileMain() {
  // TODO: 유저 프로필 메인 페이지 구현하기
  // TODO: 자신의 userId에 맞는 /user/profile/:userId 페이지로 이동하기
  useEffect(() => {
    const localStorage = window.localStorage;
    const userId = localStorage.getItem("userId");
    location.href = `/user/profile/${userId}`;
  }, []);

  return <h1>유저 프로필 메인 페이지</h1>;
}
