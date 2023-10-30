import Image from 'next/image';

type PageParams = {
  id: number;
};

export async function getServerSideProps({ params }: { params: PageParams }) {
  const getTeamInfoURL = `https://withsports.shop:8000/team-service/team/${params.id}`;

  // 로컬스토리지 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  fetch(getTeamInfoURL, {
    method: "GET",
    headers: {
      Credentials: "include",
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("팀 정보 조회에 성공했습니다.");
        console.log(res);
        return {
          props: { res }, // 데이터를 showTeam 컴포넌트에 props로 전달합니다.
        };
      } else {
        console.log("팀 정보 조회에 실패했습니다.");
        console.log(res);
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("서버 요청 실패!");
    });
}

export default function showTeam({ res }: { res: any }){
  const data = JSON.parse(res.data);
  return (
    <div>
      <Image src={data.image} alt="팀 이미지" width={200} height={200}/>
      <h1>팀 페이지</h1>
      <h2>팀 이름: {data.teamName}</h2>
      <h2>팀 소개: {data.introduction}</h2>
      <h2>팀 지역: {data.area}</h2>
      <h2>팀 스포츠: {data.sports}</h2>
      <h2>팀 이미지: {data.image}</h2>
      <h2>팀 인원 수: {data.teamMemberCount}</h2>
    </div>
  )
}