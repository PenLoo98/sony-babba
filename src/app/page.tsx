import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// TODO: 로그인시 비로그인시 헤더 컴포넌트 다르게 보여주기
export default function Home() {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
}
