import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
// TODO: 로그인, 로그아웃 상태에 따라서 버튼이 바뀌도록 구현
// TODO: 로그인 href를 /user/login이 아닌 /user/login?redirect=... 로 바꾸기
export default function HeaderOnSign() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "#66EBEB", padding: "10px" }}>With Sports</h2>
      </Link>

      <div style={{ display: "flex" }}>
        <Link href="/forum" style={{ textDecoration: "none" }}>
        <Image
            src="/forum.png"
            width={70}
            height={70}
            alt="forum-image"
            style={{margin: "0 20px"}}
          />
        </Link>
        <Link href="/team" style={{ textDecoration: "none" }}>
        <Image
            src="/team.png"
            width={70}
            height={70}
            alt="team-image"
            style={{margin: "0 20px"}}
          />
        </Link>
        <Link href="/chatteam" style={{ textDecoration: "none" }}>
        <Image
            src="/chat.png"
            width={70}
            height={70}
            alt="chat-image"
            style={{margin: "0 20px"}}
          />
        </Link>
        <Link href="/profile" style={{ textDecoration: "none" }}>
        <Image
            src="/profile.png"
            width={70}
            height={70}
            alt="profile-image"
            style={{margin: "0 20px"}}
          />
        </Link>

        <Link href="/user/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "25px" }}
          >
            로그인
          </Button>
        </Link>
      </div>
    </div>
  );
}
