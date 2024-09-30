import axios from "axios";
import instance from "helpers/Interseptor";
import AxiosInterseptor from "helpers/Interseptor";
import React, { useContext, useEffect, useState } from "react";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({})
  const fetchProducts = async () => {
    try {
      const response = await instance.get(
        process.env.REACT_APP_API_URL + "/products"
      );

      // Memotong array hasil response menjadi 14 data
      const limitedData = response.data.slice(0, 14);

      // Menetapkan data yang telah dipotong ke state
      setProducts(limitedData);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductById = async (id) => {
    try {

      const response = await instance.get(
        process.env.REACT_APP_API_URL + `/products/${id}`
      );

      setProduct(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("test", product)
  
  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
        setProduct,
        getProductById
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
