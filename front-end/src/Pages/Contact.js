import React from "react";
import Layout from "./../components/Layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={'Contact -Ecommerce'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call any time we 24x7
            available
          </p>
          <p className="mt-3">
            <BiMailSend/>
            :www.arvindkumar20102000@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall/>
            :+91 8127459097
          </p>
          <p className="mt-3">
            <BiSupport/>
            :011 2553 2553(toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
