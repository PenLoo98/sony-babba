import Link from "next/link";

export default function HomeButton() {
  return (
    <div className="homeButton">
      <Link href="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "white",textShadow: "-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000", padding: "10px" }}>With Sports</h2>
      </Link>
    </div>
  );
}
