import Image from "next/image";
import Link from "next/link";

type UserJSON = {
  userId: number;
  nickname: string;
  introduction: string | null;
  area: string;
  imageUrl: string | null;
  tier?: string;
  rating?: number;
  win: number;
  lose: number;
  draw: number;
  winRate: number| undefined | null;
};

export default function Profile(userJSON: { userJSON: UserJSON }) {
  console.log(userJSON);
  const userData = userJSON.userJSON;

  return (
    <div
      className="profile"
      style={{ justifyContent: "center", placeItems: "center", marginTop: 20 }}
    >
      <div
        className="profileImage"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Image
          src={userData.imageUrl? userData.imageUrl : "/default-profile.png"}
          alt="profile"
          width={190}
          height={190}
          defaultValue={"/default-profile.png"}
        />
      </div>
      <div className="userInfo">
        <div
          className="userNickname"
          style={{
            display: "flex",
            placeItems: "center",
            justifyContent: "space-around",
          }}
        >
          <h1>{userData.nickname}</h1>
        </div>
        <div
          className="teamInfo"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3>{userData.area}</h3>
          {/* <Link
            href={`/team/${userData.teamName}`}
            style={{ textDecoration: "none" }}
            target={`/team/${userData.teamName}`}
          >
            <h3>{userData.teamName}</h3>
          </Link> */}
        </div>
        <div
          className="userIntro"
          style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
        >
          {userData.introduction}
        </div>
      </div>
    </div>
  );
}
