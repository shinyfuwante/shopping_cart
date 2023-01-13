import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// define interface of Product 

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}
export default function StorePage() {
    // declare products as an array of Product[]
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = async (amount: number) => {
    const response: Response = await fetch(
      `https://fakestoreapi.com/products?limit=${amount}`
    );
    const data = await response.json();
    // set the products array to the return value
    setProducts(data);
  };

  useEffect(() => {
    getProducts(5);
  }, []);
  return (
    <>
      {products.map(product => {
       return <div key = {product.id}>{product.title}</div>
    })}
    </>
  );
}
