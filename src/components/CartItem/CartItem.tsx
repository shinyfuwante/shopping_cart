import React from "react";
import { Product } from "../Storefront/Storefront";
import { cartProps } from "../Storefront/Storefront";
import { CartItemProps } from "../Cart/Cart";

const CartItem = ({ product, add, subtract }: CartItemProps) => {
  const unitPrice = product.product.price;
  return (
    <div className="font-quicksand w-90 m-1 border-4 border-solid border-indigo-700 bg-white">
      <div className="h-90 grid grid-cols-2">
        <img
          className="h-40 justify-self-center p-2"
          src={product.product.image}
          alt={product.product.title}
        />
        <div className="flex flex-col">
          <div className="truncate">{product.product.title}</div>
          <div className="font-bold">${unitPrice.toFixed(2)}</div>
          <div className="flex gap-4 justify-middle">
            <button className="rounded-full w-10 bg-black p-[0.25em] text-slate-50" onClick={()=>subtract(product.product)}>-</button>
            <div>Count: {product.quantity}</div>
            <button className="rounded-full w-10  bg-black p-[0.25em] text-slate-50" onClick={()=>add(product.product)}>+</button>
          </div>
          <div>Subtotal: ${(unitPrice*product.quantity).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
