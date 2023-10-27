"use client";
import { Button } from "@mui/material";
import https from "https";
import axios from "axios";
import { error } from "console";

type CheckNickButtonProps = {
  nickname: string;
  setValidName: (event: boolean) => void;
};

export default function CheckNickButton({
  nickname,
  setValidName,
}: CheckNickButtonProps) {
  // 액세스 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  // TODO: 토큰 유효성 검사
  // if (token === null) {
  //   alert("저장된 토큰이 없습니다.");
  //   // 토큰 만료시 재발급
  //   // 요청 팝업창을 띄웁니다.
  //   window.open(
  //     "http://3.37.203.5:8000/user-service/auth/reissue",
  //     "토큰 재발급",
  //     "width=500, height=500"
  //   );
  // }

  // 닉네임 중복 확인
  async function checkName() {
    // 테스트 1: Authorization: `Bearer ${token}` 추가
    // 테스트 2: Credentials: "include" 추가
    // 테스트 3: mode: "cors" 추가
    // 테스트 4: encodeURI로 요청 URL변경

    // 닉네임 중복 확인 API
    // const nameCheckAPI = `https://withsports.shop:8000/user-service/signup/check/nickname`;
    const nameCheckAPI = `https://withsports.shop:8000/user-service/signup/check/nickname/?nickname=${nickname}`;
    const encodedURL = encodeURI(nameCheckAPI + `?nickname=${nickname}`);

    // fetch API
    let res = await fetch(nameCheckAPI, {
      method: "GET",
      headers: {
        Credentials: "include",
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

    // axios API
    // params: {nickname }, // 이게 맞는 표현

    // axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    // axios
    //   .get(nameCheckAPI, {
    //     params: {nickname},
    //     headers: {
    //       Credentials: "include",
    //       ContentType: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data === true) {
    //       alert("이미 사용중인 닉네임입니다.");
    //       setValidName(false);
    //     } else {
    //       alert("사용 가능한 닉네임입니다.");
    //       setValidName(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <Button onClick={checkName} variant="contained" style={{ margin: "10px" }}>
      중복 확인
    </Button>
  );
}
