"use client";
import { useEffect, useState } from 'react';

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

export default function PostDetail(props:ReadProps) {

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://43.200.115.249:8080/post/detail/${props.params.id}`)
    .then(response => response.json())
    .then(data => setPost(data.data.post))
    .catch(error=> console.log('Error : ', error));
  }, []);

  if(!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.subject}</h1>
      <p>{post.content}</p>
      {post.commentList?.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>작성자: {comment.author.username}</p>
        </div>
      ))}
    </div>
  );
}