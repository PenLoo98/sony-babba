"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../../Home.module.css";


// 등록할 구장 정보
type StadiumInfo = {
    stadiumId ?: number;
    stadiumName : string;   // 구장 이름
    address : string;       // 구장 주소
    detailAddress : string; // 구장 상세 주소
    phoneNumber : string;   // 구장 전화번호
}


// 경기장 상세 정보
type StadiumDetail = {
    stadiumId : number;     // 구장 ID
    stadiumName : string;   // 구장 이름
    address : string;       // 구장 주소
    detailAddress : string; // 구장 상세 주소
    phoneNumber : string;   // 구장 전화번호
    adminId : number;       // 등록한 관리자의 ID
}

type PageParams = {
    id: number;
};

type RegisterStadiumInfo = {
    month : number;     // 1 ~ 12월
    day : number;       // 1 ~ 31일
    hour : number;      // 0 ~ 23시
    capacity : number;  // 해당 시간의 수용 인원
}

// 구장별로 날짜, 시간, 수용인원 등록
// (POST) /booking-service/admin/stadium/[id]/date

export default function StadiumTimeRegistrationPage() {
    


    const [stadium, setStadium] = useState<StadiumDetail | null>(null);
    const router = useRouter();
    const params = useSearchParams();
    const stadiumId = params.get('stadiumId');


    const [registerInfo, setRegisterInfo] = useState<RegisterStadiumInfo>({
        month: 1,
        day: 1,
        hour: 0,
        capacity: 0
    });

    // 경기장 정보 가져옴
    useEffect(() => {
        const fetchStadiumDetail = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");

            if (!token) {
                alert("권한이 없습니다.");
                router.push("/admin");
                return;
            }
    
            try {
                const response = await fetch(`https://withsports.shop:8000/booking-service/stadium/one/${stadiumId}`,
                {
                    method: "GET",
                    headers: {
                        Credentials: "include",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const data = await response.json();
    
                // 경기장 정보 저장
                setStadium(data.data);


                if (data.code === 'SUCCESS') {
                    setStadium(data.data);  // 선택된 경기장의 상세 정보를 상태에 저장
                } else {
                    alert('경기장 상세 정보 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('경기장 상세 정보 조회 중 오류 발생:', error);
            }
        };

        if(stadiumId){
            fetchStadiumDetail();
        }
        
    }, [stadiumId]);


    const handleGoBack = () => {
        window.location.href = "/stadium";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // 로컬스토리지 토큰 가져오기
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("권한이 없습니다.");
            router.push("/admin");
            return;
        }

        try {
            const response = await fetch(`https://withsports.shop:8000/booking-service/admin/stadium/${stadiumId}/date`, {
                method: 'POST',
                headers: {
                    Credentials: "include",
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(registerInfo),
            });
            
            const data = await response.json();
    
            if (data.code === 'SUCCESS') {
                alert(data.message);  // '구장 날짜 & 시간 등록 성공'
            } else {
                alert('경기장 날짜 & 시간 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('경기장 날짜 & 시간 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            {stadium && (
                <div>
                    <h2>{stadium.stadiumName}</h2>
                    <p>주소: {stadium.address}</p>
                    <p>상세주소: {stadium.detailAddress}</p>
                    <p>전화번호: {stadium.phoneNumber}</p>
                    
                    <form onSubmit={handleSubmit}>
                        <select name="month" value={registerInfo.month} onChange={handleChange}>
                            {Array.from({length: 12}, (_, i) => i + 1).map((month) => 
                                <option key={month} value={month}>{month}월</option>
                            )}
                        </select>
                        <select name="day" value={registerInfo.day} onChange={handleChange}>
                            {Array.from({length: 31}, (_, i) => i + 1).map((day) => 
                                <option key={day} value={day}>{day}일</option>
                            )}
                        </select>
                        <select name="hour" value={registerInfo.hour} onChange={handleChange}>
                            {Array.from({length: 24}, (_, i) => i).map((hour) => 
                                <option key={hour} value={hour}>{hour}시</option>
                            )}
                        </select>
                        <input name="capacity" type="number" value={registerInfo.capacity} onChange={handleChange} />
                        <button type="submit" className={styles.addButton}>제출</button>
                    </form>

                    <button onClick={handleGoBack} className={styles.deletebutton}>뒤로 가기</button>
                </div>
            )}
        </div>
    );
}