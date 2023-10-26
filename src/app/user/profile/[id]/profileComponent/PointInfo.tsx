import Image from "next/image";

type UserJSON = {
  userId: number;
  userImage: string;
  userNickname: string;
  userConnect: boolean;// true면 접속 중, false면 미접속
  userArea: string;
  userTeam: string;
  userTeamId: number;
  userActivity: string;
  userRating: number;
  userRanking: number;
  userMvp: number;
  userPoint: number;
};

export default function PointInfo(userJSON: {userJSON: UserJSON}) {
    const userPoint = userJSON.userJSON.userPoint;
  return (
    <div
      className="pointInfo"
      style={{ display: "flex", margin: "20px 0 20px 0" }}
    >
      <Image src="/profile-point.png" alt="rank" width={190} height={190} />
      <div
        className="pointInfoText"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px 0 0 20px",
          justifyContent: "center",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>보유 포인트:</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>{userPoint}P</h2>
      </div>
    </div>
  );
}
