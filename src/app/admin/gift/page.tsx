"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

type GiftInfo = {
  categoryName: string; // 카테고리 이름
  gifticonName: string; // 상품명
  description: string; // 설명
  price: number; // 가격
  amount: number; // 수량
};

export default function GifticonPage() {
  // 더미 데이터
  const dummyGifts = [
    {
      categoryName: "음식",
      gifticonName: "치킨",
      description: "순살이라 더 맛있음",
      price: 18000,
      amount: 30,
    },
  ];

  // 기프티콘 등록 관리 페이지
  const [gifts, setGifts] = useState(dummyGifts);
  //const [gifts, setGifts] = useState<GiftInfo[]>([]);
  const router = useRouter();

  const [form, setForm] = useState({
    categoryName: "",
    gifticonName: "",
    description: "",
    price: 0,
    amount: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 토큰이 없으면 홈페이지로 리디렉션
    if (!token) {
      router.push("/admin");
      return;
    }
    try {
      const response = await fetch("/gifticon-service/gifticon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.code === "SUCCESS") {
        alert(data.message);
        // 성공적으로 등록 후, 데이터 다시 불러오기
        fetchGifts();
      } else {
        alert("등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setModalOpen(false);
  };

  const fetchGifts = async () => {
    try {
      const response = await fetch("/gifticon-service/gifticon");
      const data = await response.json();
      setGifts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/gift.png" />
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "20px",
        }}
      >
        <button onClick={() => setModalOpen(true)} className={styles.addButton}>
          기프티콘 등록
        </button>
        {modalOpen && (
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
            }}
          >
            <form
              onSubmit={handleSubmit}
              className={styles["modal-form"]}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                width: "300px",
              }}
            >
              <label>
                Category
                <input
                  type="text"
                  name="categoryName"
                  onChange={handleChange}
                />
              </label>
              <label>
                Gifticon
                <input
                  type="text"
                  name="gifticonName"
                  onChange={handleChange}
                />
              </label>
              <label>
                Description
                <input type="text" name="description" onChange={handleChange} />
              </label>
              <label>
                Price
                <input type="number" name="price" onChange={handleChange} />
              </label>
              <label>
                Amount
                <input type="number" name="amount" onChange={handleChange} />
              </label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  className={styles.addButton}
                  style={{ marginRight: "10px" }}
                >
                  등록
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className={styles.deletebutton}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}
        <table style={{ marginTop: "40px" }}>
          <thead>
            <tr style={{ backgroundColor: "black" }}>
              <th style={{ color: "white", padding: "10px" }}>카테고리</th>
              <th style={{ color: "white", padding: "10px" }}>상품명</th>
              <th style={{ color: "white", padding: "10px" }}>설명</th>
              <th style={{ color: "white", padding: "10px" }}>가격</th>
              <th style={{ color: "white", padding: "10px" }}>수량</th>
            </tr>
          </thead>
          <tbody>
            {gifts.length === 0 ? (
              <tr>
                <td colSpan={5}>상품을 등록해주세요!</td>
              </tr>
            ) : (
              gifts.map((gift, index) => (
                <tr key={index}>
                  <td>{gift.categoryName}</td>
                  <td>{gift.gifticonName}</td>
                  <td>{gift.description}</td>
                  <td>{gift.price}</td>
                  <td>{gift.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
