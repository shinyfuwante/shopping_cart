import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import StorePage from "../StorePage/StorePage";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import { useState, MouseEventHandler } from "react";

export interface NavbarProps {
  handleCartClick: MouseEventHandler
}
// define interface of Product
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}
const Storefront = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [cart, setCart] = useState([]);
  const addToCart = (product: Product, amount = 1) => {

  }
  return (
    <>
      <Navbar handleCartClick={()=>setDisplayCart(!displayCart)}></Navbar>
      {displayCart && <Cart></Cart>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/store" element={<StorePage></StorePage>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Storefront;