import HomeButton from "./HomeButton";
import LoginButton from "./LoginButton";
export default function Header() {
  const homeButtonStyle = {
    display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#85f3ef"
  };
  // 로그인 상태일 때 로그아웃 버튼 + 메뉴바
  // if (status === "authenticated") {
  //   return (
  //     // 로그아웃 버튼
  //     <div
  //       className="header"
  //       style={homeButtonStyle}
  //     >
  //       <HomeButton />
  //       <div style={{ display: "flex" }}>
  //         <MenuBar />
  //         <LogInOutNaver />
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div
      className="header"
      style={homeButtonStyle}
    >
      <HomeButton />
      <LoginButton />
      {/* <LogInOutNaver /> */}
      {/* <LogoutBtn /> */}
    </div>
  );
}
