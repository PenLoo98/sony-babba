import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from '@mui/material/Box';

export default function Admin() {
    const buttons = [
        { name: 'Dashboard', imgSrc: '/dashboard.png' },
        { name: 'User', imgSrc: '/member.png' },
        { name: 'Team', imgSrc: '/team.png' },
        { name: 'Stadium', imgSrc: '/stadium.png' },
        { name: 'Post', imgSrc:'/post.png'},
        { name: 'Gift', imgSrc:'/gift.png'},
        { name: 'MVP', imgSrc: '/mvp_.png'}
    ];

    return (
        <Box sx={{
            display:"grid",
            gap:"20px",
            gridTemplateColumns:{
            xs:"repeat(1, 1fr)",
            sm:"repeat(2, 1fr)",
            md:"repeat(4, 1fr)"
            }
        }}>
        {
            buttons.map((button,i) => 
                <div key={i} className="left-container" style={{ padding:"20px" }}>
                    <Link href={`/admin/${button.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
                        <Button style={{ textTransform: 'none', flexDirection:"column", display:'flex', justifyContent:'center'}}>
                            <Image src={button.imgSrc}
                                width={200}
                                height={200}
                                alt={`${button.name}-image`}/>
                            <Box sx={{
                                width : '200px',
                                height : '70px',
                                border:'2px',
                                borderRadius:'8px',
                                padding:'5px',
                                marginTop:'10px'
                                }}>
                                <h2>{button.name}</h2>
                            </Box>
                        </Button>
                    </Link>
                </div>
                )
            }
        </Box>
    );
}