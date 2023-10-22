"use client;"
import { Button } from "@mui/material"

type CheckNickButtonProps = {
    nickname: string;
}

export default function CheckNickButton({nickname}: CheckNickButtonProps) {
    // 닉네임 중복 확인 API
    // TODO: API 주소 변경하기
    const nameCheckAPI = "http://localhost:3000/api/user/nickname";

    // 닉네임 중복 확인
    function checkName(){
        fetch(nameCheckAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({nickname}),
        }).then((res) => {
          if(res.status === 200){
            alert("사용 가능한 닉네임입니다.");
          } else {
            alert("이미 사용중인 닉네임입니다.");
          }
        })
      }

    return(

        <Button onClick={checkName}variant="contained" style={{margin:"10px"}}>중복 확인</Button>
    )
}