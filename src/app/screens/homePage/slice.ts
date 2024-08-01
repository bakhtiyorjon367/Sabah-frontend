import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";




const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    topUsers: [],
};

const homePageSlice  = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        stePopularDishes: (state, action) => {
            state.popularDishes = action.payload;
        },
        steNewDishes: (state, action) => {
            state.newDishes = action.payload;
            },
        steTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
               

});


export const {stePopularDishes, steNewDishes, steTopUsers } =
homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;  