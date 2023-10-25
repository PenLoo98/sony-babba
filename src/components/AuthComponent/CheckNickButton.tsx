import { Button } from "@mui/material";

type CheckNickButtonProps = {
  nickname: string;
  setValidName: (event: boolean) => void;
};

export default function CheckNickButton({
  nickname,
  setValidName,
}: CheckNickButtonProps) {
  console.log("nickname: " + nickname);
  // 닉네임 중복 확인 API
  const nameCheckAPI = `http://3.37.203.5:8000/user-service/signup/check/nickname?nickname="${nickname}"`;

  // 액세스 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");
  const tokenJSON = { accessToken: token };
  // console.log(token);
  // console.log(tokenJSON);

  // 토큰 유효성 검사
  // if (token === null) {
  //   alert("저장된 토큰이 없습니다.");
  //   // 토큰 만료시 재발급
  //   // 요청 팝업창을 띄웁니다.
  //   window.open(
  //     "http://3.37.203.5:8000/user-service/auth/reissue",
  //     "토큰 재발급",
  //     "width=500, height=500"
  //   );
  // }

  // 닉네임 중복 확인
  async function checkName() {
    const res = await fetch(nameCheckAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenJSON}`,
      },
    });
    if (!res.ok) {
      alert("이미 사용중인 닉네임입니다.");
      setValidName(false);
      // This will activate the closest `error.js` Error Boundary
      throw new Error("서버 요청 실패!");
    }
    setValidName(true);
    alert("사용 가능한 닉네임입니다.");
    return res.json();
  }

  return (
    <Button onClick={checkName} variant="contained" style={{ margin: "10px" }}>
      중복 확인
    </Button>
  );
}
