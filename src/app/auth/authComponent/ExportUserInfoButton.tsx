"use client";
import { Button } from "@mui/material";

type ExportUserInfoProps = {
  nickname: string;
  validName: boolean;
  area: string;
};
export default function ExportUserInfoButton(props: ExportUserInfoProps) {
  const { nickname, validName, area } = props;

  // 회원정보 제출
  function sendForm() {
    // TODO: 회원정보 제출 fetch 구현하기
    console.log(JSON.stringify({ nickname, area }));
  }
  return (
    <div>
      {validName ? (
        <Button onClick={sendForm} variant="contained">
          회원 정보 제출
        </Button>
      ) : (
        <Button onClick={sendForm} variant="contained" disabled>
          회원 정보 제출
        </Button>
      )}
    </div>
  );
}
