import Button from "@mui/material/Button";
// TODO: 로그인, 로그아웃 상태에 따라서 버튼이 바뀌도록 구현
export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
      }}
    >
      <h2 style={{ color: "#66EBEB", padding: "10px" }}>With Sports</h2>
      <Button
        variant="contained"
        href="#contained-buttons"
        style={{marginTop: "20px", marginBottom: "25px" }}
      >
        로그인
      </Button>
    </div>
  );
}
