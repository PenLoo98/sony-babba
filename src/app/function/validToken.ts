export default function validToken(): void {
//   const expiredTime = localStorage.getItem("expiredTime");
//   const now = new Date();
//   if (expiredTime !== null && now.getTime() > Number(expiredTime)) {
//     alert("토큰이 만료되었습니다. 재발급합니다.");
//     // 토큰 만료시 재발급
//     // 요청 팝업창을 띄웁니다.
//     let tokenReceive: Window | null = window.open(
//       "https://withsports.shop:8000/user-service/auth/reissue",
//       "토큰 재발급",
//       "width=500, height=500"
//     );

//     if (tokenReceive !== null) {
//       tokenReceive.onload = function () {
//         // 새 창에서 로드 이벤트가 발생하면 실행되는 함수를 정의합니다.
//         if (tokenReceive !== null) {
//           // TODO: 쿼리 파라미터 제대로 받는지 확인하기

//           // 쿼리 파라미터를 추출합니다.
//           let params = new URLSearchParams(tokenReceive.location.search);

//           // 이 부분에는 쿼리 파라미터를 사용하여 필요한 작업을 코딩하면 됩니다.
//           const accessToken: any | null = params.get("accessToken");
//           const expiredTime: any | null = params.get("expiredTime");
//           localStorage.setItem("accessToken", accessToken);
//           localStorage.setItem("expiredTime", expiredTime);

//           // 팝업 창을 닫습니다.
//           tokenReceive.close();
//         }
//       };
//     }
//     alert("토큰 재발급이 완료되었습니다.");
//   }
console.log("validToken");
}
