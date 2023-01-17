import React from "react";
import { Product } from "../Storefront/Storefront";
import { ProductCardProps } from "../StorePage";
const ProductCard = ({ productInfo, onClick }: ProductCardProps) => {
  return (
    <div className="font-quicksand flex max-w-sm flex-col justify-between border-2 border-solid border-sky-500 p-2">
      <div className=" h-80 self-center p-4">
        <img
          src={productInfo.image}
          alt={`${productInfo.title}`}
          className="h-full"
        ></img>
      </div>
      <div>
        <div className="truncate font-bold">{productInfo.title}</div>
        <div className="flex items-center justify-between">
          <div className="w-10 text-left">${productInfo.price.toFixed(2)}</div>
          <button
            className="rounded-full bg-black p-[0.25em] text-slate-50"
            onClick={() => onClick(productInfo)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
