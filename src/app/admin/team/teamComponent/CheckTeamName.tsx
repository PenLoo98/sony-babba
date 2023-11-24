"use client";
import { Button } from "@mui/material";

type CheckTeamNameProps = {
  teamname: string;
  setValidName: (event: boolean) => void;
};

export default function CheckTeamName({
  teamname: teamname,
  setValidName,
}: CheckTeamNameProps) {
  // 팀 이름 중복 확인
  async function checkName() {
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 팀 이름 중복 확인 API
    const teamNameCheckAPI = `https://withsports.shop:8000/team-service/team/check/${teamname}`;

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
          setValidName(true);
        } else if (res.status === 401) {
          alert("다시 로그인해주세요");
        } else {
          alert("이미 사용중인 팀 이름입니다.");
          setValidName(false);
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
