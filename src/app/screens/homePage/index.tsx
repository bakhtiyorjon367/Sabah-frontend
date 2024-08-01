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

const actionDispach = (dispatch: Dispatch) => ({
  setPopularDishes: (data:Product[]) => dispatch(setPopularDishes(data))
  });

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
   (popularDishes) => ({popularDishes})
  );

export default function HomePage() {
const {setPopularDishes} = actionDispach(useDispatch());
const {popularDishes} = useSelector(popularDishesRetriever);

  useEffect(() =>{
  
  },[]);

  
  console.log("popular dishes->", popularDishes);
    return <div className={"homepage"}>
      <Statistics/>
      <PopularDishes/>
      <NewDishes/>
      <Advertisement/>
      <ActiveUsers/>
      <Events/>
    </div>;
  }
  