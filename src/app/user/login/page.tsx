import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function login() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div style={{ justifyContent: "center", padding: "30px" }}>
          <h1>같이 운동하고 싶을 때</h1>
          <h1 style={{ color: "#248CC7" }}>With Sports</h1>

          <Link href="/user/login/naver" style={{ textDecoration: "none" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={
                <Image src="/naver.png" alt="naver" width={50} height={50} />
              }
              style={{
                background: "#27D34A",
                color: "black",
                marginBottom: "10px",
              }}
            >
              네이버로 로그인
            </Button>
          </Link>
          <br />
          <Link href="/user/login/kakao" style={{ textDecoration: "none" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={
                <Image src="/kakao.png" alt="naver" width={50} height={50} />
              }
              style={{ background: "#FFEB00", color: "black" }}
            >
              카카오로 로그인
            </Button>
          </Link>
        </div>
        <Image src="/login.jpeg" alt="login" width={880} height={650}></Image>
      </div>
    </>
  );
}
