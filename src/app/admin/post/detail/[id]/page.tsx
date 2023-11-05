"use client";
import { useEffect, useState } from "react";
import styles from "../../../../Home.module.css";

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

  const handleEditPost = () => {
    // 게시글 수정 로직
    console.log("Edit Post");
  };

  const handleDeletePost = () => {
    // 게시글 삭제 로직
    console.log("Delete Post");
  };

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 댓글을 서버에 전송하는 코드를 작성
    console.log(comment);
  };

  const handleGoBack = () => {
    // 임시
    window.location.href = "/post/list";
  };

  useEffect(() => {
    fetch(`https://withsports.site/post/detail/${props.params.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data.data.post))
      .catch((error) => console.log("Error : ", error));
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h3 style={{ marginBottom: "1px" }}>{post.subject}</h3>
      {/* TODO : 수정/삭제 버튼은 권한에 따라서 활성화/비활성화 되어야 함.*/}
      <span style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleEditPost}
          className={styles.modifybutton}
          style={{ marginRight: "10px" }}
        >
          수정
        </button>
        <button onClick={handleDeletePost} className={styles.deletebutton}>
          삭제
        </button>
      </span>
      <div style={{ textAlign: "right" }}>
        <span style={{ fontSize: "0.8em" }}>
          작성자 : {post.author!.username} &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span style={{ fontSize: "0.8em" }}>
          작성일자: {new Date(post.createDate!).toLocaleString()}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {post.modifyDate && (
          <span style={{ fontSize: "0.8em" }}>
            마지막 수정일자 : {new Date(post.modifyDate!).toLocaleString()}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        )}
      </div>
      <hr />
      <div>
        <p>{post.content}</p>
        <br />
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <button className={styles.likebutton}>
            추천 {post.voter?.length}
          </button>
        </div>
      </div>
      <hr />
      <h4> 댓글 ({post.commentList?.length})</h4>
      {post.commentList?.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.8em" }}>
              작성자: {comment.author.username} &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span style={{ fontSize: "0.8em" }}>
              작성일자: {new Date(comment.createDate!).toLocaleString()}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {comment.modifyDate && (
              <span style={{ fontSize: "0.8em" }}>
                수정일자 : {new Date(comment.modifyDate!).toLocaleString()}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            )}
            <span style={{ fontSize: "0.8em" }}>
              추천 수: {comment.voter?.length} &nbsp;&nbsp;&nbsp;
            </span>
            <hr />
          </div>
        </div>
      ))}
      <form
        onSubmit={handleCommentSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성하세요."
          style={{ width: "100%", height: "100px", borderRadius: "10px" }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button onClick={handleGoBack} className={styles.backbutton}>
            게시글 목록
          </button>
          <button type="submit" className={styles.addButton}>
            댓글 등록
          </button>
        </div>
      </form>
    </div>
  );
}
