"use client";
import { useSession } from "next-auth/react";
import MainMenuLogin from "./MainMenuLogin";
import MainMenuLogout from "./MainMenuLogout";

export default function MainMenu() {
    const { data: session, status } = useSession();
    if (status === "authenticated"){
        return (
            <MainMenuLogin />
        )
    }
    return (
        <MainMenuLogout />
    )
}