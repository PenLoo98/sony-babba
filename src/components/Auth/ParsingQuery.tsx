"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// 리다이렉트 URI에 붙은 쿼리를 파싱하는 컴포넌트
export default function ParsingQuery() {
  const params = useSearchParams();

  const accessToken = params.get("accessToken");
  const expiredTime = params.get("expiredTime");

  useEffect(() => {
    const localStorage: Storage = window.localStorage;
    // 로컬스토리지에 토큰 저장
    localStorage.setItem(
      "accessToken",
      JSON.stringify([accessToken, expiredTime])
    );
  }, [accessToken, expiredTime]);

  // 아무 표시 하고 싶지 않다면 null;로 처리할 것.
  if (accessToken === null || expiredTime === null) {
    return <div>토큰이 없습니다.</div>;
  }
  return (
    <div className="tokenInfo">
      <p>Access Token: {accessToken}</p>
      <p>Expired Time: {expiredTime}</p>
    </div>
  );
}
