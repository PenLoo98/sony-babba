import { Button, TextField} from "@mui/material";
import Link from "next/link";

export default function signup() {
  return (
    <div>
      <h1>소셜 종류: 카카오</h1>
      <div style={{ display: "flex" }}>
        <TextField
          id="outlined-basic"
          label="닉네임"
          variant="outlined"
          style={{ margin: "10px" }}
        />
        <Button
          variant="contained"
          style={{ marginTop: "20px", marginBottom: "25px" }}
        >
          중복확인
        </Button>
      </div>
      <div >
        <TextField
          id="outlined-basic"
          label="지역"
          variant="outlined"
          style={{ margin: "10px" }}
        />
        <br />
        <Link href="/user/login/naver" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="success" style={{margin: "15px"}}>
          회원가입 완료
        </Button>
        </Link>
      </div>
    </div>
  );
}
