"use client";
import React from "react";
import Button from "@mui/material/Button";

type SearchingProps = {
  matchingRoomId: number;
};

export default function SearchingButton({
  matchingRoomId,
}: SearchingProps) {
  const [isSearching, setIsSearching] = React.useState(false);
  async function startMatching() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 매칭 탐색 시작 API
    const startMatchingURL = `https://withsports.shop:8000/matching-service/matching/${matchingRoomId}/start`;

    fetch(startMatchingURL, {
      method: "POST",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        alert("매칭 탐색을 시작합니다.");
        setIsSearching(true);
      } else if (res.status === 401) {
        alert("다시 로그인해주세요");
      } else {
        alert("잘못된 요청입니다.");
      }
    });
  }

  async function cancelMatching() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 매칭 탐색 시작 API
    const cancelMatchingURL = `https://withsports.shop:8000/matching-service/matching/${matchingRoomId}/cancel`;

    fetch(cancelMatchingURL, {
      method: "POST",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        alert("매칭을 취소합니다.");
        setIsSearching(true);
      } else if (res.status === 401) {
        alert("다시 로그인해주세요");
      } else {
        alert("잘못된 요청입니다.");
      }
    });
  }

  return (
    <>
      {isSearching ? (
        <Button variant="outlined" onClick={cancelMatching}>
          탐색 취소
        </Button>
      ) : (
        <Button variant="outlined" onClick={startMatching}>
          매칭 탐색
        </Button>
      )}
    </>
  );
}
