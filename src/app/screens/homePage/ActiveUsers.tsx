import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import  AspectRatio  from "@mui/joy/AspectRatio";

const activeUsers = [
    {memberNick: "Martin", memberImage: "/img/martin.webp"},
    {memberNick: "Justin", memberImage: "/img/justin.webp"},
    {memberNick: "Rose", memberImage: "/img/rose.webp"},
    {memberNick: "Nusret", memberImage: "/img/nusret.webp"},
];

export default function ActiveUsers(){
    return(
        <div className={"active-users-frame"}> 
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}>Active Users</Box>
                    <Stack className={"cards-frame"}>
                        <CssVarsProvider>
                            {activeUsers.length !== 0 ? (
                                activeUsers.map((user) => {
                                    return (
                                        <Card  variant="outlined" className={"card"}>
                                            <CardOverflow>
                                                <AspectRatio ratio="1"> 
                                                    <img src={user.memberImage} alt="" />
                                                </AspectRatio>
                                            </CardOverflow>
    
                                            <CardOverflow variant="soft" className= "card-nickname">
                                                <Typography >
                                                    {user.memberNick}
                                                </Typography>
                                                 
                                            </CardOverflow>
                                        </Card>

                                    );
                                })
                            ):(
                                <Box className="no-data"> No active users </Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}