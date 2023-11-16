"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Home.module.css";
import Image from "next/image";


// 보낸 사람 (GET) /gifticon-service/order/gifticon/list/sent?page={n}&size={n}


// 주문 정보
type OrderInfo = {
    gifticonId : number;     // 기프티콘 ID
    toUserNickName : String; // 기프티콘을 받는 사용자의 ID
    amount : number;         // 기프티콘 주문 수량
    letter : string;         // 기프티콘에 담을 편지
}

// 주문자 정보
type UserInfo = {
    userId: number;
    nickname: string;
    balance: number;
};


export default function SentGiftPage(){

    return <>보낸 기프티콘 목록 확인</>;
}