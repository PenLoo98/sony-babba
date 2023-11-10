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
  const localStorage: Storage = window.localStorage;
  //const token = localStorage.getItem('accessToken');

  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiVXNlciJdLCJleHAiOjE2OTk2MDA0NzIsImlhdCI6MTY5OTU5MzI3MiwiaXNzIjoiL2xvZ2luL29hdXRoMi9jb2RlL25hdmVyIn0.fZXuyFILmrt5FX5YvZeCATb1aKRCC3uwD8S-_BKXf93riBbH9eedLKITj3ZwFDIVfOI-DKQcZc17VMRM3yveBgw";

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch('https://withsports.shop:8000/user-service/user/', {
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
          const userId = data.data.userId;
          fetchUserInfo(userId);
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }, []);

  const fetchUserInfo = async (userId: number) => {
    const response = await fetch(`https://withsports.shop:8000/user-service/user/profile/${userId}`, {
      method: "GET",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.code === "SUCCESS") {
      setData(data.data);
      setShowUserInfo(true);
    } else {
      console.log("사용자 정보를 불러오는데 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>유저 프로필 메인 페이지</h1>
      {data && (
        <div>
          <h1>userId: {data.userId}</h1>
          <h1>email: {data.email}</h1>
          <h1>name: {data.name}</h1>
          <h1>nickname: {data.nickname}</h1>
          <h1>address: {data.address}</h1>
        </div>
      )}
    </div>
  );
}


// export default function UserProfileMain() {
//   // TODO: 유저 프로필 메인 페이지 구현하기
//   // TODO: 자신의 userId에 맞는 /user/profile/:userId 페이지로 이동하기
//   useEffect(() => {
//     const localStorage = window.localStorage;
//     const userId = localStorage.getItem("userId");
//     location.href = `/user/profile/${userId}`;
//   }, []);

//   return <h1>유저 프로필 메인 페이지</h1>;
// }
