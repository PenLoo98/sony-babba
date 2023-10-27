import MainMenuLogin from "./MainMenuLogin";
import MainMenuLogout from "./MainMenuLogout";

export default function MainMenu() {
    const isLogin = false;
    if (isLogin) {
        return (
            <MainMenuLogin />
        )
    }
    return (
        <MainMenuLogout />
    )
}