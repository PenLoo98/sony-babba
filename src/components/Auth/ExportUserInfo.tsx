"use client";
import { Button } from "@mui/material";
export default function ExportUserInfo() {
    function signUp(){
        console.log("회원가입");
    }
    return (
        <Button onClick={signUp} >회원가입</Button>
    );
}