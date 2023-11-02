"use client";
import { useEffect, useState } from "react";

type Post1 = {
    keyword: string;
    notices: Array<{}>;
    paging: Array<{}>;
}

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
        paging: [{}]
    }
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

    //     if (!response.ok) {
    //         throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
    //     }
    //     const data: Post = await response;
    //     setPosts(data);
    //     setLoading(false);
    // } catch (error) {
    //     console.log(error);
    //     setLoading(false);
    // }
  }

  useEffect(() => {
    async function getData() {
      return getPosts();
    }
    const result = getData();
    console.log("result: ");
    console.log(result);
  }, []);

  // if (loading) {
  //     return <div>Now Loading...</div>
  // }

  // if (error) {
  //     return <div>{error}</div>;
  // }

  return (
    <div>
      {!loading && <h1>로딩 중</h1>}
      <div>
      {loading && <h1>로딩 완료</h1>}
</div>
{/* {posts.keyword} */}

      {/* {loading && {posts.map((post) => (
            <li key={post.id}>
            <h2>{post.subject}</h2>
            <p>{post.content}</p>
            </li>
        ))}} */}
    </div>
  );
}
