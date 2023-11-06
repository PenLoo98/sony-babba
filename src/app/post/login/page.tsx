"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../../Home.module.css";

type User = {
  username: string;
  password: string;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://withsports.site/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login request failed");
      }

      // 서버에서 보내는 응답을 텍스트 형태로 출력
      const responseText = await response.text();
      console.log(responseText);

      // 로그인 성공 시, 게시글 목록 페이지로 이동
      if (responseText.includes("successfully")) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        alert("로그인이 완료되었습니다.");
        router.push("/post/list");
      } else {
        throw new Error("Login request failed");
      }
    } catch (error) {
      alert("존재하지 않는 회원정보입니다.");
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <br />
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
