import { Button } from "@mui/material";

type AcceptApplyProps = {
  teamId: number;
  userId: number;
};

/**팀 가입 신청 수락 컴포넌트 */
export default function AcceptApply({ teamId, userId }: AcceptApplyProps) {
  // 팀 가입신청 수락 fetch
  async function acceptApply() {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 팀 가입신청 수락 API
    const acceptApplyURL = `https://withsports.shop:8000/team-service/team/${teamId}/teamUser/acceptance/${userId}`;

    const response = await fetch(acceptApplyURL, {
      method: "PUT",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("acceptApplyResponse: ");
        console.log(data);
      });
  }

  return (
    <Button variant="contained" color="success" onClick={acceptApply}>
      수락
    </Button>
  );
}
