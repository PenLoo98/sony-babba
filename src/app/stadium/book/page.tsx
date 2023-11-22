"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../../Home.module.css";


// // 등록할 구장 정보
// type StadiumInfo = {
//     stadiumId ?: number;
//     stadiumName : string;   // 구장 이름
//     address : string;       // 구장 주소
//     detailAddress : string; // 구장 상세 주소
//     phoneNumber : string;   // 구장 전화번호
// }

// // 경기장 상세 정보
// type StadiumDetail = {
//     stadiumId : number;     // 구장 ID
//     stadiumName : string;   // 구장 이름
//     address : string;       // 구장 주소
//     detailAddress : string; // 구장 상세 주소
//     phoneNumber : string;   // 구장 전화번호
//     adminId : number;       // 등록한 관리자의 ID
// }

type PageParams = {
    id: number;
};

type StadiumTimeInfo = {
    stadiumId : number; // 경기장 ID
    year : number;      // 2023 ~ 2025년
    month : number;     // 1 ~ 12월
    day : number;       // 1 ~ 31일
    hour : number;      // 9 ~ 21시
    capacity : number;  // 해당 시간의 수용 인원
}

// 구장별로 날짜, 시간, 수용인원 등록
// (POST) /booking-service/admin/stadium/[id]/date

export default function StadiumBookPage() {

    const [times, setTimes] = useState<StadiumTimeInfo[]>([]);
    const router = useRouter();
    const params = useSearchParams();
    const stadiumId = params.get('stadiumId'); // 쿼리 파라미터 'stadiumId' 가져옴

    // 경기장에 등록된 시간대를 가져옴
    useEffect(() => {
        const fetchStadiumTimes = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");

            if (!token) {
                alert("권한이 없습니다.");
                router.push("/admin");
                return;
            }
    
            try {
                const response = await fetch(`https://withsports.shop:8000/booking-service/stadium/${stadiumId}/date`,
                {
                    method: "GET",
                    headers: {
                        Credentials: "include",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const data = await response.json();

                if (data.code === 'SUCCESS') {
                    setTimes(data.data);  // 선택된 경기장의 상세 정보를 상태에 저장
                } else {
                    alert('경기장 시간 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('경기장 상세 정보 조회 중 오류 발생:', error);
            }
        };

        if(stadiumId){
            fetchStadiumTimes();
        }
        
    }, [stadiumId]);


    const handleGoBack = () => {
        window.location.href = "/stadium/main";
    };


    return (
        <div>
            {/* 경기장별 시간 목록 표시 */}
            <table className={styles.stadiumTimeListTable}>
            <thead>
                <tr>
                    <th>년도</th>
                    <th>월</th>
                    <th>일</th>
                    <th>시간</th>
                    <th>수용 인원</th>
                </tr>
            </thead>
            <tbody>
                {times.map((time, index) => (
                    <tr key={index}>
                        <td>{time.year}</td>
                        <td>{time.month}</td>
                        <td>{time.day}</td>
                        <td>{time.hour}</td>
                        <td>{time.capacity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <br/>
        <button onClick={handleGoBack} className={styles.backbutton}>뒤로 가기</button>
        </div>
    );
}