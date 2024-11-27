import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from  "@mui/icons-material/DeleteForever"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item:CartItem) => void;
  onRemove: (item:CartItem) => void;
  onDelete: (item:CartItem) => void;
  onDeleteAll: () => void;
}
export default function Basket(props : BasketProps ) {
  const { cartItems, onAdd,onRemove, onDelete, onDeleteAll } = props;
  const {authMember, setOrderBuilder} = useGlobals() ;
  const history = useHistory();
  const itemPrice:number = cartItems.reduce((a:number, c:CartItem) => {
    const salePrice = c.salePrice || 0;
    const discountedPrice = c.price - salePrice;
    return a + discountedPrice * c.quantity;
  }, 0);
  const shippingCost = itemPrice < 100 ? 5 : 0;
  const totalPrice =( itemPrice+shippingCost).toFixed();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const proceedOrderHandler = async() => {
    try{
      handleClose();
      if(!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    }catch(err){
      console.log(err);
      sweetErrorHandling(err).then();
    }
  }

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
       
        style={{background:'gray'}}
      >
        <Badge badgeContent={cartItems.length} color="secondary"  style={{color:'black'}}>

          <img src={"/icons/shopping-cart.svg"}  style={{color:'black'}} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 
            ?  (<div>Cart is empty!</div> )
            :  (
              <Stack flexDirection={"row"}> <div>Cart Products!</div>
                      <DeleteForeverIcon  
                      
                                  sx={{ml:"5px", cursor: "pointer"}}
                                  color={"primary"}
                                  onClick={() =>  onDeleteAll()} 
                        />  
                </Stack>
            
              )}
            </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item:CartItem) => {
                const imagePath = `${serverApi}/${item.image}`
                const salePrice = item.salePrice || 0;
                const originalPrice = item.price;
                const discountedPrice = originalPrice - salePrice;
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <div className={"cancel-btn"}>
                      <CancelIcon color={"primary"} onClick={() =>  onDelete(item)}/>
                    </div>
                    <img src={imagePath} className={"product-img"} />
                    <span className={"product-name"}>{item.name}</span>
                    {salePrice > 0 ? (
                      <p className={"product-price"}>
                        <span style={{ color: 'red' }}>${discountedPrice} x {item.quantity}</span>
                      </p>
                    ) : (
                      <p className={"product-price"} style={{ color: 'black' }}>${originalPrice} x {item.quantity}</p>
                    )}
                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button className="remove" onClick={() =>  onRemove(item)}>-</button>{" "}
                        <button className="add" onClick={() =>  onAdd(item)}>+</button>
                      </div>
                    </Box>
                  </Box>
                )
              })}
              
            </Box>
          </Box>
          {cartItems.length !== 0 ?(
            <Box className={"basket-order"}>
            <span className={"price"}>Total: ${totalPrice} ({itemPrice} + {shippingCost})</span>
            <Button onClick={proceedOrderHandler} startIcon={<ShoppingCartIcon/>} variant={"contained"} >
              Order
            </Button>
          </Box>
          ) : (
            ""
          )}
          
        </Stack>
      </Menu>
    </Box>
  );
}
