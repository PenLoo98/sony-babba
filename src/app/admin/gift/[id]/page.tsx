"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 기프티콘 상세화면  

type GiftInfo = {
  gifticonId?: number;
  imageUrl: string | null;
  categoryName: string;
  gifticonName: string;
  description: string;
  price: number;
  amount: number;
};

type ReadProps = {
    params: {
      id: number;
    };
  };

export default function GiftDetailPage(props: ReadProps) {
//   const [gift, setGift] = useState<GiftInfo | null>(null);
//   const router = useRouter();



//   const fetchGiftDetail = async (id: string) => {
//     const localStorage: Storage = window.localStorage;
//     const token = localStorage.getItem("accessToken");

//     try {
//       const response = await fetch(
//         `https://withsports.shop:8000/gifticon-service/gifticon/${id}`,
//         {
//           method: "GET",
//           headers: {
//             Credentials: "include",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         const message = await response.text();
//         throw new Error(message);
//       }

//       const data = await response.json();

//       if (data.code === "SUCCESS") {
//         setGift(data.data);
//       } else {
//         console.error("Error: Failed to fetch gifticon detail");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   if (!gift) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
        기프티콘 상세화면
      {/* <h1>{gift.gifticonName}</h1>
      <img src={gift.imageUrl} alt={gift.gifticonName} />
      <p>{gift.description}</p>
      <p>{gift.price}</p>
      <p>{gift.amount}</p> */}
    </div>
  );
}
