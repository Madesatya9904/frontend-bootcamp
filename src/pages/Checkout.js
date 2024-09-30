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
          <div className="items-center flex justify-center flex-col">
            <h1 className="text-center text-[1.25rem] md:text-[1.5rem] font-bold font-mono">
              Data Pribadi
            </h1>
            <div className="">
              <div className="flex flex-col">
                <label className="text-black font-semibold font-mono text-[1rem] md:text-[1.10rem]" htmlFor="address">
                  Masukan Tempat Tinggal Anda
                </label>
                <input
                  className="bg-transparent px-[0.5rem] py-[0.25rem] placeholder-primary-900"
                  type="text"
                  name="address"
                  placeholder="Input Your Address"
                  {...register("address")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-semibold font-mono text-[1rem] md:text-[1.10rem]" htmlFor="country">
                  Masukan Kota Anda
                </label>
                <input
                  className="bg-transparent px-[0.5rem] py-[0.25rem] placeholder-primary-900"
                  type="text"
                  name="country"
                  placeholder="Input your country"
                  {...register("country")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-semibold font-mono text-[1rem] md:text-[1.10rem]" htmlFor="postal_code">
                  Masukan Post Code Anda
                </label>
                <input
                  className="bg-transparent px-[0.5rem] py-[0.25rem] placeholder-primary-900"
                  type="text"
                  name="postal_code"
                  placeholder="Input your postalcode"
                  {...register("postal_code")}
                />
              </div>
            </div>
            <div className="">
              <h1 className="text-[1rem] md:text-[1.25rem] font-bold font-mono">
                Informasi Pembayaran
              </h1>
              <div className="flex flex-col my-1">
                <label htmlFor="card_type" className="text-black font-mono text-[1rem] md:text-[1.10rem]">
                  Metode Pembayaran
                </label>
                <select className="bg-transparent px-[0.5rem] py-[0.25rem]" name="payment_method" {...register("payment_method")}>
                  <option value="">Pilihan anda</option>
                  <option value="Ngutang">Ngutang</option>
                  <option value="Cod">Cash On Delivery</option>
                  <option value="card">Kartu Kredit/Debit</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-green-600 px-[0.75rem] py-[0.5rem] font-mono text-white rounded-lg"
              >
                Anda Yakin..
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
          <h1 className="text-center text-[20px] font-bold font-mono">
            Checkout Page
          </h1>
          <div>
            <h2 className="text-center text-[18px] font-bold font-mono">
              Informasi Pribadi
            </h2>
            <p className="text-center text-[16px] font-mono">
              Alamat: {address || formData.address}
            </p>
            <p className="text-center text-[16px] font-mono">
              Negara: {country || formData.country}
            </p>
            <p className="text-center text-[16px] font-mono">
              Postal Code: {postal_code || formData.postal_code}
            </p>
          </div>
          <div>
            {items.length === 0 ? (
              <p>Kosong Bang</p>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex md:flex md:flex-row flex-col items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={ process.env.REACT_APP_API_URL+"/images/" + item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover mr-4"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-32 mt-2">
                      <p>Name : {item.name}</p>
                      <p>Deskripso : {item.desc}</p>
                      <p>Harga : {item.price} Per Item</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 text-center border-t border-b mt-2 border-gray-300">{item.quantity}</div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-8">
                  <div className="flex mx-4">
                    <button
                      onClick={handleEmptyCart}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Empty Cart
                    </button>
                    <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded mx-4">
                      Check Out
                    </button>
                  </div>
                  <p className="text-xl font-bold">
                    Total: {calculateTotalPrice()}
                  </p>
                </div>
              </>
            )}
          </div>
          <button onClick={goToBackPage}>Back</button>
          <Footer background="bg-white" />
        </AnimationRevealPage>
      );
    }
  };

  return <form onSubmit={handleSubmit(createOrder)} >{renderPage()}</form>;
};

export default Checkout;
