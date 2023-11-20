"use client";
import GetRoomList from "../matchingComponent/GetRoomList";
import CreateRoomButton from "../matchingComponent/CreateRoomButton";

type MatchingList = {
  matchingRoomId: number; // 매칭방 id
  teamId: number; // 팀 id
  teamName: string; // 팀 이름
  roomLeaderNickname: string; // 방장 닉네임
  sports: string; // 종목
  area: string; // 지역
  capacity: number; // 매칭방 총 인원 (가득 차면 옆에 정원 초과 표시)
  userCount: number; // 현재 참여중인 인원
  sumRating: number; // 방 레이팅 점수
  participateStatus: boolean; // 참석 상태 ( 참여하기 | 참여 중)
  status: string; // 매칭방 상태 ( 기본 | 탐색 중 )
};

export default function MatchingPage() {
  // 매칭방의 목록이 보여지며, 매칭방 생성 버튼이 목록의 상단에 위치함.
  // 매칭방 목록에서 매칭방을 선택하면 해당 매칭방으로 입장함.
  // 매칭방 생성자(방장)는 매칭방 삭제 버튼, 그 외 구성원은 나가기 버튼

  // 매칭방 목록 ... (GET) /matching-service/matchingrooms

  // 매칭방 생성 ... (POST) /matching-service/matching/room

  // 매칭방 입장 ... (POST) /matching-service/matchingroom

  // 매칭방 나가기 ... (DELETE) /matching-service/matchingroom/{matchingRoomId}

  // 매칭 탐색 ... (POST) /matching-service/matching/{mathcingRoomId}/start

  // 매칭 탐색 취소 ... (POST) /matching-service/matching/{matchingRoomId}/cancel

//   // 더미 데이터
//   const [matchingRooms, setMatchingRooms] = useState<MatchingList[]>([
//     {
//       matchingRoomId: 1,
//       teamId: 101,
//       teamName: "Team A",
//       roomLeaderNickname: "Leader A",
//       sports: "Football",
//       area: "Seoul",
//       capacity: 10,
//       userCount: 5,
//       sumRating: 4.5,
//       participateStatus: false,
//       status: "기본",
//     },
//   ]);

//   useEffect(() => {
//     getMatchingRooms();
//   }, []);

//   const getMatchingRooms = async () => {
//     const response = await fetch("/matching-service/matchingrooms");
//     const data = await response.json();
//     setMatchingRooms(data);
//   };

//   const createMatchingRoom = async () => {
//     const response = await fetch("/matching-service/matching/room", {
//       method: "POST",
//     });
//     if (response.status === 200) {
//       getMatchingRooms();
//     }
//   };

//   const enterMatchingRoom = async (roomId: number) => {
//     const response = await fetch(`/matching-service/matchingroom/${roomId}`, {
//       method: "POST",
//     });
//     if (response.status === 200) {
//       getMatchingRooms();
//     }
//   };

//   const leaveMatchingRoom = async (roomId: number) => {
//     const response = await fetch(`/matching-service/matchingroom/${roomId}`, {
//       method: "DELETE",
//     });
//     if (response.status === 200) {
//       getMatchingRooms();
//     }
//   };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}
      >
        <CreateRoomButton/>
      </div>
      <GetRoomList />
    </div>
  );
}
