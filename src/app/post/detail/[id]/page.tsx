"use client";
import { useEffect, useState } from 'react';
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

type ReadProps = {
    params: {
        id : number;
    }
};

// async function getData() {
//     const response = fetch('http://43.200.115.249:8080/post/detail/38')
//     .then((res) => res.json())
//     .then((data) => {return data});

//     const data = response.post;
//     return data;  // post 데이터만 반환
// };

export default function PostDetail(props:ReadProps) {
    // // fetch로 불러오기 전 초기 데이터
    // // 여기에 해당하는 변수만 불러올 수 있어요
    // let initialData: Post = {
    //     id: 0,
    // subject: "",
    // isNotice: false,
    // content: "",
    // createDate: new Date(),
    // commentList: [],
    // author: {
    //     id: 0,
    //     username: "",
    //     password: "",
    //     email: "",
    // },
    // modifyDate: new Date(),
    // voter: []
    // }

    
    // // 게시물 상세 화면
    // const [post, setPost] = useState<Post>(initialData);

    // // fetch로 불러온 게시판 조회
    // const [showPost, setShowPost] = useState(false);

    // // 페이지 렌더링 되면 fetch로 게시판 조회
    // useEffect(() => {
    //     async function fetchPostData() {
    //     let postData = await getData();
    //     if(postData) {
    //         console.log("postData:");
    //         console.log(postData);
    //         setPost(postData);
    //         setShowPost(true);
    //     }
    //     }

    //     fetchPostData();
    // }, []);

    let postData: Post1 = {
        keyword: "",
        notices: [{}],
        paging: [{}],
      };
      const [posts, setPosts] = useState<Post1>();
      const [loading, setLoading] = useState(true);
    
      async function getPosts() {
        const Url = `http://43.200.115.249:8080/post/detail/${props.params.id}`;
    
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

    return (
        <div>
            parameter: {props.params.id}
            게시글 상세화면

{/*             
            {!showPost && <div>Loading...</div>}
            {showPost && (
            <div>
            <h2>parameter : {props.params.id}</h2>
            <h2>{post.subject}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author.username}</p>
            <p>Email: {post.author.email}</p>
            <h3>Comments</h3>
            <ul>
                {post.commentList.map((comment) => (
                    <li key={comment.id}>
                        <p>{comment.content}</p>
                        <p>Comment by: {comment.author.username}</p>
                    </li>
                ))}
            </ul>
            </div>
            )} */}
        </div>
    );
}