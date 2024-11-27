import {   ProductCollection, ProductStatus, ProductType } from "../enums/product.enum";

export interface Product {
    _id: string;
    productStatus:    ProductStatus;
    productType?:ProductType;
    productName:      string;
    productPrice:     number;
    salePrice?:       number;
    productGender: string;
    productCollection:ProductCollection;
    productDesc?:     string;
    productImages:    string[];
    productView:      number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry{
    order: string;
    page:  number;
    limit: number;
    productType?:ProductType;
    productStatus?:ProductStatus;
    search?:string;

}

