"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AcceptApply from "./AcceptApply";
import RejectApply from "./RejectApply";

type applyTeamProps = {
  teamId: number;
};

type applyInfo = {
  teamId: number;
  userId: number;
  introduction: string;
  elapsedTime: number;
};

type responseApplyList = {
  code: string;
  message: string;
  data: applyInfo[];
};

/** 팀 가입신청 목록 조회 */
export default function ShowApplyList({ teamId }: applyTeamProps) {
  // 팀 가입신청 조회 Modal state
  const [applyListModal, setApplyListModal] = useState(false);

  // 팀 가입신청 응답 데이터
  const initialApplyList: responseApplyList = {
    code: "",
    message: "",
    data: [
      {
        teamId: 0,
        userId: 0,
        introduction: "",
        elapsedTime: 0,
      },
    ],
  };
  const [applyList, setApplyList] =
    useState<responseApplyList>(initialApplyList);

  // 팀 가입신청 fetch
  async function getApplyList() {
    // 토큰
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 팀 가입신청 조회 API
    const getApplyListURL = `https://withsports.shop:8000/team-service/team/${teamId}/application`;

    const response = await fetch(getApplyListURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: responseApplyList) => {
        console.log("responseApplyList: ");
        console.log(data);
        if (data.code == "SUCCESS") {
          console.log("팀 가입 신청 목록 조회에 성공했습니다.");
          setApplyList(data);
        } else alert("팀 가입 신청 목록 조회에 실패했습니다.");
      });
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          getApplyList;
          setApplyListModal(!applyListModal);
        }}
        startIcon={<HandshakeIcon />}
        style={{ backgroundColor: "#7CE24B", color: "black" }}
      >
        가입 신청 조회
      </Button>
      <ModalCustom show={applyListModal} setShow={setApplyListModal}>
        <div>
          <h1>팀 가입 신청 목록</h1>
          <table style={{ marginTop: "40px" }}>
            <thead>
              <tr style={{ backgroundColor: "deepskyblue" }}>
                <th style={{ color: "black", padding: "10px" }}>팀 아이디</th>
                <th style={{ color: "black", padding: "10px" }}>유저 아이디</th>
                <th style={{ color: "black", padding: "10px" }}>자기소개</th>
                <th style={{ color: "black", padding: "10px" }}>경과 시간</th>
                <th style={{ color: "black", padding: "10px" }}>수락</th>
                <th style={{ color: "black", padding: "10px" }}>거절</th>
              </tr>
            </thead>
            <tbody>
              {applyList.data.map((applyInfo) => (
                <tr key={applyInfo.elapsedTime}>
                  <td>{applyInfo.teamId}</td>
                  <td>{applyInfo.userId}</td>
                  <td>{applyInfo.introduction}</td>
                  <td>{applyInfo.elapsedTime}</td>
                  <td>
                    <AcceptApply
                      teamId={applyInfo.teamId}
                      userId={applyInfo.userId}
                    />
                  </td>
                  <td>
                    <RejectApply
                      teamId={applyInfo.teamId}
                      userId={applyInfo.userId}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalCustom>
    </>
  );
}
