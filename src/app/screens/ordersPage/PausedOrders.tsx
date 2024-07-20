import React from "react";
import TabPanel  from "@mui/lab/TabPanel";
import  Button from "@mui/material/Button"
import { Box, Stack } from "@mui/material";

export default function PausedOrders(){
    const arr:any =[1,2];
    return (

        <TabPanel value={"1"}>
            <Stack>
                {arr.length != 0 ? ( 
                    arr.map((_ele: any, index: React.Key | null | undefined) => {
                        return (
                            <Box key={index} className={"order-main-box"}>
                                <Box className={"order-box-scroll"}>
                                    {[1, 2].map((ele2, index2) => {
                                        return (
                                            <Box key={index2} className={"orders-name-price"}>
                                                <img src={"/img/lavash.webp"}
                                                     className={"order-dish-img"}
                                                />
                                                <p className="title-dish"> Lavash </p>
                                                <Box className={"price-box"}>
                                                    <p>$9</p>
                                                    <img src={"/icons/close.svg"}/>
                                                    <p>2</p>
                                                    <img src={"/icons/pause.svg"}/>
                                                    <p style={{marginLeft: "15px"}}> $24 </p>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>
    
                                <Box className={"total-price-box"}>
                                    <Box className={"box-total"}>
                                        <p>Product price</p>
                                        <p>$18</p>
                                        <img src={"/icons/plus.svg"} style={{marginLeft: "20px"}}/>
                                        <p>Delivery cost</p>
                                        <p> $2 </p>
                                        <img src={"/icons/pause.svg"} style={{marginLeft: "20px"}}/>
                                        <p > Total </p>
                                        <p> $20 </p>
                                    </Box>
    
                                    <Button 
                                        variant="contained"
                                        color="secondary"
                                        className={"cancel-button"}
                                    >
                                        Cancel
                                    </Button>
    
                                    <Button 
                                        variant="contained"
                                        className={"pay-button"}
                                    >
                                        Payment
                                    </Button>
                                </Box>
                            </Box>
    
                        );
                    })
                 ) : (  
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img    
                            src={"/icons/noimage-list.svg"}
                            style={{width: 300, height: 300}}
                        />
                    </Box>
                )} 
                

                {false && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img    
                            src={"/icons/noimage-list.svg"}
                            style={{width: 300, height: 300}}
                        />
                    </Box>
                )}
            </Stack>
        </TabPanel>
    );
}