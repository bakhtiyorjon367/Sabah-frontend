import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisiment";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
//REDUX SLICE  & SELECTOR 

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data:Product[]) => dispatch(setPopularDishes(data))
  });

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
   (popularDishes) => ({popularDishes})
  );

export default function HomePage() {
const {setPopularDishes} = actionDispatch(useDispatch());
const {popularDishes} = useSelector(popularDishesRetriever);

  useEffect(() =>{  //Backend server data request -> Data
    const result = [
      {
          "_id": "66a5124a5230cb3458e934e0",
          "productStatus": "PROCESS",
          "productCollection": "DRINK",
          "productName": "Dena",
          "productPrice": 12,
          "productLeftCount": 100,
          "productSize": "NORMAL",
          "productVolume": 1,
          "productImages": [
              "uploads/products/cbd7ea18-7f3c-47c3-a735-a1558f93266b.png"
          ],
          "productView": 0,
          "createdAt": "2024-07-27T15:29:14.137Z",
          "updatedAt": "2024-07-27T15:29:14.137Z",
          "__v": 0
      }
    ];

    // Slice: Data -> Store
    //@ts-ignore
    setPopularDishes(result);
    
  },[]);

  console.log('result  ---->', process.env.REACT_APP_API_URL);

    return <div className={"homepage"}>
      <Statistics/>
      <PopularDishes/>
      <NewDishes/>
      <Advertisement/>
      <ActiveUsers/>
      <Events/>
    </div>;
}
  