import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import StorePage from "../StorePage/StorePage";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import { useState, MouseEventHandler } from "react";
import routes from "../routes.json";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNkCXFDa1TcImURQetGpps-BtdRnsG-cU",
  authDomain: "fakestore-shoppingcart.firebaseapp.com",
  projectId: "fakestore-shoppingcart",
  storageBucket: "fakestore-shoppingcart.appspot.com",
  messagingSenderId: "435433093701",
  databaseURL: "https://fakestore-shoppingcart-default-rtdb.firebaseio.com/",
  appId: "1:435433093701:web:3308f160161b5630fd012c",
};

export interface NavbarProps {
  handleCartClick: MouseEventHandler;
  loginFn: (params: any) => void;
  logoutFn: (params: any) => void;
  loggedIn: boolean;
}
export interface cartProps {
  cart: Array<cartedProduct>;
  handleAddCart: (params: any) => void;
  handleSubtractCart: (params: any) => void;
}
export interface StorePageProps {
  handleAddCart: (params: any) => void;
  handleSubtractCart: (params: any) => void;
}
export interface cartModify {
  handleAddCart: (params: any) => void;
  handleSubtractCart: (params: any) => void;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}
export interface cartedProduct {
  product: Product;
  quantity: number;
}
const Storefront = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const provider = new GoogleAuthProvider();

  // sign in with "log-in" button
  const auth = getAuth(app);
  let result;
  const signIn = async () => {
    result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user !== null) {
      console.log(user);
      setLoggedIn(true);
    }
  };

  function writeToCart(userId: any) {
    set(ref(database, "users/" + userId), {
      user_cart: cart,
    });
  }

  const [displayCart, setDisplayCart] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState<cartedProduct[]>([]);

  const addToCart = (product: Product, amount = 1) => {
    const productToAdd = { product: product, quantity: amount };
    const oldProduct = cart.findIndex(
      (cartedItem) => cartedItem.product === product
    );
    if (oldProduct === -1) {
      setCart([...cart, productToAdd]);
    } else {
      const newCart = [...cart];
      const productToUpdate = newCart[oldProduct];
      productToUpdate.quantity += amount;
      setCart(newCart);
    }
    // writeToCart(userId);
  };

  const subtractFromCart = (product: Product, amount = 1) => {
    const oldProduct = cart.findIndex(
      (cartedItem) => cartedItem.product === product
    );
    if (oldProduct > -1) {
      let newCart = [...cart];
      const productToUpdate = newCart[oldProduct];
      productToUpdate.quantity -= amount;
      if (productToUpdate.quantity === 0) {
        newCart = newCart.filter((product) => product !== productToUpdate);
      }
      setCart(newCart);
    }
  };

  return (
    <>
      <HashRouter>
        <Navbar
          handleCartClick={() => setDisplayCart(!displayCart)}
          loginFn={() => signIn()}
          logoutFn={() => {
            signOut(auth);
            setLoggedIn(false);
          }}
          loggedIn={loggedIn}
        ></Navbar>
        {displayCart && (
          <Cart
            cart={cart}
            handleAddCart={addToCart}
            handleSubtractCart={subtractFromCart}
          ></Cart>
        )}

        <Routes>
          <Route path={routes.HOME} element={<HomePage></HomePage>} />
          <Route
            path={routes.STORE}
            element={
              <StorePage
                handleAddCart={addToCart}
                handleSubtractCart={subtractFromCart}
              ></StorePage>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
};

export default Storefront;
