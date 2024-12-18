import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";


class ProductService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }
    
    public async getProducts(input: ProductInquiry):Promise<Product[]>{
        try{
            let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
            if(input.productType) url += `&productType=${input.productType}`;
            if(input.search) url += `&search=${input.search}`;
            if(input.productStatus) url+=`&productStatus=${input.productStatus}`;

            const result = await axios.get(url);
            console.log("getProducts", result);

            return result.data;

        }catch(err){
            console.log("Error, getProduct ",err);
            throw err;
        }
    }//______________________________________________________________


    public async getProduct(productId:string):Promise<Product>{
        try{
            let url = `${this.path}/product/${productId}`;
          
            const result = await axios.get(url,{withCredentials:true});
            console.log("getProduct", result);

            return result.data;
        }catch(err){
            console.log("Error, getProduct ",err);
            throw err;
        }
    }//______________________________________________________________


}//_________________________________________________________________________
export default ProductService;  // default export