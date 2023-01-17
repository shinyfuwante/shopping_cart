import React from "react";
import { Product } from "../Storefront/Storefront";
import { cartProps } from "../Storefront/Storefront";
import CartItem from "../CartItem/CartItem";

export interface CartItemProps {
    product: Product;
}
const Cart = ({ cart }: cartProps) => {
  return (
    <div className="font-quicksand fixed inset-y-0 right-0 z-10 h-full w-96 gap-2 bg-indigo-300 p-4">
      {cart.map((item) => {
        return <CartItem key={item.id} product={item}/>
      })}
    </div>
  );
};

export default Cart;
