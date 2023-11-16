import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import Image from 'next/image';

export default function Dashboard() {
    <h1>Dashboard</h1>
    return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <Typography variant="h4" component="div" style={{margin: '20px 0'}}>
        Dashboard
    </Typography>
    <Grid container spacing={3}>
        <Grid item xs={4}>
            <Card>          
            {/* TODO : 회원 수 표현 */}
                <CardContent>
                    <Typography variant="h5" component="div">
                        회원 수 현황
                    </Typography>
                    <Image
                        src="/member.png"
                        width={48}
                        height={48}
                        alt="Icon"
                    />
                    <Typography variant="h3">
                        10,000
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                        View Member List
                    </Button>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card>
            {/* TODO : 방문자 수 현황  조회 */}
                <CardContent>
                    <Typography variant="h5" component="div">
                    Visitor (Day/Month)
                    </Typography>
                    <Image
                    src="/member.png"
                    width={48}
                    height={48}
                    alt="Icon"
                    />
                    <Typography variant="h3">
                        23 / 400 
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                        View more
                    </Button>  
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card>
            {/* TODO : 팀 수 현황  조회 */}
                <CardContent>
                    <Typography variant="h5" component="div">
                        팀 수 현황 
                    </Typography>
                    <Image
                    src="/team.png"
                    width={48}
                    height={48}
                    alt="Icon"
                    />
                    <Typography variant="h3">
                        100 
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                        View Team List
                    </Button>            
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6}>
            <Card>
            {/* TODO : 매칭 수 현황 조회 */}
                <CardContent>
                    <Typography variant="h5" component="div">
                        Number of Match (Day / Month)
                    </Typography>
                    <Image
                    src="/team.png"
                    width={48}
                    height={48}
                    alt="Icon"
                    />
                    <Typography variant="h3">
                        45
                    </Typography>            
                </CardContent>
                <Button variant="contained" color="primary" fullWidth>
                    View Match List
                </Button>
            </Card>
        </Grid>
        <Grid item xs={6}>
            <Card>
            {/* TODO : 기프티콘 수  조회 */}
                <CardContent>
                    <Typography variant="h5" component="div">
                        Number of Gifticon 
                    </Typography>
                    <Image
                    src="/gift.png"
                    width={48}
                    height={48}
                    alt="Icon"
                    />
                    <Typography variant="h3">
                        300 
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                        View Post List
                    </Button>            
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    </Box>
    </>
    );
}
