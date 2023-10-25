"use client";
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
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("expiredTime", JSON.stringify(expiredTime));
    }
  }, []);

  return (
    <div className="tokenInfo">
    </div>
  );
}
