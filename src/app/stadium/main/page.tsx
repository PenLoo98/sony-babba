"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../../Home.module.css";



// 지역별 구장 조회 (사용자)
// (GET) https://withsports.shop:8000/booking-service/stadium/{area}

// 경기장 Id, 연/월/일 입력 후 조회시 예약 가능한 시간을 응답
// (GET)  /booking-service/booking/available/stadium/{stadiumId}/date


// 조회할 구장 정보
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


export default function StadiumManagePage({ params }: { params: PageParams }){

    const [stadiums, setStadiums] = useState<StadiumDetail[]>([]);
    const [selectedStadium, setSelectedStadium] = useState<StadiumDetail | null>(null);

    const [selectedRegion, setSelectedRegion] = useState("서울");
    const [modalOpen, setModalOpen] = useState(false);

    const router = useRouter();

    const fetchStadiums = async (area: string) => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");
        
        try {
            const response = await fetch(`https://withsports.shop:8000/booking-service/stadium/${area}`,
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
                setStadiums(data.data);  // 경기장 목록 상태를 업데이트
            } else {
                alert('경기장 목록 조회에 실패했습니다.');
            }
        } catch (error) {
            console.error('경기장 목록 조회 중 오류 발생:', error);
            alert('경기장 목록 조회 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchStadiums(selectedRegion); 
    }, [selectedRegion]);


    // 경기장 상세 정보 조회
    const fetchStadiumDetail = async (stadiumId: number) => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

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

            if (data.code === 'SUCCESS') {
                setSelectedStadium(data.data);  // 선택된 경기장의 상세 정보를 상태에 저장
                setModalOpen(true);  // 모달 창을 열어줌
            } else {
                alert('경기장 상세 정보 조회에 실패했습니다.');
            }
        } catch (error) {
            console.error('경기장 상세 정보 조회 중 오류 발생:', error);
            alert('경기장 상세 정보 조회 중 오류가 발생했습니다.');
        }
    };


    return (
        <div>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="서울">서울</option>
                <option value="경기도">경기도</option>
                <option value="인천">인천</option>
                <option value="강원도">강원도</option>
                <option value="충청북도">충청북도</option>
                <option value="충청남도">충청남도</option>
                <option value="대전">대전</option>
                <option value="경상북도">경상북도</option>
                <option value="경상남도">경상남도</option>
                <option value="대구">대구</option>
                <option value="울산">울산</option>
                <option value="부산">부산</option>
                <option value="전라북도">전라북도</option>
                <option value="전라남도">전라남도</option>
                <option value="광주">광주</option>
                <option value="제주도">제주도</option>
            </select>
            <br/>
            <br/>
            {/* 경기장 목록 표시 */}
            <table className={styles.stadiumListTable}>
            <thead>
                <tr>
                    <th>경기장 이름</th>
                    <th>주소</th>
                    <th>상세 주소</th>
                    <th>전화번호</th>
                </tr>
            </thead>
            <tbody>
                {stadiums.map((stadium, index) => (
                    <tr key={index} onClick={() => stadium.stadiumId && fetchStadiumDetail(stadium.stadiumId)}>
                        <td>{stadium.stadiumName}</td>
                        <td>{stadium.address}</td>
                        <td>{stadium.detailAddress}</td>
                        <td>{stadium.phoneNumber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {modalOpen && selectedStadium && (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "white", 
            borderRadius: "10px", 
            padding: "20px", 
            width: "300px" 
        }}>
            <h3>{selectedStadium.stadiumName}</h3>
            <p>주소: {selectedStadium.address}</p>
            <p>상세주소: {selectedStadium.detailAddress}</p>
            <p>전화번호: {selectedStadium.phoneNumber}</p>
            {/* 수정 필요 */}
            <button onClick={() => router.push(`/admin/stadium/time?stadiumId=${selectedStadium.stadiumId}`)} className={styles.addButton} style={{marginRight : "10px"}}> 예약하기 </button>
            <button onClick={() => setModalOpen(false)} className={styles.deletebutton}>닫기</button>
            
        </div>
    </div>
    )}
        </div>
    );
}
