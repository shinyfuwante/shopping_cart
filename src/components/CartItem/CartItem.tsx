import React from "react";
import { Product } from "../Storefront/Storefront";
import { cartProps } from "../Storefront/Storefront";
import { CartItemProps } from "../Cart/Cart";

const CartItem = ({product}: CartItemProps) => {
  return (
    <div className="font-quicksand w-90 h-auto">
      CartItem
    </div>
  );
};

export default CartItem;
