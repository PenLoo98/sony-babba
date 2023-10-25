"use client;"
import { Button } from "@mui/material"

type CheckNickButtonProps = {
    nickname: string;
    setValidName: (event: boolean) => void;
}

export default function CheckNickButton({nickname, setValidName}: CheckNickButtonProps) {
    // 닉네임 중복 확인 API
    const nameCheckAPI = `http://api/user-service/signup/check/nickname?nickname=${nickname}`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 닉네임 중복 확인
    function checkName(){
        fetch(nameCheckAPI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }).then((res) => {
          if(res.status === 200){
            alert("사용 가능한 닉네임입니다.");
            console.log(res);
            setValidName(true);

          } else {
            alert("이미 사용중인 닉네임입니다.");
            console.log(res);
            setValidName(false);
          }
        })
      }

    return(

        <Button onClick={checkName}variant="contained" style={{margin:"10px"}}>중복 확인</Button>
    )
}