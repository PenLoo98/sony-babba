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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리
  
  const [editContent, setEditContent] = useState(''); // 수정할 내용을 저장

  // // 댓글 수정 폼 표시 여부 + 댓글 ID 저장
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  // 로그인한 사용자의 이름 가져오기
  const loggedInUsername = localStorage.getItem("username");

  // 게시글 수정 페이지로 이동
  const handleModifyPost = () => {
    window.location.href = `/post/modify/${props.params.id}`;
  };

  // 게시글 삭제 로직
  const handleDeletePost = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

    if (confirmDelete) {
      // "예"를 선택한 경우, 서버에 삭제 요청 보내기
      fetch(`https://withsports.site/post/delete/${props.params.id}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            alert("게시글이 성공적으로 삭제되었습니다.");
            // 삭제 후 게시글 목록 페이지로 이동
            window.location.href = "/post/list";
          } else {
            throw new Error("게시글 삭제 실패");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // 추천 버튼
  const handleVote = () => {
    if (loggedInUsername) {
      // 추천 요청 보내기
      fetch(
        `https://withsports.site/post/vote/${props.params.id}?name=${loggedInUsername}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.code === "0") {
            // 요청이 성공한 경우, 페이지 다시 불러와서 추천수 증가
            setPost(data.data.post);
            window.location.href = `/post/detail/${props.params.id}`;
          } else {
            throw new Error("추천 실패");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // 댓글 생성
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    if (loggedInUsername) {
      fetch(`https://withsports.site/comment/create/${props.params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          name: loggedInUsername,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === "0") {
            // 요청이 성공 시, 댓글 입력창 초기화, 게시글 데이터 업데이트
            setComment("");
            fetch(`https://withsports.site/post/detail/${props.params.id}`)
              .then((response) => response.json())
              .then((data) => setPost(data.data.post))
              .catch((error) => console.log("Error : ", error));
          } else {
            throw new Error("댓글 생성 실패");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // TODO : 댓글 수정 <= 모달 창 방식

  const handleEditContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(event.target.value);
  };

  const handleOpenModal = (commentId: number) => {
    setIsEditing(true);
    setEditCommentId(commentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setEditCommentId(0);
    setEditContent('');
    setShowModal(false);
  };

  const handleCommentUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    if (loggedInUsername) {
      fetch(`https://withsports.site/comment/modify/${editCommentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editContent,
          name: loggedInUsername,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === "0") {
            // 요청이 성공 시, 댓글 입력창 초기화, 게시글 데이터 업데이트
            setEditContent("");
            setIsEditing(false);
            setEditCommentId(0);
            setShowModal(false);
            fetch(`https://withsports.site/post/detail/${props.params.id}`)
              .then((response) => response.json())
              .then((data) => setPost(data.data.post))
              .catch((error) => console.log("Error : ", error));
          } else {
            throw new Error("댓글 수정 실패");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };


  // 댓글 삭제
  const handleCommentDelete = (commentId: number) => {
    // 댓글 삭제 요청 보내기
    fetch(`https://withsports.site/comment/delete/${commentId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "0") {
          // 요청이 성공한 경우, 게시글 데이터 업데이트
          fetch(`https://withsports.site/post/detail/${props.params.id}`)
            .then((response) => response.json())
            .then((data) => setPost(data.data.post))
            .catch((error) => console.log("Error : ", error));
        } else {
          throw new Error("댓글 삭제 실패");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // 댓글 좋아요
  const handleCommentVote = (commentId: number) => {
    if (loggedInUsername) {
      // 댓글 추천 요청 보내기
      fetch(`https://withsports.site/comment/vote/${commentId}?name=${loggedInUsername}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === '0') {
          // 요청이 성공한 경우, 게시글 데이터 업데이트
          fetch(`https://withsports.site/post/detail/${props.params.id}`)
            .then((response) => response.json())
            .then((data) => setPost(data.data.post))
            .catch((error) => console.log("Error : ", error));
        } else {
          throw new Error('댓글 추천 실패');
        }
      })
      .catch((error) => console.error('Error:', error));
    }
  };

  // 게시글 목록으로 이동
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault(); // 댓글 폼 제출 막기
    window.location.href = "/admin/post/list";
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
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleModifyPost}
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
          <button onClick={handleVote} className={styles.likebutton}>
            추천 {post.voter?.length}
          </button>
        </div>
      </div>
      <hr />
      <h4> 댓글 ({post.commentList?.length})</h4>
      {post.commentList?.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <button onClick={() => handleCommentVote(comment.id)} className={styles.likebutton} style={{ marginRight: "10px" }}>👍</button>
          {loggedInUsername === comment.author!.username && (
          <>
              {/* TODO : 댓글 수정 버튼 추가 */}
              <button onClick={() => handleOpenModal(comment.id)} className={styles.addButton} style={{marginRight: "10px"}}>수정</button>
              <button onClick={() => handleCommentDelete(comment.id)} className={styles.deletebutton}>삭제</button>
          </>
          )}
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
        <br/>
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
        <br/>
      </form>
       {showModal && (
        <div style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  
          padding: '20px',
          width: '300px',  
          height: '200px', 
          borderRadius: '10px',  
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' 
          }}>
            
          <form onSubmit={handleCommentUpdate}  style={{ width: '100%', marginBottom: '20px' }}>
            <input type="text" value={editContent} onChange={handleEditContentChange}  style={{ width: "100%", height: "100px", borderRadius: "10px" }} />
          </form>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button type="submit"  onClick={handleCommentUpdate}  className ={styles.addButton} style={{marginRight: "10px"}}>수정 완료</button>
          <button onClick={handleCloseModal}  className={styles.deletebutton}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
