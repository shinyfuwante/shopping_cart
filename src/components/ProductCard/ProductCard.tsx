import React from 'react'
import { Product } from '../StorePage'
const ProductCard = ({title, price, image}: Product) => {
  return (
    <div>
        <img src={image} alt ={`${title}`}></img>
        <div>{title}</div>
        <div>{price}</div>
    </div>
  )
}

export default ProductCard;