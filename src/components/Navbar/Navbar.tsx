import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-between p-3 text-lg bg-indigo-500 text-indigo-50">
      <a href="/">Homepage</a>
      <a href="/store">Storefront</a>
      <div>Cart</div>
    </div>
  );
}
