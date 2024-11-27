import {  useEffect, useState } from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import { setProducts } from "../../screens/productsPage/slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { useDispatch } from "react-redux";
import ProductService from "../../services/ProductService";
import { Dispatch } from "@reduxjs/toolkit";

interface HomeNavbarProps{
    cartItems: CartItem[];
    onAdd: (item:CartItem) => void;
    onRemove: (item:CartItem) => void;
    onDelete: (item:CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
}

/**   Slice  */
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts:   (data:Product[]) => dispatch(setProducts(data)),
});
/**   Select */

export default function HomeNavbar(props: HomeNavbarProps){
    const { cartItems, onAdd,onRemove, onDelete, onDeleteAll, setSignupOpen, setLoginOpen, handleLogoutClick, anchorEl, handleCloseLogout, handleLogoutRequest} = props;
    const {authMember} = useGlobals();
    // eslint-disable-next-line no-unused-vars
    const [searchText, setSearchText] = useState<string>("");
    
    const {setProducts} =actionDispatch(useDispatch());
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page:1,
        limit:8,
        order:"createdAt",
        search:""
    });
//  /** _________________________________________useEffect_____________________________________*/
useEffect(()=>{
    const product = new ProductService();

    product.getProducts(productSearch).then((data) => {
        setProducts(data);
    }).catch(err => console.log(err));

},[productSearch]);

useEffect(() => {
    if(searchText === ""){
        productSearch.search = "";
        setProductSearch({...productSearch});
    }
}, [searchText]);

// Handlers

    return ( 
    <div className="home-navbar"> 
        <Container className="navbar-container">
            <Stack className="menu">
                <Box>
                    <NavLink to="/">
                        <img className="brand-logo" src="/icons/sabah.png" alt="no-image" />
                    </NavLink>
                </Box>
               
                <Stack className="links">
                    <Box className ={"hover-line"}>
                        <NavLink to="/" activeClassName={"underline"} > 
                            Home
                        </NavLink>
                    </Box>
                    <Box className ={"hover-line"}>
                        <NavLink to="/products"  activeClassName={"underline"}> 
                            Products
                        </NavLink>
                    </Box>
                    {authMember ? (
                        <Box className ={"hover-line"}>
                            <NavLink to="/orders" activeClassName={"underline"}>
                                 Orders
                            </NavLink>
                        </Box>
                    ):null}
                    {authMember ? (
                        <Box className ={"hover-line"}>
                            <NavLink to="/member-page" activeClassName={"underline"}> 
                                My Page
                            </NavLink>
                        </Box>
                    ):null}
                    <Box className ={"hover-line"}>
                        <NavLink to="/help"  activeClassName={"underline"}> 
                            Help 
                        </NavLink>
                    </Box>
                    
                    <Basket cartItems={cartItems} 
                            onAdd={onAdd} 
                            onRemove={onRemove} 
                            onDelete={onDelete} 
                            onDeleteAll={onDeleteAll}/>

                    {!authMember ? (
                        <Box>
                            <Button variant="contained" className="login-button"  onClick={() => setLoginOpen(true)}>
                                Login
                            </Button>
                            {" "}
                            {!authMember ? (
                                <Button 
                                    variant="contained" 
                                    className="signup-button" onClick={() => setSignupOpen(true)}>
                                        Signup
                                </Button>
                            ):null}
                    
                        </Box>) : (
                            <img 
                                className="user-avatar"
                                src={authMember?.memberImage 
                                    ? `${serverApi}/${authMember?.memberImage}` 
                                    : "/icons/default-user.svg"}
                                aria-haspopup={"true"}
                                onClick={handleLogoutClick}
                                alt="no-image"/>
                        )}

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Boolean(anchorEl)}
                            onClose={handleCloseLogout}
                            onClick={handleCloseLogout}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleLogoutRequest}>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: 'blue' }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                </Stack>
            </Stack>
        </Container>

    
    </div>
    );
}














// import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import Basket from "./Basket";
// import { CartItem } from "../../../lib/types/search";
// import { useGlobals } from "../../hooks/useGlobals";
// import { serverApi } from "../../../lib/config";
// import { Logout } from "@mui/icons-material";

// interface OtherNavbarProps{
//     cartItems: CartItem[];
//     onAdd: (item:CartItem) => void;
//     onRemove: (item:CartItem) => void;
//     onDelete: (item:CartItem) => void;
//     onDeleteAll: () => void;
//     setSignupOpen: (isOpen: boolean) => void;
//     setLoginOpen: (isOpen: boolean) => void;
//     handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
//     anchorEl: HTMLElement | null;
//     handleCloseLogout: () => void;
//     handleLogoutRequest: () => void;
// };

// export default function OtherNavbar(props:OtherNavbarProps ){
//     const { cartItems, onAdd,onRemove, onDelete, onDeleteAll, setSignupOpen, setLoginOpen,handleLogoutClick, anchorEl, handleCloseLogout, handleLogoutRequest} = props;
//     const {authMember} = useGlobals();

//     return  ( 
//     <div className="other-navbar"> 
//         <Container className="navbar-container">
//             <Stack className="menu">
//                 <Box>
//                     <NavLink to="/">
//                         <img className="brand-logo" src="/icons/burak.svg" alt="no-image" />
//                     </NavLink>
//                 </Box>
//                 <Stack className="links">
//                     <Box className ={"hover-line"}>
//                         <NavLink to="/" > 
//                             Home
//                         </NavLink>
//                     </Box>
//                     <Box className ={"hover-line"}>
//                         <NavLink to="/products"  activeClassName={"underline"}> 
//                             Products
//                         </NavLink>
//                     </Box>
//                     {authMember ? (
//                         <Box className ={"hover-line"}>
//                             <NavLink to="/orders" activeClassName={"underline"}>
//                                  Orders
//                             </NavLink>
//                         </Box>
//                     ):null}
//                     {authMember ? (
//                         <Box className ={"hover-line"}>
//                             <NavLink to="/member-page" activeClassName={"underline"}> 
//                                 My Page
//                             </NavLink>
//                         </Box>
//                     ):null}
//                     <Box className ={"hover-line"}>
//                         <NavLink to="/help"  activeClassName={"underline"}> 
//                             Help 
//                         </NavLink>
//                     </Box>
//                     <Basket cartItems={cartItems} 
//                             onAdd={onAdd} 
//                             onRemove={onRemove} 
//                             onDelete={onDelete} 
//                             onDeleteAll={onDeleteAll}/>
//                     {!authMember ? (
//                         <Box>
//                             <Button variant="contained" className="login-button" onClick={() => setLoginOpen(true)}>
//                                 Login
//                             </Button>
//                             {" "}
//                             {!authMember ? (
//                                 <Button 
//                                     variant="contained" 
//                                     className="signup-button" onClick={() => setSignupOpen(true)}>
//                                         Signup
//                                 </Button>
//                             ):null}
//                         </Box>) : (
//                             <img 
//                                 className="user-avatar"
//                                 src={authMember?.memberImage 
//                                     ? `${serverApi}/${authMember?.memberImage}` 
//                                     : "/icons/default-user.svg"}
//                                 aria-haspopup={"true"}
//                                 onClick={handleLogoutClick}
//                                 alt="no-image"
//                             />
//                         )}

//                         <Menu
//                             anchorEl={anchorEl}
//                             id="account-menu"
//                             open={Boolean(anchorEl)}
//                             onClose={handleCloseLogout}
//                             onClick={handleCloseLogout}
//                             PaperProps={{
//                                 elevation: 0,
//                                 sx: {
//                                     overflow: 'visible',
//                                     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                                     mt: 1.5,
//                                     '& .MuiAvatar-root': {
//                                         width: 32,
//                                         height: 32,
//                                         ml: -0.5,
//                                         mr: 1,
//                                     },
//                                     '&:before': {
//                                         content: '""',
//                                         display: 'block',
//                                         position: 'absolute',
//                                         top: 0,
//                                         right: 14,
//                                         width: 10,
//                                         height: 10,
//                                         bgcolor: 'background.paper',
//                                         transform: 'translateY(-50%) rotate(45deg)',
//                                         zIndex: 0,
//                                     },
//                                 },
//                             }}
//                             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                         >
//                             <MenuItem onClick={handleLogoutRequest}>
//                                 <ListItemIcon >
//                                     <Logout fontSize="small" style={{ color: 'blue' }} />
//                                 </ListItemIcon>
//                                 Logout
//                             </MenuItem>
//                         </Menu>

//                 </Stack>
                
//             </Stack>

//         </Container>

    
//     </div>);
// }
