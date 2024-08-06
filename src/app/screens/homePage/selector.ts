import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";


export const retrievePopularDishes = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => homePage.popularDishes
);

export const retrieveNewDishes = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => homePage.newDishes
);

export const retrieveTopUsers = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => homePage.topUsers
);
