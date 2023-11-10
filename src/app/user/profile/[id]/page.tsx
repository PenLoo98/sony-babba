"use client";
import { useEffect, useState } from "react";
import ProfileInfo from "./profileComponent/ProfileInfo";
import ProfileMenu from "./profileComponent/ProfileMenu";
import RankingInfo from "./profileComponent/RankingInfo";

type PageParams = {
  id: number;
};

type UserJSON = {
  area: string;
  draw: number;
  imageUrl: string | null;
  introduction: string | null;
  lose: number;
  mvpCount: number;
  nickname: string;
  tier: string;
  userId: number;
  win: number;
  winRate: number| undefined | null;
  teamName?: string;
};

type UserInfo = {
  userId: number;
  email: string;
  name: string;
  nickname: string | null;
  address: string | null;
};



export default function ProfilePage({ params }: { params: PageParams }) {
  const getUserJSONURL: string = `https://withsports.shop:8000/user-service/user/profile`;
  const getUserINFOURL: string = `https://withsports.shop:8000/user-service/user`;

  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  // 팀 정보를 불러왔는지 여부
  const [showUserInfo, setShowUserInfo] = useState(false);

  let userJSON: UserJSON = {
    userId: 0,
    nickname: "위스",
    introduction: "반갑습니다",
    area: "서울",
    imageUrl: "/default-profile.png",
    tier: "1",
    win: 5,
    lose: 5,
    draw: 0,
    winRate: 50,
    mvpCount: 5,
    teamName: "손이바빠",
  };
  const [data, setData] = useState<UserJSON>(userJSON);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); 



  // GET - id에 맞는 사용자 정보 가져오기
  async function getUserInfo(getUserInfoURL: string) {
    const response = await fetch(getUserInfoURL, {
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
          setUserInfo(data.data as UserInfo);
        } else {
          console.log("사용자 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }


  // TODO: GET - id에 맞는 USERJSON 가져오기
  async function getUserJSON(getUserJSONURL: string) {
    const response = await fetch(getUserJSONURL, {
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
          console.log("USER JSON 정보를 불러오는데 성공했습니다.");
          console.log("data: ", data);
          console.log("data.data: ", data.data);
          setData(data.data);
          setShowUserInfo(true);
        } else {
          console.log("USER JSON 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  useEffect(() => {
    async function fetchUserData() {
      await getUserInfo(getUserINFOURL)
      await getUserJSON(getUserJSONURL)
    }
    fetchUserData();
  },[]);

  return (
    <div>
      {!showUserInfo && <div>유저 정보를 불러오는 중입니다...</div>}
      {showUserInfo && (
        <div>
          {userInfo && (
            <div>
              <h2>유저 정보</h2>
              <p>아이디: {userInfo.userId}</p>
              <p>이메일: {userInfo.email}</p>
              <p>이름: {userInfo.name}</p>
              <p>별명: {userInfo.nickname ? userInfo.nickname : "없음"}</p>
              <p>주소: {userInfo.address ? userInfo.address : "없음"}</p>
            </div>
          )}
          <ProfileInfo userJSON={data}/>
          <ProfileMenu userJSON={data}/>
          <RankingInfo userJSON={data} />
        </div>
      )}
    </div>
  );
}
