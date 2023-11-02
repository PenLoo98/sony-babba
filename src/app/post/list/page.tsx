"use client";
import { useEffect, useState } from "react";
import styles from "../../Home.module.css";

type Post1 = {
  keyword: string;
  notices: Array<{}>;
  paging: Array<{}>;
};

type Post = {
  id?: number;
  subject?: string;
  isNotice?: boolean;
  content?: string;
  createDate?: Date;
  commentList?: Comment[];
  author?: PostAuthor;
  modifyDate?: Date | null;
  voter?: Voter[];
};

type Comment = {
  id: number;
  content: string;
  createDate: Date;
  author: CommentAuthor;
  modifyDate: Date | null;
  voter: Voter[];
};

type PostAuthor = {
  id: number;
  username: string;
  password: string;
  email: string;
};

type CommentAuthor = {
  id: number;
  username: string;
  password: string;
  email: string;
};

type Voter = {
  id: number;
  username: string;
  password: string;
  email: string;
};

export default function PostList() {
  let postData: Post1 = {
    keyword: "",
    notices: [{}],
    paging: [{}],
  };
  const [posts, setPosts] = useState<Post1>();
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    const Url = `http://43.200.115.249:8080/post/list`;

    const response = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log("data: ;");
          console.log(data.data);
          setLoading(true);
          setPosts(data.data);
          return data.data;
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    async function getData() {
      return getPosts();
    }
    const result = getData();
    console.log("result: ");
    console.log(result);
  }, []);

  // 공지글 테스트
  const noticePost = [
    {
      id: 1,
      subject: "첫 번째 공지글",
      createDate: "2023-01-01",
      isNotice: true,
    },
    {
      id: 2,
      subject: "두 번째 공지글",
      createDate: "2023-01-02",
      isNotice: true,
    },
    {
      id: 3,
      subject: "세 번째 공지글",
      createDate: "2023-01-03",
      isNotice: false,
    },
  ];

  // 게시글 테스트
  const commonPost = [
    {
      id: 1,
      subject: "첫 번째 게시글",
      author: "작성자1",
      createDate: "2023-01-01",
      isNotice: false,
    },
    {
      id: 2,
      subject: "두 번째 게시글",
      author: "작성자2",
      createDate: "2023-01-02",
      isNotice: false,
    },
    {
      id: 3,
      subject: "세 번째 게시글",
      author: "작성자3",
      createDate: "2023-01-03",
      isNotice: false,
    },
  ];

  // isNotice가 true인 공지글만 필터
  const notices = noticePost.filter((post) => post.isNotice);

  // isNotice가 false인 일반 게시글 필터
  const commons = commonPost.filter((post) => !post.isNotice);

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
          <button>search</button>
        </div>
      </div>
      {/** 공지글 출력 테스트 */}
      <ul className={styles.noticeList}>
        <a href="/post/notices">공지글</a>
        {notices.map((notice) => (
          <li className={styles.noticeItem} key={notice.id}>
            <a>{notice.subject}</a>
            <a>{notice.createDate}</a>
          </li>
        ))}
      </ul>

      <table className={styles.postTable}>
        <thead>
          <tr>
            <th>글 번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {commons.map(common => (
            <tr key={common.id}>
              <td>{common.id}</td>
              <td>{common.subject}</td>
              <td>{common.author}</td>
              <td>{common.createDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {!loading && <h1>로딩 중</h1>}

      {loading && <h1>로딩 완료</h1>} */}
    </div>
  );
}
