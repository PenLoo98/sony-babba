"use client";
import ValidToken from "@/components/Auth/ValidToken";
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
    const nameCheckAPI = `https://withsports.shop:8000/user-service/signup/check/nickname/`;

    // fetch API
    let res = await fetch(nameCheckAPI + `?teamname=${teamname}`, {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("사용 가능한 닉네임입니다.");
          setValidName(true);
        } else {
          alert("이미 사용중인 닉네임입니다.");
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
      <ValidToken />
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
