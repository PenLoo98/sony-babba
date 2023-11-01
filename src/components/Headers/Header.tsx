"use client";
import { useEffect, useState } from "react";
import HomeButton from "./HomeButton";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import MenuBar from "./MenuBar";
export default function Header() {
  const homeButtonStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#85f3ef",
  };
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    const expiredTime = localStorage.getItem("expiredTime");
    if (token && expiredTime) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className="header" style={homeButtonStyle}>
      <HomeButton />
      {isLogin ? (
        <div>
          <MenuBar />
          <LoginButton />
        </div>
      ) : (
        <LogoutButton />
      )}
    </div>
  );
}
