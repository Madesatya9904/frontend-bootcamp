import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { useForm } from "react-hook-form";
import { formatPrice } from "helpers/helpers";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInterseptor from "helpers/Interseptor";
import instance from "helpers/Interseptor";

const Checkout = () => {
  const { register, handleSubmit, getValues } = useForm();
  const { items, emptyCart, cartTotal } = useCart();
  const [loading , setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    address: "",
    postal_code: "",
    country: "",
    payment_method: "Credit Card",
    user_Id: user?.id || null,
    tumbler: [],
  });

  const navigate = useNavigate()
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      ...data
    });
    setCurrentPage(currentPage + 1);
  };

  const goToBackPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleEmptyCart = () => {
    emptyCart();
  };

  const calculateTotalPrice = () => {
    return formatPrice(cartTotal);
  };

  const createOrder = async (datas) => {
    try {
      const response = await instance.post(process.env.REACT_APP_API_URL +"/orders", formData,
        {
          headers: {
            Authorization: user?.token,
            "Content-Type": "application/json"
          }
        }
      );
      setFormData({
        address: "",
        postal_code: "",
        user_Id: user?.id || null,
        country: "",
        payment_method: "",
        tumbler: []
      });
      emptyCart()
      toast.success("Order has been Success", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      })
      navigate("/orders")
    } catch (error) {
      console.log(error);
      toast.error("Create Order Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      })
    }
  };
  useEffect(() => {
    const updateOrderItem = items.map((item) => ({
      id: item.trueid, //uniquie for each product
      quantity: parseInt(item.quantity),
      color: item.color
    }))

    setFormData((prevState) => ({
      ...prevState,
      tumbler: updateOrderItem
    }))
  }, [])

  const renderPage = () => {
    if (currentPage === 1) {
      return (
        <AnimationRevealPage>
        <Header className="mb-4" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-xl md:text-2xl font-bold font-mono mb-4">
            Personal Information
          </h1>
          <div className="w-full max-w-md">
            <div className="flex flex-col mb-4">
              <label
                className="text-black font-semibold font-mono text-base md:text-lg"
                htmlFor="address"
              >
                Your Address
              </label>
              <input
                className="bg-transparent px-4 py-2 border rounded-md placeholder-primary-900"
                type="text"
                name="address"
                placeholder="Enter Your Address"
                {...register("address")}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="text-black font-semibold font-mono text-base md:text-lg"
                htmlFor="country"
              >
                Your City
              </label>
              <input
                className="bg-transparent px-4 py-2 border rounded-md placeholder-primary-900"
                type="text"
                name="country"
                placeholder="Enter Your City"
                {...register("country")}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="text-black font-semibold font-mono text-base md:text-lg"
                htmlFor="postal_code"
              >
                Your Postal Code
              </label>
              <input
                className="bg-transparent px-4 py-2 border rounded-md placeholder-primary-900"
                type="text"
                name="postal_code"
                placeholder="Enter Your Postal Code"
                {...register("postal_code")}
              />
            </div>
          </div>
          <div className="w-full max-w-md mb-8">
            <h1 className="text-lg md:text-xl font-bold font-mono">
              Payment Information
            </h1>
            <div className="flex flex-col my-2">
              <label
                htmlFor="payment_method"
                className="text-black font-mono text-base md:text-lg"
              >
                Payment Method
              </label>
              <select
                className="bg-transparent px-4 py-2 border rounded-md"
                name="payment_method"
                {...register("payment_method")}
              >
                <option value="">Select your payment method</option>
                <option value="Ngutang">Ngutang</option>
                <option value="Cod">Cash On Delivery</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="bg-green-600 px-6 py-3 font-mono text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
        <Footer background="bg-white" />
      </AnimationRevealPage>
      );
    } else if (currentPage === 2) {
      const { address, country, postal_code } = getValues();
      return (
        <AnimationRevealPage>
          <Header className="mb-8" />
          <h1 className="text-center text-xl font-bold font-mono">Checkout</h1>
          <div className="mb-8">
            <h2 className="text-center text-lg font-bold font-mono">
              Personal Information
            </h2>
            <p className="text-center text-base font-mono">
              Address: {address || formData.address}
            </p>
            <p className="text-center text-base font-mono">
              City: {country || formData.country}
            </p>
            <p className="text-center text-base font-mono">
              Postal Code: {postal_code || formData.postal_code}
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            {items.length === 0 ? (
              <div className="p-5">
                <p className="text-center">Your cart is empty.</p>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex md:flex-row flex-col items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                  >
                    <div className="flex items-center w-full md:w-1/4 mb-4 md:mb-0">
                      <img
                        src={
                          process.env.REACT_APP_API_URL + "/images/" + item.images[0]
                        }
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-32 mt-2 w-full md:w-3/4">
                      <p>Name: {item.name}</p>
                      <p>Description: {item.desc}</p>
                      <p>Price: {item.price} / item</p>
                    </div>
                    <div className="w-20 text-center border-t border-b mt-2 border-gray-300">
                      {item.quantity}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-8">
                  <div className="flex">
                    <button
                      onClick={handleEmptyCart}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Empty Cart
                    </button>
                    <button
                      onClick={goToBackPage}
                      className="bg-gray-500 text-white ml-4 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                  </div>
                  <div className="text-lg font-bold">
                    Total Price: {calculateTotalPrice()}
                  </div>
                  <button
                    onClick={createOrder}
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Complete Checkout
                  </button>
                </div>
              </>
            )}
          </div>
          <Footer />
        </AnimationRevealPage>
      );
    }
  };

  return <form onSubmit={handleSubmit(createOrder)} >{renderPage()}</form>;
};

export default Checkout;
