import Image from "next/image";
import Link from "next/link";

type ProfileProps = {
  id: number;
};

export default function Profile({ params }: { params: ProfileProps }) {
  // 넘긴 params 확인
  // console.log(params);
  // console.log(params.id);

  // TODO: GET - id에 맞는 사용자 정보 가져오기
  const userId: number = params.id;
  const userImage = "/default-profile.png";
  const userNickname = "위스";
  const userConnect: boolean = true; // true면 접속 중, false면 미접속
  const userArea = "서울";
  const userTeam = "손이바빠";
  const userTeamId: number = 7; // 숫자로 넘겨야 함
  const userActivity = "축구";

  return (
    <div
      className="profile"
      style={{ justifyContent: "center", placeItems: "center" }}
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
