import React, { useState } from "react";
import Button from "@mui/material/Button";

type IsMatchingProps = {
  matchingRoomId: number;
};

type startEndMatchResponse = {
  code: string;
  message: string;
  data: null ;
};

/**해당 매칭방이 매치가 되었는지 확인하는 컴포넌트 */
export default function StartEndMatch({ matchingRoomId }: IsMatchingProps) {
  // 매치가 시작되었는지 확인하는 상태
  const [isMatched, setIsMatched] = useState<boolean>(false);

  // 경기 종료 확인 상태
  const [isEnded, setIsEnded] = useState<boolean>(false);

  // 매치 시작 Fetch
  async function startMatch() {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 매치 시작 API
    const startMatchAPI = `https://withsports.shop:8000/matching-service/matching/${matchingRoomId}/startGame`;

    // 매칭 시작 fetch
    const startMatchResponse = await fetch(startMatchAPI, {
      method: "POST",
      headers: {
        Credential: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: startEndMatchResponse) => {
        if (data.code == "SUCCESS") {
          alert("경기가 시작되었습니다.");
          console.log("매치 시작");
          console.log(data);
          setIsMatched(true);
        } else {
          console.log("매치 시작 실패");
          console.log(data);
        }
      });
  }

  // 매치 종료 Fetch
  async function endMatch() {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 매치 종료 API
    const endMatchAPI = `https://withsports.shop:8000/matching-service/matching/${matchingRoomId}/endGame`;

    // TODO: 매치 결과 동적으로 입력받는 거 구현하기
    // 매치 결과 JSON 
    let matchResult = {
      score: 2,
      opponentScore: 1,
      result: "승리",
    }

    // 매칭 종료 fetch
    const endMatchResponse = await fetch(endMatchAPI, {
      method: "POST",
      headers: {
        Credential: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(matchResult),
    })
      .then((res) => res.json())
      .then((data : startEndMatchResponse) => {
        if (data.code == "SUCCESS") {
          alert("경기가 종료되었습니다.");
          console.log("매치 종료");
          console.log(data);
          setIsEnded(true);
        } else {
          console.log("매치 종료 실패");
          console.log(data);
        }
      });
  }

  return (
    <>
      {isMatched && !isEnded && (
        <Button variant="outlined" onClick={startMatch}>
          매치 시작
        </Button>
      )}
      {!isMatched && !isEnded &&(
        <Button variant="outlined" onClick={endMatch}>
          매치 종료
        </Button>
      )}
      {isEnded && <p>경기 끝</p>}
    </>
  );
}
