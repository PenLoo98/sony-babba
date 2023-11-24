import { Button } from "@mui/material";

type RejectApplyProps = {
  teamId: number;
  userId: number;
};

/**팀 가입 신청 거절 컴포넌트 */
export default function RejectApply({ teamId, userId }: RejectApplyProps) {
  // 팀 가입신청 거절 fetch
  async function rejectApply() {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 팀 가입신청 거절 API
    const rejectApplyURL = `https://withsports.shop:8000/team-service/team/${teamId}/teamUser/rejection/${userId}`;

    const response = await fetch(rejectApplyURL, {
      method: "PUT",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("rejectApplyResponse: ");
        console.log(data);
      });
  }

  return (
    <Button variant="contained" color="error" onClick={rejectApply}>
      거절
    </Button>
  );
}
