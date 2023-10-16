import Image from "next/image";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <div >
      <h1>운동은 <br/>
        함께할 때 <br/>
        더 즐거우니까</h1>
      <>
        <Button variant="contained" color="success">
           지금 시작하기
        </Button>
      </>
    </div>
  );
}
