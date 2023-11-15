import ImageTag from "next/image";
import { useDropzone } from "react-dropzone";

type InsertTeamImageProps = {
    teamImage: string;
    setTeamImage: (teamImage: string) => void;
    teamImageFile: File | undefined;
    setTeamImageFile: (teamImageFile: File) => void;
}

export default function InsertTeamImage({teamImage, setTeamImage, teamImageFile, setTeamImageFile}: InsertTeamImageProps) {
    let width = 200;
    let height = 200;

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    function onDrop(acceptedFiles: any) {
        const reader = new FileReader();
        const file = acceptedFiles[0];

        if(file){
            reader.readAsDataURL(file);
            setTeamImage(file);
            console.log("teamImage: ");
            console.log(teamImage);
        }

        reader.onload = () => {
            const img: HTMLImageElement = new Image();
            img.src = reader.result as string;
            img.onload = () => {
                setTeamImage(reader.result as string);
                const elem = document.createElement('canvas');
                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                if (ctx !== null) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const ext = file.name.split('.').pop();
                    let type = 'image/jpeg'; // default to jpeg
    
                    if (ext === 'png') {
                        type = 'image/png';
                    } else if (ext === 'jpg' || ext === 'jpeg') {
                        type = 'image/jpeg';
                    }
                    // else if (ext === 'gif') { type = 'image/gif'; } // add more if needed
    
                    ctx.canvas.toBlob((blob) => {
                        if (blob !== null) {
                        const resizedFile = new File([blob], `${file.name}.${ext}`, {type: type, lastModified: Date.now()});
                        // save the file...
                        console.log("resizedFile: ");
                        console.log(resizedFile);
                        setTeamImageFile(resizedFile);
                        }
                    }, type, 1);
                }
            };
            (document.getElementsByName("imageURL")[0] as HTMLInputElement).value = "";
        };
    }

    return(
        <div className="img_wrap" {...getRootProps()}>
            <ImageTag src={teamImage} alt="팀 이미지" width={width} height={height}/>
            <input {...getInputProps()} multiple={false} name="imageURL"/>
        </div>
    )
}
