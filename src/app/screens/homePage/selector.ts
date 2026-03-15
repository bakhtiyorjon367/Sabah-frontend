import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


export const retrievePopularProducts = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => (Array.isArray(homePage?.popularProducts) ? homePage.popularProducts : [])
);

export const retrieveNewProducts = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => (Array.isArray(homePage?.newProducts) ? homePage.newProducts : [])
);
export const retrieveRecomendedProducts = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => (Array.isArray(homePage?.recomendedProducts) ? homePage.recomendedProducts : [])
);

export const retrieveTopUsers = createSelector (

    (store: AppRootState)    => store.homePage,
    (homePage) => (Array.isArray(homePage?.topUsers) ? homePage.topUsers : [])
);
