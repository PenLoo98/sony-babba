// TODO: 방 입장 버튼 컴포넌트
// TODO: 방 입장 fetch 구현
import React from 'react';
import Button from '@mui/material/Button';

type ExitRoomButtonProps = {
  matchingRoomId: number;
};

export default function ExitRoomButton({
  matchingRoomId,
}: ExitRoomButtonProps) {
  async function exitRoom() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 방 퇴장 API
    const enterRoomURL = `https://withsports.shop:8000/matching-service/matchingroom/${matchingRoomId}`;

    fetch(enterRoomURL, {
      method: "DELETE",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        alert("방에서 퇴장했습니다.");
        location.reload();
      } else if (res.status === 401) {
        alert("다시 로그인해주세요");
      } else {
        alert("잘못된 요청입니다.");
      }
    });
  }

  return (
    <Button variant='text' onClick={exitRoom}>나가기</Button>
  );
}
