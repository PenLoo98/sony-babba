"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

// 기프티콘 구매 주문 요청
// (POST) /gifticon-service/order/gifticon

// 주문 정보
type OrderInfo = {
  gifticonId: number; // 기프티콘 ID
  toUserId: number; // 기프티콘을 받는 사용자의 ID
  toUserNickName: string; // 기프티콘을 받는 사용자의 닉네임
  amount: number; // 기프티콘 주문 수량
  letter: string; // 기프티콘에 담을 편지
};

// 주문자 정보
type UserInfo = {
  userId: number;
  nickname: string;
  balance: number;
};

export default function GiftOrderPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    gifticonId: 0,
    toUserId: 0,
    toUserNickName: "",
    amount: 0,
    letter: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("권한이 없습니다.");
      router.push("/admin");
      return;
    }

    try {
      const response = await fetch(
        "https://withsports.shop:8000/gifticon-service/order/gifticon",
        {
          method: "POST",
          headers: {
            Credentials: "include",
            ContentType: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderInfo),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.code === "SUCCESS") {
        alert(data.message);
        // 주문 성공 후 원하는 페이지로 이동
        router.push("/somewhere");
      } else {
        alert("주문에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
        <br />
        <br />
        <form onSubmit={handleSubmit}  className={styles["modal-form"]}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                width: "300px",
              }}>
        {/* 기프티콘 사진 가져와져야함. */}
        <div>
        기프티콘 ID: 
        <input
          type="number"
          name="gifticonId"
          value={orderInfo.gifticonId}
          onChange={handleChange}
          placeholder="기프티콘 ID"
          required
        />
        <br />
        <br />
        받을 사람 ID: 
        <input
          type="number"
          name="toUserId"
          value={orderInfo.toUserId}
          onChange={handleChange}
          placeholder="기프티콘 받을 사용자의 ID"
          required
        />
        <br />
        <br />
        받을사람 닉네임 :
        <input
          type="text"
          name="toUserNickName"
          value={orderInfo.toUserNickName}
          onChange={handleChange}
          placeholder="기프티콘 받을 사용자의 닉네임"
          required
        />
        <br />
        <br />
        주문 수량 :
        <input
          type="number"
          name="amount"
          value={orderInfo.amount}
          onChange={handleChange}
          placeholder="기프티콘 주문 수량"
          required
        />
        <br />
        <br />
        편지 :
        <textarea
          name="letter"
          value={orderInfo.letter}
          onChange={handleChange}
          placeholder="기프티콘에 담을 편지"
          required
        />
        </div>
        <br />
        <br />
        <button type="submit" className={styles.addButton}>
            선물하기
        </button>
        <button type="button" className={styles.backbutton}> 뒤로가기
        </button>
        </form>
    </div>
    );
}
