"use client";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// 리다이렉트 URI에 붙은 쿼리를 파싱하는 컴포넌트
export default function ParsingQuery() {
  const params = useSearchParams();

  const accessToken: String | null = params.get("accessToken");
  const expiredTime: String | null = params.get("expiredTime");

  useEffect(() => {
    const localStorage: Storage = window.localStorage;

    // 쿼리파라미터가 있다면 로컬스토리지에 액세스 토큰 저장
    if (accessToken && expiredTime) {
      const tokenInfo = {
        accessToken: accessToken,
        expiredTime: expiredTime,
      };
      localStorage.setItem("accessToken", JSON.stringify(tokenInfo));
    }
  }, []);

  // 로컬스토리지의 액세스 토큰 POST로 보내기
  function postAccessToken() {
    const url = "http://localhost:8080/api/v1/auth/token";

    // 로컬스토리지에서 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const tokenInfo: string | null = localStorage.getItem("accessToken");

    if (tokenInfo === null) {
      alert("저장된 토큰이 없습니다.");
      return;
    }

    if (tokenInfo !== null) {
      const tokenInfoJson: String = JSON.parse(tokenInfo);
      console.log(tokenInfoJson);
      // fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${tokenInfoJson}`,
      //   },
      //   body: JSON.stringify({
      //     test: "accessToken in localStorage to server POST with header",
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .catch((error) => console.error("Error:", error));
    }
  }

  // 아무 표시 하고 싶지 않다면 null;로 처리할 것.
  if (accessToken === null || expiredTime === null) {
    return <div>토큰이 없습니다.</div>;
  }

  return (
    <div className="tokenInfo">
      <p>Access Token: {accessToken}</p>
      <p>Expired Time: {expiredTime}</p>
      <Button onClick={postAccessToken} variant="contained" color="primary">
        액세스 토큰 POST
      </Button>
    </div>
  );
}
