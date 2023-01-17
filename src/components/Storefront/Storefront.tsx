import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import StorePage from "../StorePage/StorePage";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import { useState, MouseEventHandler } from "react";

export interface NavbarProps {
  handleCartClick: MouseEventHandler
}
export interface cartProps {
  cart: Array<cartedProduct>;
}
export interface StorePageProps {
  handleAddCart: (params: any) => void
}
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}
export interface cartedProduct {
  product: Product;
  quantity: number
}
const Storefront = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [cart, setCart] = useState<cartedProduct[]>([]);
  const addToCart = (product: Product, amount = 1) => {
    const productToAdd = {product: product, quantity: amount}
    const oldProduct = cart.findIndex(cartedItem => cartedItem.product === product)
    if (oldProduct === -1) {
      setCart([...cart, productToAdd]);
    } else {
      const newCart = [...cart];
      const productToUpdate = newCart[oldProduct];
      productToUpdate.quantity += amount;
      setCart(newCart);
    }
  }
  return (
    <>
      <Navbar handleCartClick={()=>setDisplayCart(!displayCart)}></Navbar>
      {displayCart && <Cart cart={cart}></Cart>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/store" element={<StorePage handleAddCart={addToCart}></StorePage>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Storefront;