import Link from "next/link";
import Image from "next/image";

export default function MenuBar() {
  return (
    <div className="menuBar" style={{ display: "flex" }}>
      <Link href="http://3.39.154.148:3000/" style={{ textDecoration: "none" }}>
        <Image
          src="/vote.png"
          width={70}
          height={70}
          alt="vote-image"
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
      {/* 알람이 있을 경우, /alarmBell.png 로 변경해야함 */}
        {/* <Image 
          src="/alarmBell.png"
          width={70}
          height={70}
          alt="bell-image"
          style={{ margin: "0 20px" }}> */}

      <Link href="/alarm/main" style={{ textDecoration: "none" }}>
        <Image
          src="/bell.png"
          width={70}
          height={70}
          alt="bell-image"
          style={{ margin: "0 20px" }}
        />
      </Link>
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
