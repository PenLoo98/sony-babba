// export default function setToken(){
//     // 로컬스토리지 토큰 가져오기
//     const localStorage: Storage = window.localStorage;
//     const accessTokentoken = localStorage.getItem("accessToken");
//     const expiredTime = localStorage.getItem("expiredTime");

//     // 토큰 유효성 검사
//     if (accessTokentoken === null || expiredTime === null) {
//         alert("저장된 토큰이 없습니다.");
//     }
//     // 토큰 만료시 재발급
//     // 요청 팝업창을 띄웁니다.
//     window.open(
//         "/user-service/auth/reissue",
//         "토큰 재발급",
//         "width=500, height=500"
//     )?.ontouchend();


//     return token;
// }