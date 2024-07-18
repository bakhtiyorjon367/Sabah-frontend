import React from "react";
import {Box, Button, Card, Container, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon  from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon  from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon  from "@mui/icons-material/ArrowForward";

const products = [
    { productName: "Cutlet",imagePath: "/img/cutlet.webp" },
    { productName: "Kebab",imagePath: "/img/kebab.webp" },
    { productName: "Kebab",imagePath: "/img/kebab.webp" },
    { productName: "Lavash",imagePath: "/img/lavash.webp" },
    { productName: "Lavash",imagePath: "/img/lavash.webp" },
    { productName: "Cutlet",imagePath: "/img/cutlet.webp" },
    { productName: "Kebab",imagePath: "/img/kebab.webp" },
    { productName: "Kebab",imagePath: "/img/kebab.webp" },
];

export default function Products(){
    return (
        <div className={"products"}>
            <Container >
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}> 
                        <Stack className="top-text">                             
                                <Box className="title"> Burak restaurant</Box>
                               <Box className="search-box"> 
                                    <input
                                        className="search-input"
                                        placeholder="Type here"
                                    />
                                    <Button
                                        className="search-button"
                                        variant="contained"
                                    >Search<SearchIcon/></Button>
                                </Box>
                        </Stack>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                className={"order"}
                            > New </Button>
                            <Button 
                                variant={"contained"}
                                color={"secondary"}
                                className={"order"}
                            > Price </Button>
                            <Button 
                                variant={"contained"}
                                color={"secondary"}
                                className={"order"}
                            > Views </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button variant={"contained"} color={"secondary"}> 
                                    Other 
                                </Button>
                                <Button variant={"contained"} color={"secondary"}> 
                                    Desert 
                                </Button>
                                <Button variant={"contained"} color={"secondary"}> 
                                    Drink 
                                </Button>
                                <Button variant={"contained"} color={"secondary"}> 
                                    Salad 
                                </Button>
                                <Button variant={"contained"} color={"primary"}> 
                                    Dish 
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={"product-wrapper"}>
                           {products.length !== 0 ? (
                            products.map((product, index) => {
                                    return (
                                        <Stack key={index} className={"product-card"}>
                                            <Stack className={"product-img"} sx={{backgroundImage: `url(${product.imagePath})`}}>
                                                    
                                                <div className={"product-sale"}> Normal size </div>
                                               
                                                    
                                                        <Button className={"shop-btn"} >
                                                            <img src="/icons/shopping-cart.svg"
                                                            />
                                                        </Button>
                                                   
                                                   
                                                        <Button className={"view-btn"}  >
                                                            <Badge badgeContent={1} color="secondary">
                                                                <RemoveRedEyeIcon
                                                                    sx={{color: 20 ? "gray" : "white "}}
                                                                />
                                                            </Badge>
                                                        </Button>
                                                    
                                                
                                                
                                            
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon/>
                                                    {12}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : ( 
                                <Box className={"no-data"}> Products are not available</Box> 
                            ) }
                        </Stack>

                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination 
                            count={3}
                            page={1}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className={"brands-logo"}>
                <Container className={"family-brands"}>
                    <Box className={"category-title"}> Our Family Brands </Box>
                    <Stack className={"brand-list"}>
                        <Box className={"review-box"}>
                            <img src={"img/gurme.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"img/seafood.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"img/sweets.webp"} style={{}} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"img/doner.webp"} />
                        </Box>
                    </Stack>
                </Container>
            </div>

            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}> Our Address </Box>
                        <iframe
                            style={{marginTop: "60px"}}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4074383000003!2d90.38973931454994!3d23.750202985000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9f9d6f6d9c1%3A0x5c3a5c0f0d7f8d6!2sDhaka%20City%20College!5e0!3m2!1sen!2sbd!4v1660915272494!5m2!1sen!2sbd"
                            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3"
                             width="1320"
                            height="500"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}