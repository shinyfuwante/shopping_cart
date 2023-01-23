import React from "react";
import { cartProps } from "../Storefront/Storefront";
import CartItem from "../CartItem/CartItem";
import { cartedProduct } from "../Storefront/Storefront";

export interface CartItemProps {
  product: cartedProduct;
  add: (params: any) => void;
  subtract: (params: any) => void;
}
const Cart = ({
  cart,
  handleAddCart,
  handleSubtractCart,
  closeCart,
}: cartProps) => {
  return (
    <div className="font-quicksand fixed inset-y-0 right-0 z-10 flex h-full w-96 flex-col gap-2 bg-indigo-300">
      <div className="border-2 border-b-black bg-indigo-200 p-4 text-xl font-bold">
        {" "}
        Your Cart
      </div>
      <div className="overflow-auto p-2">
        <div>
          {cart.map((item) => {
            if (item.quantity > 0)
              return (
                <CartItem
                  key={item.product.id}
                  product={item}
                  add={handleAddCart}
                  subtract={handleSubtractCart}
                />
              );
          })}
        </div>
      </div>
      {cart.length > 0 && (
        <div>
          Total: $
          {cart
            .reduce((a, b) => a + b.product.price * b.quantity, 0)
            .toFixed(2)}
        </div>
      )}
      <button className="border-2 bg-indigo-200 font-bold" onClick={closeCart}>
        Close Cart
      </button>
    </div>
  );
};

export default Cart;
