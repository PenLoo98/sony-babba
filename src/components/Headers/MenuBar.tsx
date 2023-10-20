import Link from "next/link";
import Image from "next/image";

export default function MenuBar() {
    return(
        <div className="menuBar"
        style={{display: "flex"}}>
            <Link href="/forum" style={{ textDecoration: "none" }}>
              <Image
                src="/forum.png"
                width={70}
                height={70}
                alt="forum-image"
                style={{ margin: "0 20px" }}
              />
            </Link>
            <Link href="/team" style={{ textDecoration: "none" }}>
              <Image
                src="/team.png"
                width={70}
                height={70}
                alt="team-image"
                style={{ margin: "0 20px" }}
              />
            </Link>
            <Link href="/chat" style={{ textDecoration: "none" }}>
              <Image
                src="/chat.png"
                width={70}
                height={70}
                alt="chat-image"
                style={{ margin: "0 20px" }}
              />
            </Link>
            <Link href="/profile" style={{ textDecoration: "none" }}>
              <Image
                src="/profile.png"
                width={70}
                height={70}
                alt="profile-image"
                style={{ margin: "0 20px" }}
              />
            </Link>
        </div>
    );
}