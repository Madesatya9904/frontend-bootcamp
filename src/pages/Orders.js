import React, { useEffect } from "react";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { useOrderContext } from "context/order_context";

const Orders = () => {
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;

  const user = JSON.parse(localStorage.getItem("user"));

  // Panggil fungsi dan state dari order context
  const { orders } = useOrderContext();

  console.log("order", orders);

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <h1 className="text-2xl font-bold mb-8">Order History</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="mb-8 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order ID: {order.id}</h2>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Country:</strong> {order.country}
                </p>
                <p>
                  <strong>Postal Code:</strong> {order.postal_code}
                </p>
                <p>
                  <strong>Payment Method:</strong> {order.payment_method}
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">Order Items:</h3>
                {order.order_items.length > 0 ? (
                  order.order_items.map((item) => (
                    <div key={item.id} className="bg-gray-100 p-4 mb-4 rounded-lg md:flex md:flex-row flex flex-col gap-6 items-center md:justify-center">
                      <img
                        src={process.env.REACT_APP_API_URL + "/images/" + item.tumbler.images[0]}
                        alt={item.tumbler.name}
                        className="w-32 h-32 object-cover mt-2 rounded-lg"
                      />
                      <div className="flex flex-col md:grid md:grid-cols-2 md:items-center gap-4">
                        <div className="md:col-span-1">
                          <p>
                            <strong className="mr-2">Product Name:</strong>{item.tumbler.name}
                          </p>
                          <p>
                            <strong className="mr-2">Quantity:</strong>{item.quantity}
                          </p>
                        </div>

                        <div className="lg:col-span-1">
                          <p className="flex items-center">
                            <strong className="mr-2">Color:</strong><div style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: `${item.color}`,
                        }}></div>
                          </p>
                          <p>
                            <strong className="mr-2">Price:</strong>{item.tumbler.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}

                
              </div>
            ))
            
          )}
          {/* <p className="text-lg font-bold mt-4">
                  Total: {orders.order_items.reduce((total, item) => total + item.tumbler.price * item.quantity, 0)}
                </p> */}
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Orders;
