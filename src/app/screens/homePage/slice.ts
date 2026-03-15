import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    popularProducts: [],
    newProducts: [],
    recomendedProducts:[],
    topUsers: []
};

const homePageSlice  = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setPopularProducts: (state, action) => {
            state.popularProducts = Array.isArray(action.payload) ? action.payload : [];
        },
        setNewProducts: (state, action) => {
            state.newProducts = Array.isArray(action.payload) ? action.payload : [];
            },
        setRecomendedProducts: (state, action) => {
                state.recomendedProducts = Array.isArray(action.payload) ? action.payload : [];
                },
        setTopUsers: (state, action) => {
            state.topUsers = Array.isArray(action.payload) ? action.payload : [];
        },
    },
               

});


export const {setPopularProducts, setNewProducts, setRecomendedProducts, setTopUsers } =
homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;  