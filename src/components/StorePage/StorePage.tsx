import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../Storefront/Storefront";

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
    getProducts(20);
  }, []);
  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-4 grid-rows-1 gap-2">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          );
        })}
      </div>
    </div>
  );
}
