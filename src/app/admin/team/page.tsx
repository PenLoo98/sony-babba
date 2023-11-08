"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


// admin/team으로 접속 시, admin/team/main 으로 자동 이동
export default function PostPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/team/main');
    }, []);

    return null;
};

