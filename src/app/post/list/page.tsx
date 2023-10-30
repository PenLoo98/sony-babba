import { Button } from "@mui/material";



export default function PostPage(){

    type PostListInfoProps = {
        post_id : number,
        post_subject : string,
        post_isNotice : boolean,
        post_content : Text,
        post_createDate : Date,
        post_modifyDate : Date,
        post_commentList : object,
        post_author : object,
        post_voter : object
    };

    type post_author = {
        id : number,
        username : string,
        password : string,
        email : string,

    }

    //TODO : 게시글 목록 fetch 구현


    return (
    <>
    </>
    );  
}