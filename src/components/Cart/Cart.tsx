import React from "react";
import { cartProps } from "../Storefront/Storefront";
import CartItem from "../CartItem/CartItem";
import { cartedProduct } from "../Storefront/Storefront";

export interface CartItemProps {
  product: cartedProduct;
  add: (params: any) => void;
  subtract: (params: any) => void;
}
const Cart = ({ cart, handleAddCart, handleSubtractCart }: cartProps) => {
  return (
    <div className="font-quicksand fixed inset-y-0 right-0 z-10 flex h-full w-96 flex-col gap-2 bg-indigo-300">
      <div className="bg-indigo-200 p-4 text-xl font-bold border-b-black border-2"> Your Cart</div>
      <div className="p-2 overflow-auto">
        <div>
          {cart.map((item) => {
            return <CartItem key={item.product.id} product={item} add={handleAddCart} subtract={handleSubtractCart}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
