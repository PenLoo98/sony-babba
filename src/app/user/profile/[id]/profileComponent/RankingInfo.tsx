import Image from "next/image";
import Link from "next/link";

type UserJSON = {
  userId: number;
  userImage: string;
  userNickname: string;
  userConnect: boolean; // true면 접속 중, false면 미접속
  userArea: string;
  userTeam: string;
  userTeamId: number;
  userActivity: string;
  userRating: number;
  userRanking: number;
  userMvp: number;
  userPoint: number;
};

export default function RankingInfo(userJSON: { userJSON: UserJSON }) {
  const userId = userJSON.userJSON.userId;
  const userRating = userJSON.userJSON.userRating;
  const userRanking = userJSON.userJSON.userRanking;
  const userMvp = userJSON.userJSON.userMvp;

  return (
    <div
      className="rankingInfo"
      style={{ display: "flex", margin: "20px 0 0 0" }}
    >
      <Link href={`/user/profile/${userId}/rank`} target="_blank">
        <Image src="/profile-rank.png" alt="rank" width={190} height={190} />
      </Link>
      <div
        className="rankingInfoText"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 0 0 20px",
          justifyContent: "center",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>레이팅: {userRating}</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>개인 랭킹: {userRanking}위</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>MVP: {userMvp}회</h2>
      </div>
    </div>
  );
}
