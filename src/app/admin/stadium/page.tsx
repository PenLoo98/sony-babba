"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

// 등록할 구장 정보
type StadiumInfo = {
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

    const router = useRouter();

    const [form, setForm] = useState<StadiumInfo>({
        stadiumName: "",
        address: "",
        detailAddress: "",
        phoneNumber: "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
                    ContentType: "application/json",
                    Authorization: `Bearer ${token}`,
                },
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
        fetchStadiums('서울'); // 임시로 서울 설정
    }, []);

    return (
        <div>
            <button onClick={() => setModalOpen(true)}>경기장 등록</button>
            {modalOpen && (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">등록</button>
                </form>
            )}
            {/* 경기장 목록 표시 */}
            {/* {stadiums.map((stadium, index) => (
                // TODO: 경기장 정보 표시
            ))} */}
        </div>
    );
}
