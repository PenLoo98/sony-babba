import { Button } from "@mui/material";

type ValidSportsProps = {
    sports: string;
    setValidSports: (event: boolean) => void;
};

export default function ValidSports({sports, setValidSports}: ValidSportsProps){
    async function checkSports(){
        // 액세스 토큰 가져오기
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");
        // 매칭방 종목 중복 확인 API
        const sportsCheckAPI = `https://withsports.shop:8000/team-service/matching/teamuser/${sports.replace(/"/g, "")}`;
        // fetch
        fetch(sportsCheckAPI, {
            method: "GET",
            headers: {
                Credentials: "include",
                ContentType: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.status === 200) {
                alert("생성가능한 종목입니다.");
                setValidSports(true);
            } 
            else if (res.status === 404) {
                alert("해당 종목에 소속된 팀이 없습니다.");
            }
            else if (res.status === 401) {
                alert("다시 로그인해주세요.");
            } 
        }).catch((error) => {
            console.log(error);
            throw new Error("서버 요청 실패!");
        })

    }
    return(
        <Button variant="outlined" onClick={checkSports}>중복 확인</Button> 
    )
}