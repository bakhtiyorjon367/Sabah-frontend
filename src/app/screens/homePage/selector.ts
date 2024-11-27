import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


export const retrievePopularProducts = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => homePage.popularProducts
);

export const retrieveNewProducts = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => homePage.newProducts
);
export const retrieveRecomendedProducts = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => homePage.recomendedProducts
);

export const retrieveTopUsers = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => homePage.topUsers
);
