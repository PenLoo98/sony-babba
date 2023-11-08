import Image from "next/image";
import Link from "next/link";

type UserJSON = {
  area: string;
  draw: number;
  imageUrl: string | null;
  introduction: string | null;
  lose: number;
  mvpCount: number;
  nickname: string;
  tier: string;
  userId: number;
  win: number;
  winRate: number| undefined | null;
  teamName?: string;
};

export default function RankingInfo(userJSON: { userJSON: UserJSON }) {
  const userData = userJSON.userJSON;

  return (
    <div
      className="rankingInfo"
      style={{ display: "flex", margin: "20px 0 0 0" }}
    >
      <Link href={`/user/profile/${userData.userId}/rank`} target="_blank">
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
        <h2 style={{ margin: "0 0 10px 0" }}>티어: {userData.tier}</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>승무패: {userData.win}/{userData.draw}/{userData.lose}</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>승률: {userData.winRate}%</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>MVP: {userData.mvpCount}회</h2>
      </div>
    </div>
  );
}
