import React from "react";
import { Product } from "../Storefront/Storefront";
const ProductCard = ({ title, price, image }: Product) => {
  return (
    <div className="font-quicksand flex max-w-sm flex-col justify-between border-2 border-solid border-sky-500 p-2">
      <div className=" h-80 self-center p-4">
        <img src={image} alt={`${title}`} className="h-full"></img>
      </div>
      <div>
        <div className="truncate font-bold">{title}</div>
        <div className="flex justify-between items-center">
          <div className="w-10 text-left">${price.toFixed(2)}</div>
          <button className="rounded-full bg-black p-[0.25em] text-slate-50">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
