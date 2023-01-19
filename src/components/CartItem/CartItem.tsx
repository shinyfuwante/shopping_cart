import React from "react";
import { Product } from "../Storefront/Storefront";
import { cartProps } from "../Storefront/Storefront";
import { CartItemProps } from "../Cart/Cart";

const CartItem = ({ product }: CartItemProps) => {
  return (
    <div className="font-quicksand w-90 m-1 bg-white border-4 border-solid border-indigo-700">
      <div className="grid grid-cols-2 h-90">
        <img className="h-40 justify-self-center" src={product.product.image} alt={product.product.title} />
        <div className="flex flex-col">
          <div className="truncate">{product.product.title}</div>
          <div>${product.product.price.toFixed(2)}</div>
          <div>Count: {product.quantity}</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
