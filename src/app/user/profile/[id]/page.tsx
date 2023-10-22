import Image from "next/image";

type PageParams = {
    id: string;
}
export default function Profile({ params }: {params: PageParams}) {
    console.log(params)
    return (
        <div style={{display:"flex", justifyContent:"center", placeItems:"center"}}>
            <Image src="/default-profile.png" alt="profile" width={190} height={190} />
        </div>
    );
}