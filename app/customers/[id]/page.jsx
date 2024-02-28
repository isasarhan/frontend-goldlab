"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerPage = ({ params }) => {
  const [customer, setCustomer] = useState({});
  const getCustomer = async () => {
    console.log(params.id);
    const url = `https://gold-lab-backend.onrender.com/api/customers/${params.id}`;
    const res = await axios
      .get(url)
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {});
      setCustomer(res.data);
  };
  useEffect(() => {
    getCustomer();
  }, []);
  return <div>CustomerPage</div>;
};

export default CustomerPage;
