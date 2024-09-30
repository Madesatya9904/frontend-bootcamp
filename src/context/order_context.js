import axios from "axios";
import instance from "helpers/Interseptor";
import AxiosInterseptor from "helpers/Interseptor";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    postal_code: "",
    country: "",
    payment_method: "Credit Card",
    user_Id: null,
    tumbler: [],
  });

  const user = JSON.parse(localStorage.getItem("user"))

  if (!user || !user?.token) {
  console.log("Token tidak ditemukan");
} else {
  console.log("Token ditemukan:", user?.token);
}
  // TODO
  const getOrderId = async () => {
    if (user) {
      try {
        const respone = await instance.get(process.env.REACT_APP_API_URL + "/orders",
          {
            headers : {
              Authorization: user?.token
            }
          }
        )/// pake env
        setOrders(respone.data)
        
      } catch(err) {
        console.log(err)
      }
    }

    // console.log(respone)
  }
  useEffect(() => {
    getOrderId()
  },[])
  

  const getOrdersByUserId = async (id) => {
   try {
    if (user) {
      const respone = await instance.get(process.env.REACT_APP_API_URL + `/orders/${id}` ,
        {
          headers : {
            Authorization: user?.token
          }
        }
      )
      setOrder(respone.data)

    }
  } catch (error) {
    console.log(error)
   }
  };

  // Buat fungsi create order disni

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrdersByUserId,
        setOrders,
        order,
        formData,
        setFormData,
        // panggil fungsinya disini
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrdersContext);
};
