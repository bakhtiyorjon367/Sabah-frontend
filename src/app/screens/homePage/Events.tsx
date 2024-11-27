import { Box, Button, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {  Mousewheel, Navigation, Pagination } from "swiper";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useHistory } from "react-router-dom";
import {  retrieveRecomendedProducts } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

//REDUX SELECTOR 
const recomendedProductsRetriever = createSelector(
  retrieveRecomendedProducts,
 (recomendedProducts) => ({recomendedProducts})
);

SwiperCore.use([ Navigation, Pagination,]);

export default function Events() {
  const history = useHistory();
  const {recomendedProducts} = useSelector(recomendedProductsRetriever);

  const choosenProductHandler = ((id:string) => {
    history.push(`/products/${id}`);
})

  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"} >
        <Swiper
          className={"events-info swiper-wrapper"}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          direction={'horizontal'}
          slidesPerView={3}
          spaceBetween={5}
          mousewheel={false}
          modules={[ Mousewheel, Pagination]}

        >
          {recomendedProducts.length !== 0 ? (
                recomendedProducts.map((product:Product) => {
                     const imagePath = `${serverApi}/${product.productImages[0]}`;
              return (
              <SwiperSlide key={product._id} className={"events-info-frame"} >
                <Box className={"events-img"}>
                  <img src={imagePath} alt="no-image" />
                  <Box className={"events-desc"} >
                  <Box className={"events-bott"}>
                    <Box className={"bott-left"}>
                      <div className={"event-title-speaker"}>
                        <strong >{product.productName}</strong>
                        <p className={"text-desc"}> {product.productDesc} </p>
                      </div>
                    </Box>
                    <Button variant="outlined" sx={{marginLeft:"14px", marginTop:'30px',
                                  fontWeight:"bold", 
                                  fontSize:"26px", 
                                  letterSpacing:"-2px", 
                                  fontFamily:"revert"}}
                                  onClick={()=> {
                                    choosenProductHandler(product._id)}}> 
                          SHOP NOW <ArrowRightIcon/>
                      </Button>
                  </Box>
                  
                 </Box>
                </Box>
               
                
                
              </SwiperSlide>
              );
          })
        ):(
          <Box className="no-data" sx={{justifyContent:'center', textAlign:'center'}}>No recomended Products </Box>
          )}
        </Swiper>

      </Stack>
    </div>
  );
}
