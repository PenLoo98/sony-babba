import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="left-container" style={{ padding: "20px" }}>
        <h1>같이 즐겨요</h1>
        <h1 style={{ color: "#25ABAB", marginBottom: "50px" }}>With Sports!</h1>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <Image
            src="/workout.png"
            width={120}
            height={120}
            alt="workout-image"
          />

          <h1 style={{ marginLeft: "50px" }}>운동</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px",
          }}
        >
          <Image
            src="/ranking.png"
            width={120}
            height={120}
            alt="workout-image"
          />
          <h1 style={{ marginLeft: "50px" }}>랭킹</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Image
            src="/forum.png"
            width={120}
            height={120}
            alt="workout-image"
          />
          <h1 style={{ marginLeft: "50px" }}>게시판</h1>
        </div>
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
