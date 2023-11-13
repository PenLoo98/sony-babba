"use client";
import { useEffect, useState } from "react";
import ProfileInfo from "./profileComponent/ProfileInfo";
import ProfileMenu from "./profileComponent/ProfileMenu";
import RankingInfo from "./profileComponent/RankingInfo";

type PageParams = {
  id: number;
};

type UserJSON = {
  userId: number;
  nickname: string;
  introduction: string;
  area: string;
  imageUrl: string;
  tier: string;
  win: number;
  lose: number;
  draw: number;
  winRate: number;
  mvpCount: number;
  teamName?: string;
};
export default function ProfilePage({ params }: { params: PageParams }) {
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

  // TODO: GET - id에 맞는 사용자 정보 가져오기
  async function getUserInfo() {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    
    const getUserInfoURL: string = `https://withsports.shop:8000/user-service/user/profile`;
    
    const response = await fetch(getUserInfoURL, {
      method: "GET",
      headers: {
        "Credentials": "include",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:");
        console.log(data);
        if (data.code === "SUCCESS") {
          console.log("사용자 정보를 불러오는데 성공했습니다.");
          setShowUserInfo(true);
          setData(data);
        } else {
          console.log("사용자 정보를 불러오는데 실패했습니다.");
        }
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });

    // 응답값 확인
    let body: UserJSON;
    if (response) {
      body = await response.data;
      console.log("body:");
      console.log(body);
      return body;
    } else {
      console.log("응답이 없습니다.");
      return null;
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      let userInfo = await getUserInfo();
      if (userInfo) {
        console.log("userInfo:");
        console.log(userInfo);
        // setShowUserInfo(true);
        // setData(userInfo);
        console.log("data:");
        console.log(data);
        console.log("data.imageUrl:");
        console.log(data.imageUrl);
      }
    }
    fetchUserData();
    setShowUserInfo(true);
  }, []);

  return (
    <div>
      {!showUserInfo && <div>유저 정보를 불러오는 중입니다...</div>}
      {showUserInfo && (
        <div>
          <ProfileInfo userJSON={data} />
          <ProfileMenu userJSON={data} />
          <RankingInfo userJSON={data} />
        </div>
      )}
    </div>
  );
}
