import { useState } from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import   ChosenProduct from './ChosenProduct';
import   Products from './Products';
import { CartItem } from '../../../lib/types/search';
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import "../../../css/product.css";
import "../../../css/home.css";

/**   Slice  */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts:   (data:Product[]) => dispatch(setProducts(data)),
});

interface ProductsPageProps{
  onAdd: (item:CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
    const { onAdd } = props;
    const products = useRouteMatch();
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
      page:1,
      limit:16,
      order:"createdAt",
      search:""
    });

    return <div className={"products-page"}>
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd}/>
        </Route>
         <Route path={`${products.path}`}>
          <Products onAdd={onAdd}
                    productSearch={productSearch}
                    setProductSearch={setProductSearch}/>
        </Route>
      </Switch>
    </div>;
  }