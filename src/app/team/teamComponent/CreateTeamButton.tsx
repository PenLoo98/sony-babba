"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import ModalCustom from "@/components/ModalCustom";
import SelectSports from "../teamComponent/SelectSports";
import SelectArea from "../teamComponent/SelectArea";
import InsertTeamImage from "../teamComponent/InsertTeamImage";
import CheckTeamName from "../teamComponent/CheckTeamName";
import CheckSports from "../teamComponent/CheckSports";

export default function CreateTeamButton() {
  // 팀 생성 모달
  const [showForm, setShowForm] = useState(false);
  const createTeamForm = () => {
    setShowForm(true);
  };

  // 팀 이름
  const [teamName, setTeamName] = useState("");
  const typeTeamName = (e: any) => {
    setTeamName(e.target.value);

  };

  // 팀 이름 중복 확인
  const [validName, setValidName] = useState(false);

  // 팀 종목
  const [sports, setSports] = useState("");

  // 팀 종목 중복 확인
  const [validSports, setValidSports] = useState(false);

  // 팀 지역
  const [area, setArea] = useState("");

  // 팀 소개
  const [teamIntro, setTeamIntro] = useState("");
  const typeTeamIntro = (e: any) => {
    setTeamIntro(e.target.value);
  };

  // 팀 이미지
  const [teamImage, setTeamImage] = useState("/team-default-image.png");
  const [teamImageFile, setTeamImageFile] = useState<File>();

  // 팀 생성 제출
  async function postTeamInfo() {
    const createTeamURL = "https://withsports.shop:8000/team-service/team";

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // FormTeamData 생성
    const TeamInfoFormData = new FormData();

    let CreateTeamRequest = {
      teamName: teamName,
      sports: sports,
      area: area,
      introduction: teamIntro,
    };

    // FormTeamData에 데이터 추가
    TeamInfoFormData.append(
      "CreateTeamRequest",
      new Blob([JSON.stringify(CreateTeamRequest)], {
        type: "application/json",
      })
    );
    if (teamImageFile) {
      TeamInfoFormData.append("image", teamImageFile);
    }

    fetch(createTeamURL, {
      method: "POST",
      headers: {
        "Credentials": "include",
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
      body: TeamInfoFormData,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("팀 생성에 성공했습니다.");
          console.log(res);
        } else {
          alert("팀 생성에 실패했습니다.");
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={createTeamForm}
        style={{ margin: "10px 0 10px 0", gridColumnStart: "2" }}
      >
        팀 생성
      </Button>

      {/* 팀 생성 모달 */}
      <ModalCustom show={showForm} setShow={setShowForm}>
        <h1>팀 생성</h1>
        <InsertTeamImage
          teamImage={teamImage}
          setTeamImage={setTeamImage}
          teamImageFile={teamImageFile}
          setTeamImageFile={setTeamImageFile}
        />
        <div
          className="teamNameVaild"
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            id="outlined-basic"
            label="팀 이름"
            variant="outlined"
            value={teamName}
            onChange={typeTeamName}
            style={{ margin: "10px 0 10px 0" }}
          />
          <CheckTeamName teamname={teamName} setValidName={setValidName} />
        </div>

        <div
          className="teamSports"
          style={{ display: "flex", alignItems: "center" }}
        >
          <SelectSports sports={sports} setSports={setSports} />
          <CheckSports sports={sports} setValidSports={setValidSports} />
        </div>

        <br />
        <SelectArea area={area} setArea={setArea} />
        <TextField
          id="outlined-basic"
          label="팀 소개"
          variant="outlined"
          value={teamIntro}
          onChange={typeTeamIntro}
          multiline
          rows={4}
          style={{ margin: "10px 0 10px 0" }}
        />
        {validName && validSports ? (
          <Button
            variant="outlined"
            onClick={postTeamInfo}
            style={{ display: "flex", alignItems: "center" }}
          >
            팀 생성하기
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={postTeamInfo}
            style={{ display: "flex", alignItems: "center" }}
            disabled
          >
            팀 생성하기
          </Button>
        )}
      </ModalCustom>
    </div>
  );
}
