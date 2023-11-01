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

export default function PostList(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getPosts = async () => {
        try {
            const response = await fetch('/43.200.115.249:8080/post/list');
            if (!response.ok) {
                throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
            }
            const data: Post[] = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    if (loading) {
        return <div>Now Loading...</div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ul>
        {posts.map((post) => (
            <li key={post.id}>
            <h2>{post.subject}</h2>
            <p>{post.content}</p>
            </li>
        ))}
        </ul>
    );
};