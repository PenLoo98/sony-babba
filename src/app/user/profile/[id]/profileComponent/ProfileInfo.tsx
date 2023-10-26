import Image from "next/image";
import Link from "next/link";

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

export default function Profile(userJSON: {userJSON: UserJSON}) {
  // console.log(userJSON);
  const userId = userJSON.userJSON.userId;
  const userImage = userJSON.userJSON.userImage;
  const userNickname = userJSON.userJSON.userNickname;
  const userConnect = userJSON.userJSON.userConnect;
  const userArea = userJSON.userJSON.userArea;
  const userTeam = userJSON.userJSON.userTeam;
  const userTeamId = userJSON.userJSON.userTeamId;
  const userActivity = userJSON.userJSON.userActivity;
  // const userRating = userJSON.userJSON.userRating;
  // const userRanking = userJSON.userJSON.userRanking;
  // const userMvp = userJSON.userJSON.userMvp;
  // const userPoint = userJSON.userJSON.userPoint;


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
          src={userImage}
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
          <h1>{userNickname}</h1>
          {/* userConnect 값에 따라 다르게 표시 */}
          {userConnect ? (
            <h2 style={{ color: "green" }}>접속 중</h2>
          ) : (
            <h2 style={{ color: "red" }}>미접속</h2>
          )}
        </div>
        <div
          className="teamInfo"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3>{userArea}</h3>
          <Link
            href={`/team/${userTeamId}`}
            style={{ textDecoration: "none" }}
            target={`/team/${userTeamId}`}
          >
            <h3>{userTeam}</h3>
          </Link>
          <h3>{userActivity}</h3>
        </div>
      </div>
    </div>
  );
}
