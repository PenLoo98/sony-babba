import Link from "next/link";
import Image from "next/image";
import Notification from "./Notification";

export default function MenuBar() {
  return (
    <div className="menuBar" style={{ display: "flex", alignItems: "center" }}>
      <Link href="/admin" style={{ textDecoration: "none" }}>
        <Image
          src="/admin.png"
          width={70}
          height={70}
          alt="admin-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
      {/* 변경 필요함 */}
      <Link href="http://3.37.181.58:3000/" style={{ textDecoration: "none" }}>
        <Image
          src="/vote.png"
          width={70}
          height={70}
          alt="vote-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
      <Link href="/gift" style={{ textDecoration: "none" }}>
        <Image
          src="/gift.png"
          width={70}
          height={70}
          alt="gift-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
      <Link href="/stadium" style={{ textDecoration: "none" }}>
        <Image
          src="/stadium.png"
          width={70}
          height={70}
          alt="stadium-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
      <Link href="/post" style={{ textDecoration: "none" }}>
        <Image
          src="/forumBtn.png"
          width={70}
          height={70}
          alt="forum-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
      <Link href="/matching/main" style={{ textDecoration: "none" }}>
        <Image
          src="/versus.png"
          width={70}
          height={70}
          alt="team-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
      <Link href="/team/main" style={{ textDecoration: "none" }}>
        <Image
          src="/teamBtn.png"
          width={70}
          height={70}
          alt="team-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
      <Link href="/chat/main" style={{ textDecoration: "none" }}>
        <Image
          src="/chatBtn.png"
          width={70}
          height={70}
          alt="chat-image"
          style={{ margin: "0 20px" }}
        />
      </Link>

      {/* 알람 */}
      <Notification />

      <Link href="/user/profile/main" style={{ textDecoration: "none" }}>
        <Image
          src="/profileBtn.png"
          width={70}
          height={70}
          alt="profile-image"
          style={{ margin: "0 20px" }}
        />
      </Link>

      <hr />
    </div>
  );
}
