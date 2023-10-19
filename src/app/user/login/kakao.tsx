// TODO: 카카오 로그인 구현
// 1. 카카오 로그인 요청
// 2. 인가 코드 
// 2-1. 카카오계정 로그인 
// 2-2. 동의 화면
// 2-3. 인가 코드 발급
// 3. 토큰 발급
// 4. 토큰으로 사용자 정보 가져오기
`client`
import { useEffect, useState } from 'react';

export default function KakaoLogin() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://kauth.kakao.com/oauth/authorize');
        if (!response.ok) { // 응답이 정상적으로 오지 않았다면 에러를 던집니다.
          throw new Error(`통신 오류가 발생했습니다.: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 의존성으로 전달하면 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  );
}