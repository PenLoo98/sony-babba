"use client";
import { useEffect, useState } from "react";
// TODO: 매칭방 목록 가져오기

// TODO: 매칭방 fetch 데이터 형식 정의 
type MatchingRoomSpecific = {
    matchingRoomId: number;
    teamId: number;
    teamName: string;
    roomLeaderNickname: string;
    sports: string;
    area: string;   
    capacity: number; // 필요 인원
    userCount: number; // 현재 인원
    sumRating: number; // 방 평균 레이팅
    participateStatus: boolean; // 참여 상태
    status: string; // 방 상태
};

type MatchingRoomList = {
    data: MatchingRoomSpecific[];
};

export default function GetRoomList() {
    const getRoomInfoURL: string = `https://withsports.shop:8000/matching-service/matchingrooms`;

  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  // 매칭방 정보를 불러왔는지 여부
  const [showRoomInfo, setShowRoomInfo] = useState(true);

  let initialRoomList: MatchingRoomList = {
    data: [
      {
        matchingRoomId: 0,
        teamId: 0,
        teamName: "손이바빠",
        roomLeaderNickname: "위스",
        sports: "축구",
        area: "서울",
        capacity: 5,
        userCount: 5,
        sumRating: 0,
        participateStatus: false,
        status: "대기",
      },
    ],
  };
  const [data, setData] = useState<MatchingRoomList>(initialRoomList);

  // TODO: GET - id에 맞는 사용자 정보 가져오기
  async function getRoomInfo(getRoomInfoURL: string) {
    const response = await fetch(getRoomInfoURL, {
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
          console.log("매칭방 정보를 불러오는데 성공했습니다.");
          console.log("data: ", data);
          console.log("data.data: ", data.data);
          setData(data.data);
          setShowRoomInfo(true);
        } else {
          console.log("매칭방 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  useEffect(() => {
    async function fetchRoomData() {
      await getRoomInfo(getRoomInfoURL)
    }
    fetchRoomData();
  },[]);

    return(
        <div>
            {!showRoomInfo && <div>매칭방 정보를 불러오는 중입니다...</div>}
            {showRoomInfo && (
                <div>
                {data.data.map((room: MatchingRoomSpecific) => (
                    <div key={room.matchingRoomId}>
                        <div>방장: {room.roomLeaderNickname}</div>
                        <div>종목: {room.sports}</div>
                        <div>지역: {room.area}</div>

                        <div>필요 인원: {room.capacity}</div>
                        <div>현재 인원: {room.userCount}</div>
                        <div>평균 레이팅: {room.sumRating}</div>
                        <div>참여 상태: {room.participateStatus}</div>
                        <div>방 상태: {room.status}</div>
                        {/* TODO: 매칭 참여버튼 조건에 따라 활성화/비활성화 */}
                        {!room.participateStatus }
                    </div>
                ))}
                </div>
            )}
        </div>
    )

}