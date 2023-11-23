import Link from "next/link";

export default function HomeButton() {
  return (
    <div className="homeButton" style={{display: "flex", alignItems: "center"}}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "#85f3ef",textShadow: "-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000",padding: "10px", }}>With Sports</h2>
      </Link>
    </div>
  );
}
