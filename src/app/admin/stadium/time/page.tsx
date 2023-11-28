"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../../../Home.module.css";


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
    stadiumId : number; // 경기장 ID
    year : number;      // 2023 ~ 2025년
    month : number;     // 1 ~ 12월
    day : number;       // 1 ~ 31일
    hour : number;      // 9 ~ 21시
    capacity : number;  // 해당 시간의 수용 인원
}

// 구장별로 날짜, 시간, 수용인원 등록
// (POST) /booking-service/admin/stadium/[id]/date

export default function StadiumTimeRegistrationPage() {
    

    const [registerInfo, setRegisterInfo] = useState<RegisterStadiumInfo>({
        stadiumId: 0,
        year : 2023,
        month: 1,
        day: 1,
        hour: 9,
        capacity: 0
    });

    // 달력
    const daysInMonth = (month: number) => {
        switch(month) {
            case 2:
                return 28;
            case 4: case 6: case 9: case 11:
                return 30;
            default:
                return 31;
        }
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = Number(e.target.value);
        setRegisterInfo({ ...registerInfo, month, day: 1 });
        setDayCount(daysInMonth(month));
    };

    const [dayCount, setDayCount] = useState(daysInMonth(1));


    const [stadium, setStadium] = useState<StadiumDetail | null>(null);
    const router = useRouter();
    const params = useSearchParams();
    const stadiumId = params.get('stadiumId'); // 쿼리 파라미터 'stadiumId' 가져옴

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
        window.location.href = "/admin/stadium";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}> 
                        년 : <select name="year" value={registerInfo.year} onChange={handleChange} style={{ height: '20px' }}>
                            {Array.from({length: 3}, (_, i) => i + 2023).map((year) => 
                                <option key={year} value={year}>{year}년</option>
                            )}
                        </select>
                        <br/>
                        월 : <select name="month" value={registerInfo.month} onChange={handleMonthChange} style={{ height: '20px' }}>
                            {Array.from({length: 12}, (_, i) => i + 1).map((month) => 
                                <option key={month} value={month}>{month}월</option>
                            )}
                        </select>
                        <br/>
                        일 : <select name="day" value={registerInfo.day} onChange={handleChange} style={{ height: '20px' }}>
                            {Array.from({length: dayCount}, (_, i) => i + 1).map((day) => 
                                <option key={day} value={day}>{day}일</option>
                            )}
                        </select>
                        <br/>
                        시 : <select name="hour" value={registerInfo.hour} onChange={handleChange} style={{ height: '20px' }}>
                            {Array.from({length: 13}, (_, i) => i + 9).map((hour) => 
                                <option key={hour} value={hour}>{hour}시</option>
                            )}
                        </select>
                        <br/>
                        수용인원 : <input name="capacity" type="number" value={registerInfo.capacity} onChange={handleChange} />
                        <br/>
                        <button type="submit" className={styles.addButton}>제출</button>
                        <br/>
                        <button onClick={handleGoBack} className={styles.backbutton}>뒤로 가기</button>

                    </div>
                    </form>
                    <br/>
                </div>
            )}
        </div>
    );
}