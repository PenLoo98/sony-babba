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
import ModalCustom from "@/components/ModalCustom";
import CheckNickButton from "@/app/auth/AuthComponent/CheckNickButton";
import SelectArea from "@/app/auth/AuthComponent/SelectArea";
import InsertProfileImage from "./InsertProfileImage";
import ShowSearchList from "./ShowSearchList";

type UserJSON = {
  userId: number;
  nickname: string;
  introduction: string | null;
  area: string;
  imageUrl: string | null;
  tier?: string;
  rating?: number;
  win: number;
  lose: number;
  draw: number;
  winRate: number | undefined | null;
};

type ProfileProps = {
  userJSON: UserJSON;
};

export default function ProfileMenu({ userJSON }: ProfileProps) {
  let userData = userJSON;

  // 본인 프로필인지 확인
  const [isYourProfile, setIsYourProfile] = useState(false);
  const switchYours = () => {
    setIsYourProfile(!isYourProfile);
  };

  // 검색할 닉네임
  const [checkName, setCheckname] = useState("");
  const typeName = (e: any) => {
    setCheckname(e.target.value);
  };

  // 프로필 이미지 상태관리
  const [profileImage, setProfileImage] = useState(userData.imageUrl);

  // 닉네임 입력 상태관리
  const [typeNickname, setNickname] = useState("");
  const handleNameChange = (event: any) => {
    setNickname(event.target.value);
  };

  // 닉네임 중복 상태관리
  const [validName, setValidName] = useState(false);

  // 프로필 수정 모달
  const [show, setShow] = useState(false);
  const editProfile = () => {
    setShow(true);
  };

  // 지역 입력 상태관리
  const [area, setArea] = useState("");
  const handleAreaChange = (event: string) => {
    setArea(event);
  };

  // 프로필 수정 제출
  async function postEditProfile() {
    const editProfileURL = `https://withsports.shop:8000/user-service/user/profile`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // FormEditData 생성
    const UserEditFormData = new FormData();

    let EditProfileRequest = {
      nickname: typeNickname,
      introduction: userData.introduction,
      area: area,
    };

    // 프로필 이미지 파일 생성
    // let editImageFile: File = new File([profileImage], "profileImage.png");
    let editImageFile: File;
    if (profileImage !== null) {
      editImageFile = new File([profileImage as BlobPart], "profileImage.png");
    } else {
      editImageFile = new File([""], "profileImage.png");
    }

    // FormEditData에 데이터 추가
    UserEditFormData.append(
      "updateProfile",
      new Blob([JSON.stringify(EditProfileRequest)], {
        type: "application/json",
      })
    );
    UserEditFormData.append("image", editImageFile);

    // 프로필 수정 제출 fetch
    fetch(editProfileURL, {
      method: "PUT",
      headers: {
        Credentials: "include",
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: UserEditFormData,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("프로필 수정이 완료되었습니다.");
          setShow(false);
          setNickname("");
          setValidName(false);
          setArea("");
          location.reload();
        } else {
          alert("프로필 수정에 실패하였습니다.");
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("서버 요청 실패!");
      });
  }

  // 회원 탈퇴 모달
  const [showExit, setShowExit] = useState(false);
  const deleteProfile = () => {
    setShowExit(true);
  };
  // 회원 탈퇴 양식입력
  const [checkType, setCheckType] = useState("");
  const handleTypeChange = (event: any) => {
    setCheckType(event.target.value);
  };
  // 회원 탈퇴 서버요청
  const postDeleteProfile = () => {
    alert("회원 탈퇴 신청이 완료되었습니다.");
    setShowExit(false);
    setCheckType("");
  };

  // 회원 신고 모달
  const [showReport, setShowReport] = useState(false);
  const reportProfile = () => {
    setShowReport(true);
  };
  // 회원 신고 양식입력
  const [checkReport, setCheckReport] = useState("");
  const handleReportChange = (event: any) => {
    setCheckReport(event.target.value);
  };
  // 회원 신고 서버요청
  const postReportProfile = () => {
    alert("회원 신고가 완료되었습니다.");
    setShowReport(false);
    setCheckReport("");
  };

  // 사용자 닉네임 검색
  // 사용자 닉네임 검색결과 저장
  type SearchNameUser = {
    id: number;
    nickname: string;
    area: string;
    introduction: string | null;
    profileImage: string | null;
  };

  type SearchNameList = {
    data: SearchNameUser[];
  };

  const [searchNameResult, setSearchNameResult] = useState<SearchNameList>({
    data: [
      {
        id: 0,
        nickname: "",
        area: "",
        introduction: "",
        profileImage: "",
      },
    ],
  });
  // 사용자 닉네임 검색결과 모달
  const [showSearchNameModal, setShowSearchNameModal] = useState(false);

  // 사용자 닉네임 검색 fetch
  async function searchNameFetch() {
    const nickname = checkName;
    console.log("nickname: " + nickname);

    // 사용자 닉네임 검색 API
    const searchNameURL = `https://withsports.shop:8000/user-service/user/nickname/${nickname}`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    const response = await fetch(searchNameURL, {
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: SearchNameList) => {
        if (data.data !== null) {
          setSearchNameResult(data);
          console.log("search data: ");
          console.log(data);
          alert("검색에 성공하였습니다.");
          setShowSearchNameModal(true);
        } else if (data.data === null) {
          alert("없는 닉네임입니다.");
          setCheckname("");
        }
      });
  }

  return (
    <div className="profile-menu">
      <div className="profile-menu-search">
        <TextField
          id="outlined-basic"
          label="사용자 닉네임 검색"
          variant="outlined"
          value={checkName}
          onChange={typeName}
        />
        <Image
          onClick={searchNameFetch}
          src="/search.png"
          alt="search"
          width={40}
          height={40}
          style={{ margin: "10px 0 0 10px" }}
        />
        <ModalCustom
          show={showSearchNameModal}
          setShow={setShowSearchNameModal}
        >
          <div>
            <ShowSearchList searchNameResult={searchNameResult} />
          </div>
        </ModalCustom>
      </div>

      <div
        className="profile-3menu"
        style={{ flexDirection: "column", marginTop: "15px" }}
      >
        {/* 본인, 타인 프로필 테스트 버튼 */}
        <Button variant="outlined" onClick={switchYours}>
          {isYourProfile ? "내 프로필" : "다른 프로필"}
        </Button>
        {isYourProfile ? (
          <div className="your-profile">
            {/* 프로필 수정 버튼*/}
            <div className="profile-edit" style={{ marginTop: "5px" }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={editProfile}
              >
                프로필 수정
              </Button>
              {/* 프로필 수정 모달 */}
              <ModalCustom show={show} setShow={setShow}>
                <h2 style={{ marginBottom: "30px" }}>프로필 수정</h2>
                <InsertProfileImage
                  profileImage={profileImage}
                  setProfileImage={setProfileImage}
                />
                <TextField
                  label="닉네임"
                  variant="outlined"
                  value={typeNickname}
                  onChange={handleNameChange}
                />
                <CheckNickButton
                  nickname={typeNickname}
                  setValidName={setValidName}
                />
                <SelectArea area={area} onAreaChange={handleAreaChange} />
                {validName ? (
                  <Button
                    variant="outlined"
                    onClick={postEditProfile}
                    style={{ marginTop: 10 }}
                  >
                    프로필 수정 제출
                  </Button>
                ) : (
                  <Button variant="outlined" style={{ marginTop: 10 }} disabled>
                    프로필 수정 제출
                  </Button>
                )}
              </ModalCustom>
            </div>

            {/* 회원 탈퇴*/}

            <div className="delete-account" style={{ marginTop: "5px" }}>
              <Button
                variant="outlined"
                startIcon={<DeleteForeverIcon />}
                style={{ color: "red" }}
                onClick={deleteProfile}
              >
                회원 탈퇴
              </Button>
            </div>
            <ModalCustom show={showExit} setShow={setShowExit}>
              <Image
                src="/warning.png"
                alt="warning"
                width={79}
                height={79}
                style={{ alignItems: "center" }}
              />
              <h3>
                회원 탈퇴는 하는 경우
                <br />
                모든 회원 정보가 삭제되며
                <br />
                되돌릴 수 없습니다.
                <br />
                삭제하시겠습니까?
                <br />
                <br />
                {userData.nickname}
                {"/탈퇴한다"}를 입력해주세요
              </h3>
              <div className="delete-account">
                <TextField
                  label="닉네임/탈퇴한다"
                  variant="outlined"
                  value={checkType}
                  onChange={handleTypeChange}
                />
                {checkType === userData.nickname + "/탈퇴한다" ? (
                  <Button variant="outlined" onClick={postDeleteProfile}>
                    회원탈퇴
                  </Button>
                ) : (
                  <Button variant="outlined" disabled>
                    회원탈퇴
                  </Button>
                )}
              </div>
            </ModalCustom>
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
              <Button
                variant="outlined"
                startIcon={<ReportIcon />}
                style={{ color: "red" }}
                onClick={reportProfile}
              >
                사용자 신고
              </Button>
              <ModalCustom show={showReport} setShow={setShowReport}>
                <Image
                  src="/warning.png"
                  alt="warning"
                  width={79}
                  height={79}
                  style={{ alignItems: "center" }}
                />
                <h3>
                  신고 사용을 작성해주세요.
                  <br />
                  <br />
                </h3>
                <div className="delete-account">
                  <TextField
                    label="신고사유"
                    variant="outlined"
                    value={checkReport}
                    onChange={handleReportChange}
                  />
                </div>
                <Button variant="outlined" onClick={postReportProfile}>
                  사용자 신고
                </Button>
              </ModalCustom>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
