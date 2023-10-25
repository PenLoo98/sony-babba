"use client";
import { useEffect, useState } from "react";
import PointInfo from "./profileComponent/PointInfo";
import ProfileInfo from "./profileComponent/ProfileInfo";
import ProfileMenu from "./profileComponent/ProfileMenu";
import RankingInfo from "./profileComponent/RankingInfo";

type PageParams = {
  id: number;
};
export default function ProfilePage( {params} : { params: PageParams }) {
  const id = params.id;

  // TODO: 해당 id의 유저 정보 가져오기 GET -> 지금은 더미 데이터 사용
  // TODO: 가져온 유저 정보를 userInfo에 저장하기
  // TODO: userInfo를 ProfileInfo.tsx에 넘겨주기 -> ProfileInfo속 데이터 지우기
  // TODO: userInfo를 ProfileMenu.tsx에 넘겨주기

  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: "",
    nickname: "",
    area: "",
    rating: 0,
    mvp: 0,
    point: 0,
  });

  useEffect(() => {

  }, []);

  return (
    <div className="profile-page" >
    <ProfileInfo params={params}/>
    <ProfileMenu params={params}/>
    <RankingInfo params={params}/>
    <PointInfo params={params}/>
    </div>
  );
}
