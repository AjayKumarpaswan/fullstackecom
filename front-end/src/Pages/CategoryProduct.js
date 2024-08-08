import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate=useNavigate()

  useEffect(()=>{
     if(params?.slug) getProductsByCat()
},[params?.slug])
  //getting productby cat
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
        <div className="container mt-3 category">
      <h4 className="text-center">Category-{category?.name}</h4>
      <h6 className="text-center">{products?.length} result found</h6>
      <div className="row">
       <div className="col-md-9 offset-1">
      <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "22rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top img"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">₹{p.price}</p>
                  <div>
                    <button className="btn btn-info ms-1 " onClick={()=>navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading....." : "Loadmore"}
              </button>
            )}
          </div> 
         </div> */}

      </div>
      </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
