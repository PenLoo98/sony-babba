import Link from "next/link";
import Image from "next/image";

export default function MenuBar() {
    return(
        <div className="menuBar"
        style={{display: "flex"}}>
            <Link href="/forum/main" style={{ textDecoration: "none" }}>
              <Image
                src="/forumBtn.png"
                width={70}
                height={70}
                alt="forum-image"
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
            <Link href="/profile/main" style={{ textDecoration: "none" }}>
              <Image
                src="/profileBtn.png"
                width={70}
                height={70}
                alt="profile-image"
                style={{ margin: "0 20px" }}
              />
            </Link>
        </div>
    );
}