"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

// 등록할 구장 정보
type StadiumInfo = {
    stadiumId ?: number;
    stadiumName : string;   // 구장 이름
    address : string;       // 구장 주소
    detailAddress : string; // 구장 상세 주소
    phoneNumber : string;   // 구장 전화번호
}

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


// 구장 등록 (POST) /booking-service/admin/stadium 
// 구장 조회 (GET) /booking-service/stadium/{area}
// PathVariable로 지역 이름 담아서 보내면 리스트 형식으로 반환

export default function StadiumManagePage({ params }: { params: PageParams }){

    const [stadiums, setStadiums] = useState<StadiumInfo[]>([]);
    const [selectedStadium, setSelectedStadium] = useState<StadiumDetail | null>(null);

    const [form, setForm] = useState<StadiumInfo>({
        stadiumName: "",
        address: "",
        detailAddress: "",
        phoneNumber: "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("서울");
    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.stadiumName || !form.address || !form.detailAddress || !form.phoneNumber) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        // 로컬스토리지 토큰 가져오기
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        // 토큰이 없으면 홈페이지로 리디렉션
        if (!token) {
            alert("권한이 없습니다.");
            router.push("/admin");
            return;
        }
        try {
            const response = await fetch('https://withsports.shop:8000/booking-service/admin/stadium', {
                method: 'POST',
                headers: {
                    Credentials: "include",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
            
            const data = await response.json();
    
            if (data.code === 'SUCCESS') {
                alert(data.message);
                // alert('경기장 등록에 성공했습니다.');
                fetchStadiums('서울');  // 경기장 목록 새로고침
                window.location.reload();
            } else {
                alert('경기장 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('경기장 등록 중 오류가 발생했습니다.');
        }
    
        // 입력 폼 초기화
        setForm({
            stadiumName: "",
            address: "",
            detailAddress: "",
            phoneNumber: "",
        });
    };

    
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
            <button onClick={() => setAddModalOpen(true)} className={styles.addButton}>경기장 등록</button>
            {addModalOpen && (
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}>
                <form onSubmit={handleSubmit} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    backgroundColor: "white", 
                    borderRadius: "10px", 
                    padding: "20px", 
                    width: "300px" 
                }}>
                    {/* 경기장 등록 폼 */}
                    <label>
                        StadiumName
                        <input type="text" name="stadiumName" onChange={handleChange} />
                    </label>
                    <label>
                        Address
                        <input type="text" name="address" onChange={handleChange} />
                    </label>
                    <label>
                        DetailAddress
                        <input type="text" name="detailAddress" onChange={handleChange} />
                    </label>
                    <label>
                        PhoneNumber
                        <input type="text" name="phoneNumber" onChange={handleChange} />
                    </label>
                    <button type="submit" className={styles.addButton} style={{marginRight:"10px"}}>등록</button>
                    <button type="button" onClick={()=>setAddModalOpen(false)} className={styles.deletebutton}>뒤로 가기</button>
                </form>
            </div>
            )}
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
            <button onClick={() => router.push(`/admin/stadium/time?stadiumId=${selectedStadium.stadiumId}`)} className={styles.addButton} style={{marginRight : "10px"}} > 시간 등록</button>
            <button onClick={() => setModalOpen(false)} className={styles.deletebutton}>닫기</button>
            
        </div>
    </div>
    )}
        </div>
    );
}
