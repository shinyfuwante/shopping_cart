import React from 'react'
import { Product } from '../StorePage'
const ProductCard = ({title, price, image}: Product) => {
  return (
    <div className="flex flex-col justify-center items-center border-solid border-2 border-sky-500 max-w-sm">
        <img src={image} alt ={`${title}`} className="max-w-xs"></img>
        <div>{title}</div>
        <div>${price}</div>
    </div>
  )
}

export default ProductCard;