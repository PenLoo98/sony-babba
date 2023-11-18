"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Home.module.css";
import Image from "next/image";


// 사용자 포인트 정보
type UserInfo = {
    userId: number;             // 사용자 ID
    nickname: string;           // 사용자 닉네임
    balance: number;            // 사용자 포인트 잔액
};

type GiftHistory = {
    userId : number;            // 사용자 ID
    balanceAtThatTime : number; // 거래 발생 해당 시점의 잔액
    amount : number;            // 거래 금액
    type : 0 | 1;               // 0: (포인트 받음)증가, 1 : (포인트 사용)감소
    description : string;       // 거래 내역
    createdAt?: Date;           // 거래 발생 시간
}

// (GET) /point-service/points?page=0&size=5  포인트 내역 조회
export default function PointPage(){

    // 사용자 정보
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    async function fetchUserInfo() {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");
        const response = await fetch("https://withsports.shop:8000/point-service/point", {
          method: "GET",
          headers: {
            Credentials: "include",
            ContentType: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if(response.ok) {
          const data = await response.json();
          if(data.code === "SUCCESS") {
            setUserInfo(data.data);
          } else {
            console.error("Failed to fetch user info");
          }
        } else {
          throw new Error("Network response was not ok");
        }
      }
    
      useEffect(() => {
        fetchUserInfo();
      }, []);


      const router = useRouter();

    return (
    <div>
         <h4> {userInfo?.nickname} 님의 포인트 </h4>
         <div style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "20px",
            }}
        />
        {userInfo ? (
          <div>
            <p>포인트 잔액: {userInfo.balance}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* 포인트 내역 목록 출력하기 */}
    </div>
    );
}
