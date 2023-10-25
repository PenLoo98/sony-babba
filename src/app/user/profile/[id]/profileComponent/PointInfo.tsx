import Image from "next/image";

type PageParams = {
    id: number;
  };

export default function PointInfo({ params }: { params: PageParams}) {
    // console.log(params.id);
  return (
    <div
      className="pointInfo"
      style={{ display: "flex", margin: "20px 0 20px 0" }}
    >
      <Image src="/profile-point.png" alt="rank" width={190} height={190} />
      <div
        className="pointInfoText"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px 0 0 20px",
          justifyContent: "center",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>보유 포인트</h2>
      </div>
    </div>
  );
}
