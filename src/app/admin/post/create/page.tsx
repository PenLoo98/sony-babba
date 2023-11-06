"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../../Home.module.css";

type Post = {
  id: number;
  subject: string;
  isNotice: boolean;
  author: string;
  createDate: string;
};

export default function CreatePost() {
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');  
    const [isNotice, setIsNotice] = useState<boolean>(true); 
    const [name, setName] = useState<string>('testid99'); 
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (subject.trim() === '') {
        alert('제목은 필수입력입니다.');
        return;
      }
  
      if (content.trim() === '') {
        alert('내용은 필수입력입니다.');
        return;
      }
  
      try {
        const response = await fetch('https://withsports.site/post/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject,  
            content,  
            isNotice,  
            name,  
          }),
        });
  
        if (response.ok) {
          alert('게시글이 성공적으로 등록되었습니다.');
          router.push('/post/list');
        } else {
          alert('게시글 등록에 실패하였습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // 뒤로 가기 버튼
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault(); // 댓글 폼 제출 막기
    window.location.href = "/admin/post/list";
  };
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          placeholder="제목" 
          style={{width: '100%', height: '40px', fontSize: '16px', padding: '5px'}} 
        />
        <input 
          type="checkbox" 
          checked={isNotice} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsNotice(e.target.checked)} 
        /> 공지사항 여부
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="내용" 
          style={{width: '100%', height: '200px', fontSize: '16px', padding: '5px'}} 
        />
        <button type="submit" className={styles.addButton} style={{ marginRight: "10px" }}>등록하기</button>
      <button onClick={handleGoBack} className={styles.backbutton}> 뒤로 가기 </button>
      </form>
    );
  }
