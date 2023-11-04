"use client";
import { useEffect, useState } from "react";
import styles from "../../../Home.module.css";

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

type ReadProps = {
  params: {
    id: number;
  };
};

export default function PostDetail(props: ReadProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 여기에서 댓글을 서버에 전송하는 코드를 작성하실 수 있습니다.
    console.log(comment);
  };

  useEffect(() => {
    fetch(`http://43.200.115.249:8080/post/detail/${props.params.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data.data.post))
      .catch((error) => console.log("Error : ", error));
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <p>
        <h3>제목 : {post.subject}</h3>
      </p>
      <div style={{ textAlign: "right" }}>
        <span style={{ fontSize: "0.8em" }}>
          작성자 : {post.author!.username} &nbsp;&nbsp;&nbsp;
        </span>
        <span style={{ fontSize: "0.8em" }}>
          작성일자: {new Date(post.createDate!).toLocaleString()}{" "}
          &nbsp;&nbsp;&nbsp;
        </span>
        {post.modifyDate && (
          <span style={{ fontSize: "0.8em" }}>
            마지막 수정일자 : {new Date(post.modifyDate!).toLocaleString()}{" "}
            &nbsp;&nbsp;&nbsp;
          </span>
        )}
      </div>
      <hr />
      <div>
        <p>{post.content}</p>
        <p>추천 수: {post.voter?.length}</p>
      </div>
      <hr />
      <h4> 댓글 ({post.commentList?.length})</h4>
      {post.commentList?.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.8em" }}>
              작성자: {comment.author.username} &nbsp;&nbsp;&nbsp;
            </span>
            <span style={{ fontSize: "0.8em" }}>
              작성일자: {new Date(comment.createDate!).toLocaleString()}{" "}
              &nbsp;&nbsp;&nbsp;
            </span>
            {comment.modifyDate && (
              <span style={{ fontSize: "0.8em" }}>
                수정일자 : {new Date(comment.modifyDate!).toLocaleString()}{" "}
                &nbsp;&nbsp;&nbsp;
              </span>
            )}
            <span style={{ fontSize: "0.8em" }}>
              추천 수: {comment.voter?.length} &nbsp;&nbsp;&nbsp;
            </span>
            <hr />
          </div>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성하세요."
          style={{ width: "100%", height: "100px", borderRadius: "10px" }}
        />
        <button type="submit" className={styles.addButton}>댓글 등록</button>
      </form>
    </div>
  );
}
