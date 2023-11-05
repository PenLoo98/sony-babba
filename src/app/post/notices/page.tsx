"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../Home.module.css";

// 게시글 정보를 담는 타입 정의
type Post = {
  id: number;
  subject: string;
  isNotice: boolean;
  author: string;
  createDate: string;
};

export default function PostList() {
  const [notices, setNotices] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  //const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);
  const handleGoBack = () => {
    // 임시
    window.location.href = "http://localhost:3000/post/list";
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://43.200.115.249:8080/post/list");
      const data = await response.json();

      // 공지 게시글 정보만을 추출하여 가공
      const fetchedNotices: Post[] = data.data.notices.map((notice: any) => ({
        id: notice.id,
        subject: notice.subject,
        isNotice: notice.isNotice,
        author: notice.author.username,
        createDate: new Date(notice.createDate).toLocaleString(),
      }));


      // 가공한 데이터를 상태에 저장
      setNotices(fetchedNotices);
      setTotalPages(data.data.paging.totalPages);
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <br/>
      <h3>공지사항</h3>
      {notices.map((notice) => (
        <div key={notice.id}>
          <h5>
            <Link href={`http://localhost:3000/post/detail/${notice.id}`}>
              {notice.subject}
            </Link>
          </h5>
          <p>작성자: {notice.author}</p>
          <p>작성일자: {notice.createDate}</p>
          <hr />
        </div>
      ))}
      {/* 페이지네이션 */}
      <div>
        {[...Array(totalPages)].map((_, i) =>  (
          <button key={i} onClick={() => setPage(i)}>
            {i + 1}
          </button>
        ))}
      </div>
      <button onClick={handleGoBack} className={styles.backbutton}>
            뒤로가기
          </button>
    </div>
  );
}

