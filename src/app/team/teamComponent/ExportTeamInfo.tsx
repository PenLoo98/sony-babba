import { Button } from "@mui/material";

type ExportTeamInfoProps = {
  teamName: string;
  validTeamName: boolean;
  sport: string;
  area: string;
  teamIntro: string;
};
export default function ExportTeamInfoButton(props: ExportTeamInfoProps) {
  const { teamName, validTeamName, sport, area, teamIntro } = props;

  // 팀 생성 제출
  function sendForm() {
    // TODO: 팀 생성 제출 fetch 구현하기
    console.log(JSON.stringify({ teamName, validTeamName, sport, area, teamIntro }));

    alert("회원가입에 성공했습니다.");
    location.href = "/team";

    // TODO: 팀 생성 API 정하기
    const url = "https://withsports.shop:8000/team-service/signup/profile";

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    fetch(url, {
      method: "PUT",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teamName, validTeamName, sport, area, teamIntro }),
    }).then((res) => {
      if (res.status === 200) {
        alert("팀 생성에 성공했습니다.");
        console.log(res);
      } else {
        alert("팀 생성에 실패했습니다.");
        console.log(res);
      }
    });
  }
  return (
    <div>
      {validTeamName ? (
        <Button onClick={sendForm} variant="contained">
          팀 정보 제출
        </Button>
      ) : (
        <Button variant="contained" disabled>
          팀 정보 제출
        </Button>
      )}
    </div>
  );
}
