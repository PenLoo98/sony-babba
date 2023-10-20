import { Button } from "@mui/material";
import Link from "next/link";

export default function Start(){
    return (
        <Link href="/user/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="success">
                지금 시작하기
              </Button>
            </Link>
    );
}