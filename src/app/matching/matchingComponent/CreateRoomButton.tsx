"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
import SelectSports from "@/app/team/teamComponent/SelectSports";
import SelectArea from "@/app/team/teamComponent/SelectArea";

type createRoomInfo = {
  title: string;
  sports: string;
  area: string;
  capacity: number;
};

export default function CreateRoomButton() {
  // 매칭방 생성 모달
  const [showForm, setShowForm] = useState(false);

  // 매칭방 제목
  const [title, setTitle] = useState("");
  const typeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  // 스포츠 종목
  const [sports, setSports] = useState<string>("");

  // 경기 지역
  const [area, setArea] = useState<string>("");

  // 수용 인원
  const [capacity, setCapacity] = useState<number>(0);
  const typeCapacity = (e: any) => {
    setCapacity(e.target.value as number);
  };

  // 매칭방 생성 fetch
  async function requestCreateRoom() {
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 매칭방 생성 API
    const createRoomURL =
      "https://withsports.shop:8000/matching-service/matching/room";

    // 요청 body
    const bodyJSON: createRoomInfo = {
        title: title,
        sports: sports,
        area: area,
        capacity: capacity,
    };

    const response = await fetch(createRoomURL, {
      headers: {
        "Credentials": "include",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(bodyJSON),
    });
  }

  return (
    <div>
      <Button variant="contained" onClick={requestCreateRoom}>
        매칭방 생성
      </Button>
      <ModalCustom show={showForm} setShow={setShowForm}>
        <h1>매칭방 생성</h1>
        <TextField
          id="outlined-basic"
          label="매칭방 제목"
          variant="outlined"
          value={title}
          onChange={typeTitle}
          style={{ margin: "10px 0 10px 0" }}
        />
        <SelectSports sports={sports} setSports={setSports} />
        <SelectArea area={area} setArea={setArea} />
        <TextField
          id="outlined-basic"
          label="수용인원"
          variant="outlined"
          value={capacity}
          onChange={typeCapacity}
          style={{ margin: "10px 0 10px 0" }}
        />
      </ModalCustom>
    </div>
  );
}
