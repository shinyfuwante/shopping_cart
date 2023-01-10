import React from "react";
import Navbar from "../Navbar/Navbar";
import catImage from "../../assets/imgs/black_cat_landscape_lim_heng_swee.jpeg";

export default function Homepage() {
  return (
    <div className="flex">
      <div className="flex flex-auto flex-col justify-center items-center p-6 bg-[#dbc4b2]">
        <div className="border-2 rounded p-4 border-[#c24f22] h-[14rem] bg-amber-100">
          <div className="text-center">
            Welcome to the Cat Supply Store!
            Here you can pretend to buy cat supplies for your cat. 
            This storefront lets you browse our items and add them to your cart,
            but you won't be able to check out! (Store is actually run by cats).
            <div className="text-center">
            The owner of the store is a black cat named Molly (mock up on the left) and she's a toothless cat
            with a big personality.
            </div>
          </div>
          <div className="text-center mt-10 text-lg text-neutral-100">
            <a href="/store" className="border-2 rounded p-2 text-2xl border-neutral-900 bg-neutral-900">Cat-alog</a>
          </div>
        </div>
      </div>
      <img
        src={catImage}
        className="h-screen"
        alt="Cat Landscape by Lim Heng Swee"
      ></img>
    </div>
  );
}
