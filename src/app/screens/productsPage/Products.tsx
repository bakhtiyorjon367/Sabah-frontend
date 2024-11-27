import { ChangeEvent, useEffect, useState } from "react";
import {Box, Button, Container, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon  from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon  from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import   ProductService from "../../services/ProductService";
import { ProductType } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import {  useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
//____________________________________________________________________________________________

/**   Slice  */
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts:   (data:Product[]) => dispatch(setProducts(data)),
});

/**   Select */
const productsRetriever = createSelector(
    retrieveProducts,
   (products) => ({products})
  );

interface ProductsProps{
         onAdd: (item:CartItem) => void;
         productSearch:ProductInquiry;
         setProductSearch:(setProductSearch:ProductInquiry) => void;
}

 export default function Products(props:ProductsProps){//_____________________________________________________________________________________________________________________________  
// //____________________________________________Hooks____________________________________________
    const { onAdd, productSearch, setProductSearch} = props;
    const {setProducts} =actionDispatch(useDispatch());
    const {products} = useSelector(productsRetriever);
    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();


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

    /** _________________________________________HANDLERS_____________________________________*/
    const searchCollectionHandler = (collection: ProductType) =>{
        productSearch.page = 1;
        productSearch.order= "productPrice";
        productSearch.productType = collection;

        setProductSearch({...productSearch});
    };

    const searchAllOrderHandler = (order: string) =>{
        productSearch.page = 1;
        productSearch.order = order;
        productSearch.productType=undefined;

        setProductSearch({...productSearch});
    };
    const searchOrderHandler = (order: string) =>{
        productSearch.page = 1;
        productSearch.order = order;

        setProductSearch({...productSearch});
    };

    const searchProductHandler = () => {
        productSearch.search = searchText;
        setProductSearch({...productSearch});
    };

    const paginationHandler = ((e:ChangeEvent<any>, value:number) => {
        productSearch.page = value;

        setProductSearch({...productSearch});
    });

    const choosenProductHandler = ((id:string) => {
        history.push(`/products/${id}`);
    })



    return (
        <div className={"products"}>
            <div className={"static-frame"}> 
                <Button
                    variant={"text"}
                    color={productSearch.order === "createdAt"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchAllOrderHandler("createdAt")}
                    > All New
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "BATH_BODY"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.BATH_BODY)}
                    > BATH_BODY 
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "MAKEUP"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.MAKEUP)}
                     > Makeup 
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "SKINCARE"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.SKINCARE)}
                    > Skincare 
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "HAIR"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.HAIR)}
                    > Hair 
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "FRAGRANCE"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.FRAGRANCE)}
                    > Fragrance 
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "TOOLS_BRUSHES"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.TOOLS_BRUSHES)}
                    > Tools & Brushes 
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "BEAUTYUNDER20$"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.BEAUTYUNDER20$)}
                    > All Under 20 $
                </Button>
                <Button
                    variant={"text"}
                    color={productSearch.productType === "ACCESSORIES"   ? "primary": "secondary"}
                    className={"order"}
                    onClick={() => searchCollectionHandler(ProductType.ACCESSORIES)}
                   > ACCESSORIES 
                </Button>
            </div>
             {/* ___________________________________________________________________________________________________________________________________*/}
            <Container >
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}> 
                        <Stack className="top-text">               
                                <Box className="search-box"> 
                                    <input
                                        className="search-input"
                                        placeholder="Search"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)} 
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') searchProductHandler();
                                        }}
                                        
                                    />
                                    <Button
                                        className="search-button"
                                        variant='text'
                                        onClick={searchProductHandler}>
                                     <SearchIcon/>
                                    </Button>
                                </Box>
                        </Stack>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button 
                                variant={"contained"}
                                color={productSearch.order === "productPrice" ? "primary": "secondary"}
                                className={"order"}
                                onClick={() => searchOrderHandler("productPrice")}
                            > Price </Button>
                            <Button 
                                variant={"contained"}
                                color={productSearch.order === "productView"  ? "primary": "secondary"}
                                className={"order"}
                                onClick={() => searchOrderHandler("productView")}
                            > Popular </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        
                        <Stack className={"product-wrapper"}>
                           {products.length !== 0 ? (
                            products.map((product:Product) => {
                                
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                const saledProduct = product.salePrice !== 0
                                                        ? "SALE" 
                                                        : ""; 
                                    return (
                                        <Stack key={product._id} className={"product-card"} onClick={() => { choosenProductHandler(product._id) }}
                                        >
                                            <Stack className={"product-img"} sx={{backgroundImage: `url(${imagePath })`}}>
                                                <div className={"product-sale"}> {saledProduct} </div>
                                               
                                                <Button className={"shop-btn"}  onClick={(e) =>{
                                                    onAdd({
                                                        _id:product._id,
                                                        name:product.productName,
                                                        price:product.productPrice,
                                                        salePrice:product.salePrice,
                                                        image:product.productImages[0],
                                                        quantity:1
                                                    });
                                                    e.stopPropagation();
                                                }}>
                                                    <img src="/icons/shopping-cart.svg" alt="noImage"/>
                                                </Button>
                                                   
                                                 <Button className={"view-btn"} >
                                                    <Badge badgeContent={product.productView} color="secondary">
                                                        <RemoveRedEyeIcon
                                                            sx={{color: product.productView === 0 ? "gray" : "white "}} />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <div className={product.salePrice !== 0 ? "sale" : ""}>
                                                        {product.productPrice}$
                                                    </div>
                                                    <div className={product.salePrice !== 0 ? "" : "hide"}>
                                                        {product.salePrice ? product.productPrice-product.salePrice : ''}$
                                                    </div>
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : ( 
                                <Box className={"no-data"}> Products are not available</Box> 
                            ) }
                        </Stack>

                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination 
                            count={products.length !== 0 
                                ? productSearch.page + 1 
                                : productSearch.page  
                            }
                            page={productSearch.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className={"brands-logo"}>
                <Container className={"family-brands"}>
                    <Stack className={"brand-list"}>
                        <Box className={"review-box"}>
                            <a href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=Co5vpAB7qZp_bE7G3vcAPnI69wQTflLCdeZWmyYmCELCQHxABIODNt4cBYJuj54S8KaABl5jHxgPIAQKpAqBIQAP58gk-4AIAqAMByAMIqgSxAk_Q-7KzSY6WJFhp8BNqIAtmsSRhBVlHaavH-s0-fDrHgN7RvLWLSb4Ycx3K6xxO6DgChK2HKNd5I1rjza8uUXs0Q3ZqvKD2ro-YCOgnGbiz_yCAuK4GiMFEGaT1i2nlFVGlqwqlMTfPtXy3zH5Qu5AjH2c3QbO7mMw0y46Coh8LRae_4Qcs1kk-0Y60k1jfPrGm_Cw9d8hnxE_WDuErnYKBnZB9Fh1aXE8780t_QNPmL2CxUNbTF8KUsnvNYFbDHRHcb_ruiAheRUXkUY3LP7KvAHYdR1gpl4CiVlyd_6FUi5C0FJyVnED-WTQR0TMwSysMQW2D70CxFYfxtv80lCQkqC3DtYXTe3A1hTvfQXZuz9_ovSoixAW3Ajan3cuZZeTMDAQLQvzOHVwxnssdb5-nwASiv6Sk3gHgBAGIBdfJifcFoAYCgAfR57g5qAfVyRuoB9m2sQKoB6a-G6gHjs4bqAeT2BuoB-6WsQKoB_6esQKoB6--sQKoB5oGqAfz0RuoB5bYG6gHqpuxAqgHg62xAqgH4L2xAqgH_56xAqgH35-xAqgHyqmxAqgH66WxAqgH6rGxAqgHmbWxAqgHvrexAqgH-MKxAqgH-8KxAtgHAdIIKgiAIRABGB0yAQo6EI_QgICAgASAwICAgKCogAJIvf3BOliJw6DCncuIA7EJAyxQ9YlUHBuACgOYCwHICwHaDBEKCxCg_dXju4301rQBEgIBA6oNAktSyA0B4g0TCLDzoMKdy4gDFbFbDwIdHEcvSOoNEwjvvqHCncuIAxWxWw8CHRxHL0jYEw3QFQGYFgH4FgGAFwGyFwIYAboXAjgBshgJEgKLVBgCIgEA0BgB&ae=1&ase=2&gclid=EAIaIQobChMIn9uhwp3LiAMVsVsPAh0cRy9IEAEYASAAEgLsQ_D_BwE&num=1&cid=CAQSPADpaXnf9ghAt_ntHmX0q89I2P8lWbxPzigEwXdJ54D8aghE5dsMAXYykNasc64taxBwig_jfkuC2wMTwRgB&sig=AOD64_1-hg2mRKN34INVwED6LbTgJL6A8g&client=ca-pub-6083292378501643&rf=5&nx=CLICK_X&ny=CLICK_Y&uap=UACH(platform)&uapv=UACH(platformVersion)&uaa=UACH(architecture)&uam=UACH(model)&uafv=UACH(uaFullVersion)&uab=UACH(bitness)&uaw=UACH(wow64)&uafvl=UACH(fullVersionList)&nb=2&adurl=http://seoulscholars.org%3Fsrc%3Dimage%26kw%3D000006%26gad_source%3D5%26gclid%3DEAIaIQobChMIn9uhwp3LiAMVsVsPAh0cRy9IEAEYASAAEgLsQ_D_BwE" target="_blank" rel="noreferrer" >Advertising</a>
                            <img src={"img/SSI.png"} alt="noImage"/>
                        </Box>
                        <Box className={"review-box"}>
                        <a href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=Co5vpAB7qZp_bE7G3vcAPnI69wQTflLCdeZWmyYmCELCQHxABIODNt4cBYJuj54S8KaABl5jHxgPIAQKpAqBIQAP58gk-4AIAqAMByAMIqgSxAk_Q-7KzSY6WJFhp8BNqIAtmsSRhBVlHaavH-s0-fDrHgN7RvLWLSb4Ycx3K6xxO6DgChK2HKNd5I1rjza8uUXs0Q3ZqvKD2ro-YCOgnGbiz_yCAuK4GiMFEGaT1i2nlFVGlqwqlMTfPtXy3zH5Qu5AjH2c3QbO7mMw0y46Coh8LRae_4Qcs1kk-0Y60k1jfPrGm_Cw9d8hnxE_WDuErnYKBnZB9Fh1aXE8780t_QNPmL2CxUNbTF8KUsnvNYFbDHRHcb_ruiAheRUXkUY3LP7KvAHYdR1gpl4CiVlyd_6FUi5C0FJyVnED-WTQR0TMwSysMQW2D70CxFYfxtv80lCQkqC3DtYXTe3A1hTvfQXZuz9_ovSoixAW3Ajan3cuZZeTMDAQLQvzOHVwxnssdb5-nwASiv6Sk3gHgBAGIBdfJifcFoAYCgAfR57g5qAfVyRuoB9m2sQKoB6a-G6gHjs4bqAeT2BuoB-6WsQKoB_6esQKoB6--sQKoB5oGqAfz0RuoB5bYG6gHqpuxAqgHg62xAqgH4L2xAqgH_56xAqgH35-xAqgHyqmxAqgH66WxAqgH6rGxAqgHmbWxAqgHvrexAqgH-MKxAqgH-8KxAtgHAdIIKgiAIRABGB0yAQo6EI_QgICAgASAwICAgKCogAJIvf3BOliJw6DCncuIA7EJAyxQ9YlUHBuACgOYCwHICwHaDBEKCxCg_dXju4301rQBEgIBA6oNAktSyA0B4g0TCLDzoMKdy4gDFbFbDwIdHEcvSOoNEwjvvqHCncuIAxWxWw8CHRxHL0jYEw3QFQGYFgH4FgGAFwGyFwIYAboXAjgBshgJEgKLVBgCIgEA0BgB&ae=1&ase=2&gclid=EAIaIQobChMIn9uhwp3LiAMVsVsPAh0cRy9IEAEYASAAEgLsQ_D_BwE&num=1&cid=CAQSPADpaXnf9ghAt_ntHmX0q89I2P8lWbxPzigEwXdJ54D8aghE5dsMAXYykNasc64taxBwig_jfkuC2wMTwRgB&sig=AOD64_1-hg2mRKN34INVwED6LbTgJL6A8g&client=ca-pub-6083292378501643&rf=5&nx=CLICK_X&ny=CLICK_Y&uap=UACH(platform)&uapv=UACH(platformVersion)&uaa=UACH(architecture)&uam=UACH(model)&uafv=UACH(uaFullVersion)&uab=UACH(bitness)&uaw=UACH(wow64)&uafvl=UACH(fullVersionList)&nb=2&adurl=http://seoulscholars.org%3Fsrc%3Dimage%26kw%3D000006%26gad_source%3D5%26gclid%3DEAIaIQobChMIn9uhwp3LiAMVsVsPAh0cRy9IEAEYASAAEgLsQ_D_BwE" target="_blank" rel="noreferrer">Advertising</a>
                        <img src={"img/SSI.png"} alt="noImage"/>
                        </Box>
                        
                    </Stack>
                </Container>
            </div>

            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}> Our Address </Box>
                        <iframe
                            title="advertisement"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4074383000003!2d90.38973931454994!3d23.750202985000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9f9d6f6d9c1%3A0x5c3a5c0f0d7f8d6!2sDhaka%20City%20College!5e0!3m2!1sen!2sbd!4v1660915272494!5m2!1sen!2sbd"
                              width="1320"
                            height="500"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}