import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import LogInOutNaver from "@/components/Headers/LogInOutNaver";
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
          <br />
        <LogInOutNaver />
        </div>
        <Image src="/login.jpeg" alt="login" width={880} height={650}></Image>
      </div>
    </>
  );
}
