import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Advertisement from "./Advertisiment";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setRecomendedProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import {  ProductStatus } from "../../../lib/enums/product.enum";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

//REDUX SLICE   (writing data to redux)
const actionDispatch = (dispatch: Dispatch) => ({
        setPopularProducts:   (data:Product[]) => dispatch(setPopularProducts(data)),
        setNewProducts: (data:Product[]) => dispatch(setNewProducts(data)),
        setRecomendedProducts: (data:Product[]) => dispatch(setRecomendedProducts(data)),
        setTopUsers:  (data:Member[])  => dispatch(setTopUsers(data)),
});



export default function HomePage() {
  
const {setPopularProducts, setNewProducts, setRecomendedProducts, setTopUsers } = actionDispatch(useDispatch());


  useEffect(() =>{  //Backend server data request -> Data
   
    const product = new ProductService();

    product.getProducts({
      page:1,
      limit:5,
      order:"productView",
      // productType: ProductType.FRAGRANCE
    }).then((data) => {
      setPopularProducts(data);
    }).catch((err)=>{
      console.log(err);
    });

    product.getProducts({
      page:1,
      limit:8,
      order:"updatedAt",
      productStatus:ProductStatus.RECOMEND
    }).then((data) => {
      const recomendProducts = data.filter((product) => product.productStatus === ProductStatus.RECOMEND);
      setRecomendedProducts(recomendProducts);
    }).catch((err)=>{
      console.log(err);
    });

    product.getProducts({
      page:1,
      limit:5,
      order:"createdAt",
    }).then((data) => {
      setNewProducts(data);
    }).catch((err)=>{
      console.log(err);
    });

    const member = new MemberService();
    member.getTopUsers()
          .then((data) => { setTopUsers(data)})
          .catch((err) => { console.log(err);
    });
  },[setNewProducts, setPopularProducts,setTopUsers]);

    return <div className={"homepage"}>
      {/* <Statistics /> */}
      <Events/>
      <PopularProducts/>
      <NewProducts/>
      <Advertisement/>
      <ActiveUsers/>
      
    </div>;
}
  