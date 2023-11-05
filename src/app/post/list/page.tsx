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

      //  setPopularPosts(popularPosts);
    };

    fetchData();
  }, []);

  return (
    <div>
      <br />
      <div className={styles.boardContainer}>
        <Link href="/post/create">
          <button className={styles.addButton} >게시글 등록하기</button>
        </Link>
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
      <Link href="/post/notices" style={{ color: 'black', textDecoration: 'none', fontSize : 'Large'}}>
        공지사항
      </Link>
        {notices.map((notice) => (
          <div key={notice.id}>
            <h5>
            <style jsx>{`a { color: inherit; text-decoration: none; }`}</style>
              <a href={`/post/detail/${notice.id}`}>{notice.subject}</a>
            </h5>
            <div style={{ textAlign: 'right' }}>
              <p>작성자: {notice.author} &nbsp;&nbsp; 작성일자: {notice.createDate}</p>
            </div>
            <hr />
          </div>
        ))}
      </ul>
      <h3>일반 게시물</h3>
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
                  <style jsx>{`a { color: inherit; text-decoration: none;}`}</style>
                  <a href={`/post/detail/${post.id}`}>{post.subject}</a>
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
        {Array.from({ length: totalPages }, (_, i) => (
          <Link key={i} href={`/post/list?page=${i}`}>
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
