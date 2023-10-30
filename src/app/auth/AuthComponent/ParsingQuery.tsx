"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// 리다이렉트 URI에 붙은 쿼리를 파싱하는 컴포넌트
export default function ParsingQuery() {
  const params = useSearchParams();
  const router = useRouter();

  const accessToken: any | null = params.get("accessToken");
  const expiredTime: any | null = params.get("expiredTime");
  const userId: any | null = params.get("userId");

  useEffect(() => {
    const localStorage: Storage = window.localStorage;

    // 쿼리파라미터가 있다면 로컬스토리지에 액세스 토큰 저장
    if (accessToken && expiredTime) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expiredTime", expiredTime);
      localStorage.setItem("userId", userId);
    }

    // 데이터를 저장한 후 "/"로 리다이렉트합니다.
    router.push('/');
  }, []);

  return (
    <div className="tokenInfo">
    </div>
  );
}
