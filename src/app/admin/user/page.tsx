"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


// admin/user으로 접속 시, admin/user/profile/main 으로 자동 이동
export default function adminUserPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/user/profile/main');
    }, []);

    return null;
};

