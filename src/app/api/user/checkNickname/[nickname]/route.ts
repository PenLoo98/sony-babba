// export async function GET(request: Request) {
//     // 액세스 토큰 가져오기
//   const localStorage: Storage = window.localStorage;
//   const token = localStorage.getItem("accessToken");

//   // URL에서 nickname 가져오기
//   const { searchParams } = new URL(request.url)
//   const nickname = searchParams.get('nickname')
//   console.log("nickname: " +nickname);

//   // TODO: JSON 형식확인하기 
//   const nameCheckAPI = `http://3.37.203.5:8000/sapi/user-service/signup/check/nickname/?nickname="${nickname}`;

//   let res = await fetch(nameCheckAPI, {
//     method: "GET",
//     headers: {
//       ContentType: "application/json",
//       Authorization: JSON.stringify(`Bearer ${token}`),
//     },
//   });
//   try {
//     res = await res.json();
//   }
//   catch (error) {
//     console.log(error);
//   }
//   if (!res.ok) {
//     alert("이미 사용중인 닉네임입니다.");
//     console.log(res.json());
//     throw new Error("서버 요청 실패!");
//   }
//   alert("사용 가능한 닉네임입니다.");
//   console.log(res.json());
   
//     return Response.json({ res });
//   }