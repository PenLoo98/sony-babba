// 로그인 시도 시 리다이렉트 처리
"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ParsingQuery() {
  const router = useRouter();
  const accessToken = router.query.accessToken;

  useEffect(() => {
    const accessToken = router.query.accessToken;
    const expiredTime = router.query.expiredTime;

    console.log("Access Token:", accessToken);

    // 로컬스토리지에 토큰 저장
    localStorage.setItem(
      "accessToken",
      JSON.stringify([accessToken, expiredTime])
    );
  }, [router.query.accessToken, router.query.expiredTime]);

  return console.log("Access Token:", accessToken);
}
