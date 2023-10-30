"use client";
import { Button } from "@mui/material";

type CheckSportProps = {
  sports: string;
  setValidSports: (event: boolean) => void;
};

export default function CheckSports({
  sports: sports,
  setValidSports,
}: CheckSportProps) {
  // 팀 이름 중복 확인
  async function checkName() {
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 팀 이름 중복 확인 API
    const teamNameCheckAPI = `https://withsports.shop:8000/team-service/team/validation/teamLeader/${sports}`;

    // fetch API
    let res = await fetch(teamNameCheckAPI, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("사용 가능한 팀 이름입니다.");
          setValidSports(true);
        } else {
          alert("이미 사용중인 팀 이름입니다.");
          setValidSports(false);
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  return (
    <div>
      <Button
        onClick={checkName}
        variant="contained"
        style={{ margin: "10px" }}
      >
        중복 확인
      </Button>
    </div>
  );
}
