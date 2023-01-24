import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import StorePage from "../StorePage/StorePage";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import { useState, MouseEventHandler } from "react";
import routes from "../routes.json";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

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
  user: User | null | undefined;
}
export interface cartProps {
  cart: Array<cartedProduct>;
  handleAddCart: (params: any) => void;
  handleSubtractCart: (params: any) => void;
  closeCart: () => void;
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
  const [user] = useAuthState(auth);
  let result: UserCredential;

  const signIn = async () => {
    try {
      result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  function writeToCart(uid: String) {
    set(ref(database, "users/" + uid), {
      user_cart: cart,
    });
  }

  function readCart(uid: string) {
    const dbRef = ref(database);
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedCart = data.user_cart;
        console.log(loadedCart);
        setCart(loadedCart);
      } else {
        console.log("No data available");
      }
    });
  }

  const [displayCart, setDisplayCart] = useState(false);

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
    if (user !== null && user !== undefined) {
      writeToCart(user.uid);
    }
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
    if (user !== null && user !== undefined) {
      writeToCart(user.uid);
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
          }}
          user={user}
        ></Navbar>
        {displayCart && (
          <Cart
            cart={cart}
            handleAddCart={addToCart}
            handleSubtractCart={subtractFromCart}
            closeCart={() => setDisplayCart(false)}
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
