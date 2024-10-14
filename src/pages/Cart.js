import React, { useState } from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { formatPrice } from "helpers/helpers";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, updateItemQuantity, removeItem, emptyCart, cartTotal } =
    useCart();
  const user = JSON.parse(localStorage.getItem("user"))
  

  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;

  const handleUpdateQuantity = (id, newQuantity) => {
    updateItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleEmptyCart = () => {
    emptyCart();
  };

  const calculateTotalPrice = () => {
    return formatPrice(cartTotal);
  };

  const plus = (id, quantity, stock) => {
    if (quantity < stock) {
      handleUpdateQuantity(id, quantity + 1);
    } else {
      toast("Stock not available");
    }
  };

  const minus = (id, quantity) => {
    if (quantity > 1) {
      handleUpdateQuantity(id, quantity - 1);
    } else {
      handleRemoveItem(id);
    }
  };
  console.log(items);

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />
      <Container>
        <Content>
          {items.length === 0 ? (
            <div className="p-5">
            <p className="text-center ">Empty Checkout</p>
          </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={process.env.REACT_APP_API_URL + "/images/" + item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <h1 className="lg:text-lg text-[13px]">Name : <span className="font-bold">{item.name}</span> </h1>
                      <h3 className="text-gray-500 lg:text-lg text-[13px]">
                        Price : <span>{formatPrice(item.price)}</span>
                      </h3>
                      <p className="flex flex-row items-center text-[13px] lg:text-lg">Colors : <div
                        style={{
                          width: "10px",
                          height: "10px",
                          marginLeft: "4px",
                          backgroundColor: `${item.color}`,
                        }}
                      ></div>
                      </p>
                      
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => minus(item.id, item.quantity)}
                      className="px-2 py-1 lg:px-4 lg:py-2 bg-gray-300 text-gray-700 rounded-l"
                    >
                      -
                    </button>
                    <div className="w-6 lg:w-10 text-center border-t border-b border-gray-300">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => plus(item.id, item.quantity, item.stock)}
                      className="px-2 py-1 lg:px-4 lg:py-2 bg-gray-300 text-gray-700 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-8">
                <div className="flex mx-4">
                  <button
                    onClick={handleEmptyCart}
                    className="bg-red-500 text-white text-[13px] px-3 text-center py-2 lg:px-4 lg:py-2 lg:text-lg rounded"
                  >
                    Empty Cart
                  </button>
                  <Link 
                    to={user ? "/checkout" : "/login"}
                    className="bg-green-700 text-white text-[13px] text-center px-3 py-2 lg:px-4 lg:py-2 lg:text-lg rounded mx-4"
                  >
                    {user ? "Check Out" : "Login"}
                  </Link>
                </div>
                <p className="text-[13px] lg:text-xl font-bold">
                  Total: {calculateTotalPrice()}
                </p>
              </div>
            </>
          )}
        </Content>
      </Container>
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Cart;
