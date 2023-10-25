import Image from "next/image";
import Link from "next/link";

type ProfileProps = {
  id: number;
};

export default function RankingInfo(params: { params: ProfileProps }) {
  return (
    <div
      className="rankingInfo"
      style={{ display: "flex", margin: "20px 0 0 0" }}
    >
      <Link href={`/user/profile/${params.params.id}/rank`} target="_blank">
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
        <h2 style={{ margin: "0 0 10px 0" }}>개인 랭킹</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>레이팅</h2>
        <h2 style={{ margin: "0 0 10px 0" }}>MVP</h2>
      </div>
    </div>
  );
}
