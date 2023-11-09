"use client";
import { useEffect, useState } from "react";

type UserData = {
  userId : number;
  email : string;
  name : string;
  nickname : string | null;
  address : string | null
}


export default function UserProfileMain() {
  // TODO: 유저 프로필 메인 페이지 구현하기
  // TODO: 자신의 userId에 맞는 /user/profile/:userId 페이지로 이동하기
  const [userData, setUserData] = useState<UserData | null>(null);
  
  
  // useEffect(() => {
  //   const localStorage = window.localStorage;
  //   const userId = localStorage.getItem("userId");
  //   location.href = `/user/profile/${userId}`;
  // }, []);

  useEffect(() => {
    const localStorage = window.localStorage;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    fetch(`https://withsports.shop:8000/user-service/user`, {
      method: "GET",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "SUCCESS") {
          console.log("사용자 정보를 불러오는데 성공했습니다.");
          setUserData(data.data);
        } else {
          console.log("사용자 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }, []);

  return (
    <div>
      <h1>유저 프로필 메인 페이지</h1>
      {userData && (
        <div>
          <h1>name: {userData.name}</h1>
          <h1>email: {userData.email}</h1>
          <h1>nickname: {userData.nickname}</h1>
          <h1>address: {userData.address}</h1>
        </div>
      )}
    </div>
  );
}
