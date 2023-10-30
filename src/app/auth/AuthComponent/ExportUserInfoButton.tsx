import { Button } from "@mui/material";

type ExportUserInfoProps = {
  nickname: string;
  validName: boolean;
  area: string;
};
export default function ExportUserInfoButton(props: ExportUserInfoProps) {
  const { nickname, validName, area } = props;

  // 회원정보 제출
  async function sendForm() {
    // TODO: 회원정보 제출 fetch 구현하기

    // 회원정보 제출 API
    const url = "https://withsports.shop:8000/user-service/signup/profile";

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    console.log(JSON.stringify(`Bearer ${token}`));
    console.log(JSON.stringify({ nickname, area }));
    console.log(JSON.stringify({ nickname: nickname, area: area }));
    const userId = localStorage.getItem("userId");

    let res = await fetch(url, {
      method: "PUT",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
        'user-id': userId || "",
      },
      body: JSON.stringify({ nickname: nickname, area: area }),
    }).then((res) => {
      if (res.status === 200) {
        alert("회원가입에 성공했습니다.");
        location.href = "/";
        console.log(res);
      } else {
        alert("회원가입에 실패했습니다.");
        console.log(res);
      }
    });
  }
  return (
    <div>
      {validName ? (
        <Button onClick={sendForm} variant="contained">
          회원 정보 제출
        </Button>
      ) : (
        <Button variant="contained" disabled>
          회원 정보 제출
        </Button>
      )}
    </div>
  );
}
