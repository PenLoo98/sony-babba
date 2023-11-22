// TODO: 방 입장 버튼 컴포넌트
// TODO: 방 입장 fetch 구현

import { Button } from "@mui/material";

type EnterRoomButtonProps = {
  matchingRoomId: number;
};

export default function EnterRoomButton({
  matchingRoomId,
}: EnterRoomButtonProps) {
  async function enterRoom() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 방 입장 API
    const enterRoomURL = `https://withsports.shop:8000/matching-service/matchingroom/${matchingRoomId}`;

    fetch(enterRoomURL, {
      method: "POST",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        alert("방에 입장하였습니다.");
        location.reload();
      } else if (res.status === 401) {
        alert("다시 로그인해주세요");
      } else {
        alert("방에 입장할 수 없습니다.");
      }
    });
  }

  return (
    <Button variant="outlined" onClick={enterRoom}>
      참가
    </Button>
  );
}
