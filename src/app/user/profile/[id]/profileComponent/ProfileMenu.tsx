"use client";
import { TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SmsIcon from "@mui/icons-material/Sms";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ReportIcon from "@mui/icons-material/Report";

type PageParams = {
  id: number;
};

export default function ProfileMenu({params}:{params:PageParams}) { 
  // console.log(params.id);

  // 검색할 닉네임
  const [nickname, setNickname] = useState("");
  const typeName = (e: any) => {
    setNickname(e.target.value);
  };

  // 본인 프로필인지 확인
  const [isYourProfile, setIsYourProfile] = useState(false);
  const swithYours = () => {
    setIsYourProfile(!isYourProfile);
  }

  //

  const searchName = () => {
    // 입력값 확인
    console.log(nickname);
    // const url = "http://localhost:8080/user/profile";
    // // TODO: POST - name에 맞는 id 가져오기
    // try {
    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",

    //         },
    //         body: JSON.stringify({ name: name }),
    //         });

    // }

    // 없는 닉네임인 경우
    // alert("존재하지 않는 닉네임입니다.");

    // 닉네임이 있는 경우 해당 닉네임의 id로 이동
    // router.push("/user/profile/1");
  };

  // 프로필 수정 페이지로 이동
  const editProfile = () => {
    const url = `/user/profile/${params.id}/edit`;
    window.open(url, "authPopup", "width=800, height=600");
  };

  return (
    <div className="profile-menu">
      <div className="profile-menu-search">
        <TextField
          id="outlined-basic"
          label="사용자 닉네임 검색"
          variant="outlined"
          value={nickname}
          onChange={typeName}
        />
        <Image
          onClick={searchName}
          src="/search.png"
          alt="search"
          width={40}
          height={40}
          style={{ margin: "10px 0 0 10px" }}
        />
      </div>

      <div
        className="profile-3menu"
        style={{ flexDirection: "column", marginTop: "15px" }}
      >
        {/* 본인, 타인 프로필 테스트 버튼 */}
        <Button variant="outlined" onClick={swithYours}>
                {isYourProfile ? "내 프로필" : "다른 프로필"}
              </Button>
        {isYourProfile ? (
          <div className="your-profile">
            <div className="profile-edit" style={{ marginTop: "5px" }}>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={editProfile}>
                프로필 수정
              </Button>
            </div>
            <div className="delete-account" style={{ marginTop: "5px" }}>
              <Button variant="outlined" startIcon={<DeleteForeverIcon />} style={{color:"red"}}>
                회원 탈퇴
              </Button>
            </div>
          </div>
        ) : (
          <div className="another-profile">
            <div className="message-button" style={{ marginTop: "5px" }}>
              <Button variant="outlined" startIcon={<SmsIcon />}>
                메시지
              </Button>
            </div>
            <div className="invite-button" style={{ marginTop: "5px" }}>
              <Button variant="outlined" startIcon={<HandshakeIcon />}>
                팀원 신청
              </Button>
            </div>
            <div className="report-button" style={{ marginTop: "5px" }}>
              <Button variant="outlined" startIcon={<ReportIcon />}>
                사용자 신고
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
