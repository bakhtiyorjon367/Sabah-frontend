import React from "react";
import { CardCover } from "@mui/joy";
import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from  "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

//REDUX SELECTOR 
const popularProductsRetriever = createSelector(
    retrievePopularProducts,
   (popularProducts) => ({popularProducts})
  );

export default function PopularProducts(){
    const history = useHistory();
    const {popularProducts} = useSelector(popularProductsRetriever);
    const choosenProductHandler = ((id:string) => {
        history.push(`/products/${id}`);
    })

    return(
        <div className="popular-dishes-frame">
            <Container>
                <Stack className="popular-section">
                    <Box className="category-title">Chosen For You</Box>
                    <Stack className="cards-frame">
                        {popularProducts.length !== 0 ? (
                            popularProducts.map((product:Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                return(
                                    <CssVarsProvider key={product._id} >
                                        <Card className={"card"}  onClick={() => {choosenProductHandler(product._id)}}>
                                            <CardCover className={"card-img"}>
                                                <img src={imagePath} alt=""
                                               /> 
                                            </CardCover>
                                            <CardCover className={"card-cover"}/>
                                            <CardContent sx={{ justifyContent: 'flex-end' }}/>
                                            <CardOverflow 
                                                sx={{
                                                    display: "flex",
                                                    flexDirection:"column",
                                                    gap: 1.5,
                                                    py: 1.5,
                                                    px: "var(--Card-padding)",
                                                    borderTop: "1px solid",
                                                    height: "65px",
                                                    
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
                                                        }}> 
                                                        {product.salePrice ? product.productPrice-product.salePrice : product.productPrice}$
                                                </Stack>
                                            </CardOverflow>
                                        </Card>
                                    </CssVarsProvider>
                                );
                            })
                        ):(
                        <Box className="no-data"> Products are not available </Box>
                        )}
                    </Stack>
                </Stack>
            </Container> 
        </div>
    );
}