"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MvpPage(){

  const router = useRouter();

  useEffect(() => {
      router.push('http://43.202.217.5:3000/ ');
  }, []);

  return <>Metamask Loading...</>;
}