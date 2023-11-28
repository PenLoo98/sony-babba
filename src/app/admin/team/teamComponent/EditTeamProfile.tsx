import { useState } from "react";
import { Button, TextField } from "@mui/material";
import ModalCustom from "@/components/ModalCustom";
import InsertTeamImage from "./InsertTeamImage";
import SelectArea from "./SelectArea";
import EditIcon from "@mui/icons-material/Edit";
import CheckTeamName from "./CheckTeamName";

type EditTeamProfileProps = {
    teamId: number;
    sports: string;
};

export default function EditTeamProfile({teamId, sports}: EditTeamProfileProps) {
  // 3. 팀 프로필 수정
  // 3-1. 팀 프로필 수정 Modal
  const [showEditModal, setShowEditModal] = useState(false);
  // 3-2. 팀 프로필 수정 값 저장
  type EditTeamInfo = {
    teamImage: string;
    teamName: string;
    introduction: string;
    area: string;
    sports: string;
  };

  const [editTeamImage, setEditTeamImage] = useState<string>(
    "/team-default-image.png"
  );
  const [editTeamImageFile, setEditTeamImageFile] = useState<File>();
  const [validName, setValidName] = useState<boolean>(false);
  const [editTeamName, setEditTeamName] = useState<string>("");
  const [editIntroduction, setEditIntroduction] = useState<string>("");
  const [editArea, setEditArea] = useState<string>("");

  function handleEditTeamNameChange(e: any) {
    setEditTeamName(e.target.value);
  }
  function handleEditIntroductionChange(e: any) {
    setEditIntroduction(e.target.value);
  }
  // 3-3. 팀 프로필 수정 Fetch 함수
  async function fetchEditTeam() {

    console.log("editTeamImage: " + editTeamImage);
    console.log("editTeamName: " + editTeamName);
    console.log("editIntroduction: " + editIntroduction);
    console.log("editArea: " + editArea);
    console.log("Sports: " + sports);

    const editTeamURL = `https://withsports.shop:8000/team-service/team/${teamId}`;
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // FormTeamData 생성
    const EditTeamFormData = new FormData();
    let UpdateTeamProfileRequest = {
      teamName: editTeamName,
      sports: sports,
      area: editArea,
      introduction: editIntroduction,
    };
    // 제출할 팀 이미지
    EditTeamFormData.append(
      "UpdateTeamProfileRequest",
      new Blob([JSON.stringify(UpdateTeamProfileRequest)], {
        type: "application/json",
      })
    );
    if (editTeamImageFile) {
      EditTeamFormData.append("image", editTeamImageFile);
    }
    fetch(editTeamURL, {
      method: "PUT",
      headers: {
        Credentials: "include",
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: EditTeamFormData,
    })
      .then((res) => {
        if (res.ok) {
          alert("팀 프로필 수정에 성공했습니다.");
          console.log(res);
          setShowEditModal(false);
          window.location.reload();
        } else {
          alert("팀 프로필 수정에 실패했습니다.");
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  return (
    <div className="EditTeamProfile">
      <Button
        variant="contained"
        onClick={() => {
          setShowEditModal(!showEditModal);
        }}
        startIcon={<EditIcon />}
      >
        팀 프로필 수정
      </Button>
      <ModalCustom show={showEditModal} setShow={setShowEditModal}>
        <div>
          <h1>팀 프로필 수정</h1>
          <InsertTeamImage
            teamImage={editTeamImage}
            setTeamImage={setEditTeamImage}
            teamImageFile={editTeamImageFile}
            setTeamImageFile={setEditTeamImageFile}
          />
          {/* <TextField
            id="outlined-basic"
            label="팀 이름"
            variant="outlined"
            value={editTeamName}
            onChange={handleEditTeamNameChange}
          /> */}
           <div className="teamNameVaild" style={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="팀 이름"
              variant="outlined"
              value={editTeamName}
              onChange={handleEditTeamNameChange}
            />
            <CheckTeamName
              teamname={editTeamName}
              setValidName={setValidName}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="팀 소개"
            variant="outlined"
            multiline
            rows={3}
            value={editIntroduction}
            onChange={handleEditIntroductionChange}
          />
          <SelectArea area={editArea} setArea={setEditArea} />
          <p>종목: {sports} </p>
          {validName ? (
            <Button variant="contained" onClick={fetchEditTeam}>
              수정 제출
            </Button>
          ) : (
            <Button variant="contained" onClick={fetchEditTeam} disabled>
              수정 제출
            </Button>
          )}
        </div>
      </ModalCustom>
    </div>
  );
}
