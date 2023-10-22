"use client";
import { Alert, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SuccessMsgProps = {
  successMsg: string;
  failMsg: string;
  buttonText: string;
  redirectURL?: string;
};

export default function MsgButton({ successMsg, failMsg, buttonText, redirectURL = '/' }: SuccessMsgProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(true);
  // result가 true면 성공, false면 실패

  const handleClose = () => {
    setOpen(false);
  };

  // 로그아웃 버튼 클릭 시
  // 모달 창 띄우고 리다이렉트
  const logout = () => {
    setOpen(true);
    if (!open) {
      router.push(redirectURL); // '/'로 리다이렉트
    }
    // 성공시
    // setResult(true);
    // 실패시
    // setResult(false);
  };

  return (
    <div className="success-msg" style={{ display: "flex" }}>
      <Modal open={open} onClose={handleClose}>
        <div
          className="custom-modal"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {result ? <Alert severity="success">{successMsg}</Alert> : <Alert severity="error">{failMsg}</Alert>}
        </div>
      </Modal>

      <Button onClick={logout} variant="contained"
      style={{margin: "20px"}}>
        {buttonText}
      </Button>
    </div>
  );
}
