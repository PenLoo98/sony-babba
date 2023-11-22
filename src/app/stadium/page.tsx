"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


// api/stadium 으로 접속 시, api/stadium/main 으로 자동 이동
export default function StadiumPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/stadium/main');
    }, []);

    return <h3> 경기장 목록 화면으로 이동합니다...</h3>;
};

