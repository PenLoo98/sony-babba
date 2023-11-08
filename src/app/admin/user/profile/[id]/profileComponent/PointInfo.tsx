import Image from "next/image";

type UserJSON = {
  userId: number;
  nickname: string;
  introduction: string;
  area: string;
  imageUrl: string;
  tier: string;
  win: number;
  lose: number;
  draw: number;
  winRate: number;
  mvpCount: number;
  teamName?: string;
};

export default function PointInfo(userJSON: {userJSON: UserJSON}) {
    const userPoint = 100;
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
