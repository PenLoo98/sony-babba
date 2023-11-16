"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

// 구장 정보
type StadiumInfo = {
    stadiumName : string;
    address : string;
    detailAddress : string;
    phoneNumber : string;
}

export default function StadiumManagePage(){

    
    // 구장 등록 (POST) /booking-service/admin/stadium 
    return <></>;
}
