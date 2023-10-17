import { Alert } from "@mui/material";
export default function SuccessMsg(props:any){
    let msgText;
    return(
        <Alert onClose={() => {}}>{props.msgText}</Alert>
    );
}