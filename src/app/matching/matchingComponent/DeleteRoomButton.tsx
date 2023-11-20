// TODO: 방 입장 버튼 컴포넌트
// TODO: 방 입장 fetch 구현
import React from 'react';
import Button from '@mui/material/Button';

type DeleteRoomButtonProps = {
  matchingRoomId: number;
};

export default function DeleteRoomButton({
  matchingRoomId,
}: DeleteRoomButtonProps) {
  async function deleteRoom() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 방 퇴장 API
    const enterRoomURL = `https://withsports.shop:8000/matching-service/matching/room/${matchingRoomId}`;

    fetch(enterRoomURL, {
      method: "DELETE",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        alert("매칭방을 삭제했습니다.");
      } else if (res.status === 401) {
        alert("다시 로그인해주세요");
      } else {
        alert("잘못된 요청입니다.");
      }
    });
  }

  return (
    <Button variant='text' onClick={deleteRoom}>삭제</Button>
  );
}
