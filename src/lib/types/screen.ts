import { Member } from "./member";
import { Product } from "./product";

// REACT APP STATE
export interface AppRooteState {
    homePage: HomePageState;
}

export interface HomePageState{
   popularDishes: Product[];
   newDieshes: Product[];
   topUsers: Member[];

}

//PRODUCTS PAGE


//ORDERS PAGE