"use client";
import React, { useState } from "react";
import ModalCustom from "@/components/ModalCustom";
import { Button, TextField } from "@mui/material";

type applyTeamProps = {
  teamId: number;
};

export default function ApplyTeam({ teamId }: applyTeamProps) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [intro, setTypeIntro] = useState("");

  const typeIntro = (e: any) => {
    e.preventDefault();
    setTypeIntro(e.target.value);
  };

  const showJoinPage = () => {
    setShowJoinModal(!showJoinModal);
  };

  async function applyTeam() {
    const joinTeamURL = `https://withsports.shop:8000/team-service/teamuser`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 테스트 코드
    console.log("팀 가입 teamId: " + teamId);
    console.log("팀 가입 introduction: " + intro);

    let joinTeamUserRequest = {
      teamId,
      introduction: intro,
    };

    // 팀 가입 fetch
    fetch(joinTeamURL, {
      method: "POST",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(joinTeamUserRequest),
    })
      .then((res) => {
        // TODO: 응답 status에 맞춰서 처리하는지 확인하기
        if (res.status == 200) {
          alert("팀 가입 신청에 성공했습니다.");
          setTypeIntro("");
          setShowJoinModal(false);
          console.log(res);
        } else if (res.status == 409) {
          alert("없는 팀입니다.");
          console.log(res);
        } else {
          alert("팀 가입 신청에 실패했습니다.");
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  return (
    <>
      <Button onClick={showJoinPage}>가입</Button>
      <ModalCustom show={showJoinModal} setShow={setShowJoinModal}>
        <div className="applyTeam">
          <h1>팀 가입 신청</h1>
          <TextField
            id="outlined-basic"
            label="자기소개"
            variant="outlined"
            value={intro}
            onChange={typeIntro}
            style={{ margin: "10px 0 10px 0" }}
            multiline
            rows={3}
          />
          <p>팀 가입 신청을 하시겠습니까?</p>
          <Button onClick={applyTeam}>가입 신청</Button>
        </div>
      </ModalCustom>
    </>
  );
}
