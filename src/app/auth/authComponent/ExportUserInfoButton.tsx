"use client";
import { Button } from "@mui/material";

type ExportUserInfoProps = {
    nickname: string;
    area: string;
};
export default function ExportUserInfoButton(props: ExportUserInfoProps) {
    const { nickname, area } = props;
    
    // 회원정보 제출
    function sendForm(){
        // TODO: 회원정보 제출 fetch 구현하기
        console.log(JSON.stringify({nickname, area}));

    }
    return (
        <Button onClick={sendForm} variant="contained">회원 정보 제출</Button>
    );
}