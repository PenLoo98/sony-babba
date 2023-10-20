import Image from "next/image";
export default function MainMenu() {
  return (
    <div className="main-menu">
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
        <Image src="/forum.png" width={120} height={120} alt="workout-image" />
        <h1 style={{ marginLeft: "50px" }}>게시판</h1>
      </div>
    </div>
  );
}
