import Link from "next/link";

export default function HomeButton() {
  return (
    <div className="homeButton">
      <Link href="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "white", padding: "10px" }}>With Sports</h2>
      </Link>
    </div>
  );
}
