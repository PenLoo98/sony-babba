export default function Footer() {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     borderTop: "1px solid black",
    //   }}
    // >
    <div className="footer" style={{ display: "flex", backgroundColor: "#F5F5F5",  justifyContent: "space-between"}}>

      <div className="logo" style={{marginRight: "70px"}}>
      <h2 style={{ padding: "10px" }}>
        같이 운동하고 싶을 때 <br />
        <br />
        With Sports
      </h2>
      </div>
      <div className="info" style={{ textAlign : "right" }}>
      <h5>
        <br />
        WithSports | 경기도 성남시 수정구 성남대로 1342
        <br />
        <br />
        Copyright 2023. 손이바빠 All Rights Reserved.
      </h5>
      </div>
    </div>
  );
}
