import React, { useState } from "react";

type IsMatchingProps = {
  matchingRoomId: number;
};

type IsMatchingResponse = {
  code: string;
  message: string;
  data: {
    matched: boolean;
  };
};

/**해당 매칭방이 매치가 되었는지 확인하는 컴포넌트 */
export default function IsMatching({ matchingRoomId }: IsMatchingProps) {
  // 매치되었는지 확인하는 state
  const [isMatched, setIsMatched] = useState<boolean>(false);

  // 매칭 확인 fetch
  async function getMatchingStatus() {
    // 로컬스토리지 토큰 가져오기
    const token = localStorage.getItem("accessToken");

    // 매칭 확인 API
    const isMatchedAPI = `https://withsports.shop:8000//matching-service/matching/${matchingRoomId}/isMatched`;

    const response = await fetch(isMatchedAPI, {
      method: "GET",
      headers: {
        Credential: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: IsMatchingResponse) => {
        if (data.code !== "SUCCESS") {
          console.log("매칭 확인 API 응답");
          console.log(data);
          setIsMatched(data.data.matched);
        } else {
          console.log("매칭 확인 API 응답 실패");
          console.log(data);
        }
      });
  }

  return <>{isMatched ? <p>매칭 완료</p> : <p>매칭중</p>}</>;
}
