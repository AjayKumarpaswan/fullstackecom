import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import {toast} from 'react-toastify'
import "../styles/CartStyles.css";
const CartPages = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  //total price

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return `₹${total}`;
    } catch (error) {
      console.log(error);
    }
  };

  //delete items
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment=async()=>{
try {
  setLoading(true)
  const{nonce}=await instance.requestPaymentMethod()
  const{data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,{
  nonce,cart,
  })
setLoading(false)
localStorage.removeItem("cart")
setCart([])
navigate("/dashboard/user-orders")
toast.success('Payment completed successfully')

} catch (error) {
  console.log(error)
  setLoading(false)
}
  }
  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="container">
        <div className="row">
          <div className="col-md-7 p-0 m-0">
            {cart?.map((p) => (
              <div className="row  card flex-row key={p._id}">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>

                <div className="col-md-4">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 50)}</p>
                  <h4>₹{p.price}</h4>
                  </div>
                  
                  <div className="col-md-4 cart-remove-btn">

                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 cart-summary">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total Price:{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}

            <div className="mt-2">
              {
                   !clientToken || !cart?.length?(""):(
                    <>
                    <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button className="btn btn-primary" onClick={handlePayment} disabled={loading||!instance||!auth?.user?.address}>{loading?"processing....":"Make Payment"}</button>
                    </>
                    
                    )
              }
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPages;
