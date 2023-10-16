import Button from "@mui/material/Button";
import Link from "next/link";
// TODO: 로그인, 로그아웃 상태에 따라서 버튼이 바뀌도록 구현
// TODO: 로그인 href를 /user/login이 아닌 /user/login?redirect=... 로 바꾸기
export default function Header() {
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

      <Link href="/user/login" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          style={{ marginTop: "20px", marginBottom: "25px" }}
        >
          로그인
        </Button>
      </Link>
    </div>
  );
}
