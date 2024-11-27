import React from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import {  setChosenProduct, setAdmin } from "./slice";
import { retrieveChosenProduct, retrieveAdmin } from "./selector";
import { Member } from "../../../lib/types/member";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";


const actionDispatch = (dispatch: Dispatch) => ({
    setAdmin:      (data:Member)  => dispatch(setAdmin(data)),
    setChosenProduct:   (data:Product) => dispatch(setChosenProduct(data)),
   
});

const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
   (chosenProduct) => ({chosenProduct})
  );
const adminRetriever = createSelector(
    retrieveAdmin,
   (admin) => ({admin})
  );



  interface ChosenProductProps{
    onAdd: (item:CartItem) => void;
}
export default function ChosenProduct(props:ChosenProductProps ) {
  const {onAdd} = props;
  const { setAdmin, setChosenProduct} = actionDispatch(useDispatch());     //Slice
  const { chosenProduct} = useSelector(chosenProductRetriever);                //Select
  const { admin } = useSelector(adminRetriever);                    //Select
  //____________________________________________Hooks____________________________________________
  const { productId } = useParams<{productId:string}>();


 /** _________________________________________useEffect_____________________________________*/
 useEffect(() =>{
  const product = new ProductService();
  const member = new MemberService();

  product.getProduct(productId).then((data) => setChosenProduct(data))
                              .catch(err => console.log(err));

  member.getAdmin().then((data) => setAdmin(data))
                        .catch(err => console.log(err));
  
 }, []);

if(!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={imagePath} alt="no-image"/>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>{chosenProduct?.productName}</strong>
            <span className={"resto-name"}>{admin?.memberNick}</span>
            <span className={"resto-name"}>{admin?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productView}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct?.productDesc ? chosenProduct?.productDesc : "No description"}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.salePrice !== 0 ? (chosenProduct?.productPrice ?? 0) - (chosenProduct?.salePrice ?? 0) : (chosenProduct?.productPrice ?? 0)}</span>
            </div>
            <div className={"button-box"}>
              <Button variant="contained" onClick={(e) =>{ onAdd({
                                                        _id:chosenProduct._id,
                                                        name:chosenProduct.productName,
                                                        price:chosenProduct.productPrice,
                                                        salePrice:chosenProduct.salePrice,
                                                        image:chosenProduct.productImages[0],
                                                        quantity:1
                                                    });
                                                    e.stopPropagation();
                                                }} >
                                                  Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
