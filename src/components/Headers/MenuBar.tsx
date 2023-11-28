import Link from "next/link";
import Image from "next/image";
import Notification from "./Notification";

export default function MenuBar() {
  return (
    <div
      className="menuBar"
      style={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        marginTop: "15px",
      }}
    >
      <Link href="/admin" style={{ textDecoration: "none" }}>
        <Image
          src="/admin.png"
          width={50}
          height={50}
          alt="admin-image"
          style={{ margin: "0 10px" }}
        />
        <p>관리자</p>
      </Link>
      {/* 변경 필요함 */}
      <Link href="http://3.37.181.58:3000/" style={{ textDecoration: "none" }}>
        <Image
          src="/vote.png"
          width={50}
          height={50}
          alt="vote-image"
          style={{ margin: "0 10px" }}
        />
        <p>투표</p>
      </Link>
      <Link href="/gift" style={{ textDecoration: "none" }}>
        <Image
          src="/gift.png"
          width={50}
          height={50}
          alt="gift-image"
          style={{ margin: "0 10px" }}
        />
        <p>기프티콘</p>
      </Link>
      <Link href="/stadium" style={{ textDecoration: "none" }}>
        <Image
          src="/stadium.png"
          width={50}
          height={50}
          alt="stadium-image"
          style={{ margin: "0 10px" }}
        />
        <p>경기장</p>
      </Link>
      <Link href="/post" style={{ textDecoration: "none" }}>
        <Image
          src="/forumBtn.png"
          width={50}
          height={50}
          alt="forum-image"
          style={{ margin: "0 10px" }}
        />
        <p>게시판</p>
      </Link>
      <Link href="/matching/main" style={{ textDecoration: "none" }}>
        <Image
          src="/versus.png"
          width={50}
          height={50}
          alt="team-image"
          style={{ margin: "0 10px" }}
        />
        <p>매칭</p>
      </Link>
      <Link href="/team/main" style={{ textDecoration: "none" }}>
        <Image
          src="/teamBtn.png"
          width={50}
          height={50}
          alt="team-image"
          style={{ margin: "0 10px" }}
        />
        <p>팀</p>
      </Link>
      {/* 알람 */}
      <Notification />

      <Link href="/user/profile/main" style={{ textDecoration: "none" }}>
        <Image
          src="/profileBtn.png"
          width={50}
          height={50}
          alt="profile-image"
          style={{ margin: "0 10px" }}
        />
        <p>프로필</p>
      </Link>

      <hr />
    </div>
  );
}
