import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div className="left-container" style={{ padding: "20px" }}>
        <h1>
          운동은 <br />
          함께할 때 <br />더 즐거우니까
        </h1>
        <Link href="/user/login" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="success">
            지금 시작하기
          </Button>
        </Link>
      </div>
      <div className="right-container" style={{ padding: "20px" }}>
        <Image
          src="/main-page.png"
          width={914}
          height={677}
          alt="main-page-image"
        />
      </div>
    </div>
  );
}
