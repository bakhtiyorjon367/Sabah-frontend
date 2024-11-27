export interface CartItem {
    _id: string;
    quantity: number;
    name: string;
    price: number;
    salePrice?: number;
    image: string;
}