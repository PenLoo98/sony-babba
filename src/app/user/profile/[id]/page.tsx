"use client";
import { useEffect, useState } from "react";
import PointInfo from "./profileComponent/PointInfo";
import ProfileInfo from "./profileComponent/ProfileInfo";
import ProfileMenu from "./profileComponent/ProfileMenu";
import RankingInfo from "./profileComponent/RankingInfo";

type PageParams = {
  id: number;
};

type UserJSON = {
  userId: number;
  userImage: string;
  userNickname: string;
  userConnect: boolean; // true면 접속 중, false면 미접속
  userArea: string;
  userTeam: string;
  userTeamId: number;
  userActivity: string;
  userRating: number;
  userRanking: number;
  userMvp: number;
  userPoint: number;
};
export default function ProfilePage({ params }: { params: PageParams }) {
  let userJSON: UserJSON = {
    userId: 0,
    userImage: "",
    userNickname: "",
    userConnect: false,
    userArea: "",
    userTeam: "",
    userTeamId: 0,
    userActivity: "",
    userRating: 0,
    userRanking: 0,
    userMvp: 0,
    userPoint: 0,
  };
  // 로컬스토리지 토큰 가져오기
  // const localStorage: Storage = window.localStorage;
  // const token = localStorage.getItem("accessToken");
  // // console.log(token);

  // // TODO: GET - id에 맞는 사용자 정보 가져오기
  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/users/profile/${params.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => {
  //     if (res.ok) {
  //       // 응답값에 따라 userJSON 업데이트
  //       // userJSON.userId = 
  //       // userJSON.userImage = 
  //       // userJSON.userNickname = 
  //       // userJSON.userConnect =  
  //       // userJSON.userArea = 
  //       // userJSON.userTeam = 
  //       // userJSON.userTeamId = 
  //       // userJSON.userActivity = 
  //       // userJSON.userRating = 
  //       // userJSON.userRanking = 
  //       // userJSON.userMvp = 
  //       // userJSON.userPoint = 
  //     } else {
  //       alert("사용자 정보를 가져오는데 실패했습니다.");
  //       return <h1>존재하지 않는 사용자입니다.</h1>;
  //     }
  //   });
  // }, []);

  // TODO: 예시 데이터: 가져온 유저 정보를 userInfo에 저장하기
  userJSON.userId = params.id;
  userJSON.userImage = "/default-profile.png";
  userJSON.userNickname = "위스";
  userJSON.userConnect = true; // true면 접속 중, false면 미접속
  userJSON.userArea = "서울";
  userJSON.userTeam = "손이바빠";
  userJSON.userTeamId = 7;
  userJSON.userActivity = "축구";
  userJSON.userRating = 3.5;
  userJSON.userRanking = 1;
  userJSON.userMvp = 2;
  userJSON.userPoint = 100;

  // console.log(userJSON);

  return (
    <div className="profile-page">
      <ProfileInfo userJSON={userJSON} />
      <ProfileMenu userJSON={userJSON} />
      <RankingInfo userJSON={userJSON} />
      <PointInfo userJSON={userJSON} />
    </div>
  );
}
