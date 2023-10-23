// 부모 컴포넌트에서 useState에 setToken으로 토큰값을 전달한다.
// 근데 이렇게하면 모든 HTTP요청을 하는 페이지들이 이 컴포넌트를 import해야한다.
// 그냥 액세스 토큰도 쿠키에 저장하는게 마음이 편할듯
export default function GetAccessToken(setToken: any) {
  // 로컬스토리지에서 액세스 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const tokenInfo: string | null = localStorage.getItem("accessToken");

  if (tokenInfo === null) {
    alert("저장된 토큰이 없습니다.");
    return;
  }

  if (tokenInfo !== null) {
    const tokenInfoJson: String = JSON.parse(tokenInfo);
    console.log(tokenInfoJson);
    setToken({tokenInfoJson});
  }
  return null;
}
