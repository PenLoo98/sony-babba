"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

type InsertTeamImageProps = {
    teamImage: string;
    setTeamImage: (teamImage: string) => void;
}

export default function InsertTeamImage({teamImage, setTeamImage}: InsertTeamImageProps) {
    // 팀 이미지 미리보기
    let width = 200;
    let height = 200;

    // 이미지 파일을 dropzone에 드롭하면 onDrop 함수 실행
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    function onDrop(acceptedFiles: any) {
        const reader = new FileReader();
        const file = acceptedFiles;

        // 이미지 파일을 읽어 setImage로 저장
        if(file){
            reader.readAsDataURL(file[0]);
            setTeamImage(file[0]);
        }

        // onDrop되면 preview를 보여줌, 기존 이미지 url을 지움
        reader.onload = () => {
            setTeamImage(reader.result as string);
            (document.getElementsByName("imageURL")[0] as HTMLInputElement).value = "";
        };
    }

    return(
        <div className="img_wrap" {...getRootProps()}>
            <Image src={teamImage} alt="팀 이미지" width={width} height={height}/>
            <input {...getInputProps()} multiple={false} name="imageURL"/>
        </div>
    )
}