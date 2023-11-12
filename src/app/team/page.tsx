"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


// api/team로 접속 시, api/team/main 으로 자동 이동
export default function TeamPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/team/main');
    }, []);

    return null;
};
