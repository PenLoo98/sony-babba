"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import GetBelongTeam from "../teamComponent/GetBelongTeam";
import TextField from "@mui/material/TextField";
import ModalCustom from "@/components/ModalCustom";
import SelectSports from "../teamComponent/SelectSports";
import SelectArea from "../teamComponent/SelectArea";
import InsertTeamImage from "../teamComponent/InsertTeamImage";
import CheckTeamName from "../teamComponent/CheckTeamName";
import CheckSports from "../teamComponent/CheckSports";

export default function TeamSpecific() {
  // 팀 메인 페이지 그리드 스타일
  const teamMainStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 0.5fr",
    gridTemplateRows: "1fr 0.5fr",
    gap: "10px 10px",
    gridTemplateAreas: `
      ". . . ."
      ". . . ."
      `,
  };

  // 팀장인지 아닌지 확인
  const [isLeader, setIsLeader] = useState(false);
  // 팀 생성 모달
  const [showForm, setShowForm] = useState(false);
  const createTeam = () => {
    setShowForm(true);
  };
  // 팀 이름
  const [teamName, setTeamName] = useState("");
  const changeTeamName = (e: any) => {
    setTeamName(e.target.value);
    console.log(teamName);
  };
  // 팀 이름 확인
  const [validName, setValidName] = useState(false);
  // 팀 종목
  const [sports, setSports] = useState("");
  // 팀 종목 확인
  const [validSports, setValidSports] = useState(false);
  // 팀 지역
  const [area, setArea] = useState("");
  // 팀 소개
  const [teamIntro, setTeamIntro] = useState("");
  const changeTeamIntro = (e: any) => {
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
    // 제출할 팀 이미지
    // TODO: 그림 형식 인식해서 각각 할당하기
    // TODO: 팀 이미지 용량이 크면 다운스케일링 하기
    // let teamImageFile: File = new File([teamImage], "teamImage.jpg");
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
        Credentials: "include",
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: TeamInfoFormData,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("팀 생성에 성공했습니다.");
          console.log(res);
          setShowForm(false);
          window.location.reload();
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
    <div className="teamMain">
      <div style={teamMainStyle}>
        <Image src="/team-main.png" alt="team" width={180} height={180} />

        {/* 팀 검색 */}
        <Link href="/team/search">
          <Button
            className="teamMemberSearch"
            variant="outlined"
            startIcon={<SearchIcon />}
          >
            팀 검색
          </Button>
        </Link>
      </div>

      {/* 팀 생성 */}
      <Button
        variant="outlined"
        onClick={createTeam}
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
          onChange={changeTeamName}
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
        onChange={changeTeamIntro}
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


      {/* 소속 팀 */}
      <GetBelongTeam/>  
    </div>
  );
}
