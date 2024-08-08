import React,{useEffect,useState} from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import Layout from "./../../components/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment"
const Orders = () => {
  const[orders,setOrders]=useState([])
  const[auth,setAuth]=useAuth()

  //get orders

  const getOrders=async()=>{
   try {
    const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
    setOrders(data)
   } catch (error) {
     console.log(error)
   }
  }

  //useEffect hook
  useEffect(()=>{
  if(auth?.token) getOrders()
  },[auth?.token])
  return (
    <Layout title={'Your Orders'}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {
            orders?.map((o,i)=>{
            return (
              <div className="border shadow">
              <table className="table">
                    <thead>
                       <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                        
                       </tr>

                    </thead>
                <tbody>

                  <tr>
                    <td>{i+1}</td>
                    <td>{o?.status}</td>
                    <td>{o?.buyer?.name}</td>
                    {/* <th>{o?.buyer?.name}</th> */}
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment.success?"Success":"Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
              {o?.products?.map((p,i) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>

                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 50)}</p>
                  <h4>₹{p.price}</h4>
                  
                </div>
              </div>
            ))}
                   
              </div>
              </div>
              
              )
            })
            
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
