"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../Home.module.css";

// 게시글 정보 타입
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
  const [popularPosts, setPopularPosts] = useState<Post[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://43.200.115.249:8080/post/list");
      const data = await response.json();

      // 공지 게시글 정보 가공
      const fetchedNotices: Post[] = data.data.notices.map((notice: any) => ({
        id: notice.id,
        subject: notice.subject,
        isNotice: notice.isNotice,
        author: notice.author.username,
        createDate: new Date(notice.createDate).toLocaleString(),
      }));

      // 일반 게시글 정보 가공
      const fetchedPosts: Post[] = data.data.paging.content.map(
        (post: any) => ({
          id: post.id,
          subject: post.subject,
          isNotice: post.isNotice,
          author: post.author.username,
          createDate: new Date(post.createDate).toLocaleString(),
        })
      );

    
      setNotices(fetchedNotices);
      setPosts(fetchedPosts);
      setTotalPages(data.data.paging.totalPages);

      setPopularPosts(popularPosts);
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <br />
      <div className={styles.boardContainer}>
        <button className={styles.addButton}>게시글 등록하기</button>
        <div>
          <input
            className={styles.searchBox}
            type="text"
            placeholder="검색어를 입력하세요"
          />
          <button className={styles.searchButton}>search</button>
        </div>
      </div>
      <ul className={styles.noticeList}>
        <Link href="/post/notices">공지사항</Link>
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
      </ul>
      <h3>일반 게시글</h3>
      <table className={styles.postTable}>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <h5>
                  <Link href={`http://localhost:3000/post/detail/${post.id}`}>
                    {post.subject}
                  </Link>
                </h5>
              </td>
              <td>{post.author}</td>
              <td>{post.createDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      <div>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setPage(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}