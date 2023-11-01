"use client";
import { useEffect, useState } from 'react';

type Post = {
    id: number;
    subject: string;
    isNotice: boolean;
    content: string;
    createDate: Date;
    commentList: Comment[];
    author: PostAuthor;
    modifyDate: Date | null;
    voter: Voter[];
}

type Comment = {
    id: number;
    content: string;
    createDate: Date;
    author: CommentAuthor;
    modifyDate: Date | null;
    voter: Voter[];
}

type PostAuthor = {
    id: number;
    username: string;
    password: string;
    email: string;
}

type CommentAuthor = {
    id: number;
    username: string;
    password: string;
    email: string;
}

type Voter = {
    id: number;
    username: string;
    password: string;
    email: string;
}



export async function getData() {
    const response = await fetch('http://43.200.115.249:8080/post/detail/38');
    const data = await response.json();
    return data.post;  // post 데이터만 반환
};

export default function PostDetail() {
    // 게시물 상세 화면
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        getData().then(data => setPost(data));
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
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
    );
}