"use client";
import { useEffect, useState } from "react";

type UserData = {
  userId : number;
  email : string;
  name : string;
  nickname : string | null;
  address : string | null
}

export default function ProfilePage() {

  // TODO: 유저 프로필 메인 페이지 구현하기
  // TODO: 자신의 userId에 맞는 /user/profile/:userId 페이지로 이동하기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");
  
  // useEffect(() => {
  //   const localStorage = window.localStorage;
  //   const userId = localStorage.getItem("userId");
  //   location.href = `/user/profile/${userId}`;
  // }, []);


  useEffect(() => {
    const localStorage = window.localStorage;
    const userId = localStorage.getItem("userId");
    location.href = `/user/profile/${userId}`;
  }, []);

 

  return (
    <div>
      <h1>유저 프로필 메인 페이지</h1>
    </div>
  );
}