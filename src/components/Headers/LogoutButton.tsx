"use client";
import { Button } from "@mui/material";
import Image from "next/image";

type logoutParams = { 
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export default function LogoutButton({isLogin, setIsLogin} : logoutParams) {
  // TODO: 로그아웃 POST 요청 구현하기
  async function logout() {
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    const logoutAPI: string =
      "https://withsports.shop:8000/user-service/auth/logout";
    const response = await fetch(logoutAPI, {
      method: "POST",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // 액세스 토큰 삭제
          localStorage.removeItem("accessToken");
          localStorage.removeItem("expiredTime");
          localStorage.removeItem("userId");

          alert("로그아웃 되었습니다.");
          window.location.href = "/";
        } 
        else if(res.status === 401){
            alert("다시 로그인 해주세요.")
            setIsLogin(false);
            location.reload();
        }
        else{
          alert("로그아웃에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="logoutNaver">
      <Button
        onClick={logout}
        startIcon={
          <Image src="/naver.png" alt="naver" width={50} height={50} />
        }
        style={{
          background: "#27D34A",
          color: "black",
          margin: "20px",
        }}
      >
        로그아웃
      </Button>
    </div>
  );
}
