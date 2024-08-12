import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


export const retrievePausedOrders = createSelector (

    (store: AppRootState)    => store.ordersPage,
    (OrdersPage) => OrdersPage.pausedOrders
);

export const retrieveProcessOrders = createSelector (

    (store: AppRootState)    => store.ordersPage,
    (OrdersPage) => OrdersPage.processOrders
);

export const FinishedOrders = createSelector (

    (store: AppRootState)    => store.ordersPage,
    (OrdersPage) => OrdersPage.finishedOrders
);
