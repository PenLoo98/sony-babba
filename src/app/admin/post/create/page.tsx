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
    const [subject, setSubject] = useState<string>('');  // 제목 state
    const [content, setContent] = useState<string>('');  // 내용 state
    const [isNotice, setIsNotice] = useState<boolean>(true);  // 공지글 여부 state
    const [name, setName] = useState<string>('testid99');  // 사용자 이름 state
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
            subject,  // 제목
            content,  // 내용
            isNotice,  // 공지글 여부
            name,  // 사용자 이름
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
        <button type="submit">등록</button>
      </form>
    );
  }

// export default function CreatePost() {
//     const [subject, setSubject] = useState("");
//     const [isNotice, setIsNotice] = useState(true);
//     const [content, setContent] = useState("");
//     const router = useRouter();
  
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
  
//       if (subject.trim() === '') {
//           alert('제목은 필수입력입니다.');
//           return;
//         }
    
//         if (content.trim() === '') {
//           alert('내용은 필수입력입니다.');
//           return;
//         }
    
//       // 사용자 인증 정보
//       const username = 'testid';
//       const password = '1111';
  
//       // Basic Authentication 헤더 생성
//       const authString = `${username}:${password}`;
//       const encodedAuthString = btoa(authString);
      
//       try {
//         const response = await fetch("https://withsports.site/admin/post/create", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//               subject, // 제목
//               content, // 내용
//               name: 'testid99', // 사용자 이름
//               isNotice, // 공지 여부
//           }),
//         });
  
//         if (response.ok) {
//           alert("게시글이 성공적으로 등록되었습니다.");
//           router.push("/post/list");
//         } else {
//           alert("게시글 등록에 실패하였습니다.");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <h4>
//           {" "}
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             placeholder="제목을 입력하세요."
//             style={{width: '100%', height: '30px', fontSize: '16px', padding: '5px',  borderRadius:'10px'}}
//           />
//         </h4>
//         <input
//           type="checkbox"
//           checked={isNotice}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setIsNotice(e.target.checked)
//           }
//         />{" "}
//         공지글
//         <br />
//         <br />
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="내용을 입력하세요."
//           style={{width: '100%', height: '200px', fontSize: '16px', padding: '5px', borderRadius:'10px'}} 
//         />
//         <br />
//         <button type="submit">등록</button>
//       </form>
//     );
//   }
  