import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
     <title>{title}</title>

      </Helmet>
      <Header />

      <main style={{ minHeight: "80vh" }}>
        <ToastContainer/>
        {children}</main>

      <Footer />
    </div>
  );
};
Layout.defaultProps={
title:'Ecommerce Website -shop now',
description:'mern stack project',
keywords:'mern,react,node,mongodb',
author:'Ajay Kumar'
}
export default Layout;
