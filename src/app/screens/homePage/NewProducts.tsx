import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from  "@mui/icons-material/Visibility";
import { retrieveNewProducts } from "./selector";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CardCover } from "@mui/joy";

const newProductRetriever = createSelector(
    retrieveNewProducts,
     (newProducts) => ({newProducts})
    );

export default function NewProducts(){
    const history = useHistory();
    const {newProducts} = useSelector(newProductRetriever);
    const newProductsHandler = ((id:string) => {
        history.push(`/products/${id}`);
    });
    
    return(
        <div className={"new-products-frame"}>
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}> New  Arrivals</Box>
                    <Stack className={"cards-frame"}>
                        <CssVarsProvider>
                            {newProducts.length !== 0 ? (
                                newProducts.map((product:Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    // const saledProduct = product.salePrice != 0
                                    //                     ? product.salePrice + " liter" 
                                    //                     : product.productPrice   + " size"; 
                                    return(
                                        <CssVarsProvider key={product._id} >
                                            <Card className={"card"}  onClick={() => {newProductsHandler(product._id)}}>
                                                <CardCover className={"card-img"}>
                                                    <img src={imagePath} alt=""
                                                /> 
                                                </CardCover>
                                                <CardCover className={"card-cover"}/>
                                                <CardOverflow 
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection:"column",
                                                        gap: 1.5,
                                                        py: 1.5,
                                                        px: "var(--Card-padding)",
                                                        borderTop: "1px solid",
                                                        height: "65px",
                                                        marginTop:"397px"
                                                    }}
                                                >
                                                    <Stack 
                                                        flexDirection={"row"} 
                                                        justifyContent={"space-between"}
                                                    >
                                                        <Typography 
                                                            level="h2" 
                                                            fontSize="lg"
                                                            textColor="#fff"
                                                            mb={1}
                                                            
                                                        >
                                                            {product.productName}
                                                        </Typography>
        
                                                        <Typography
                                                            sx={{
                                                                fontWeight:"md",
                                                                color: "neutral.300",
                                                                alignItems: "center",
                                                                display: "flex",
                                                            }}
                                                        >
                                                            {product.productView}
                                                            <VisibilityIcon sx={{fontSize:25, marginLeft:"5px"}}
                                                            />
                                                        </Typography>
                                                    </Stack>
                                                    <Stack  sx={{
                                                                marginTop:"-17px",
                                                                fontWeight:"lg",
                                                                fontFamily:"monospace",
                                                                color: "neutral.300",
                                                                alignItems: "left",
                                                                display: "flex",
                                                            }}>   {product.salePrice ? product.productPrice-product.salePrice : product.productPrice}$
                                                            
                                                    </Stack>
                                                </CardOverflow>
                                            </Card>
                                        </CssVarsProvider>
                                    
                                    );
                                })
                            ): (
                                <Box className="no-data">New products are not available </Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            
            </Container> 
        </div>
    );
}