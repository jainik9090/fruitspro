import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import Home from "../container/Home/Home";
import Contact from "../container/Contact/Contact";
import Not from "../container/404/Not";
import Cart from "../container/Cart/Cart";
import Chackout from "../container/Chackout/Chackout";
import Shop from "../container/Shop/Shop";
import Shopdetail from "../container/Shop-detail/Shopdetail";
import Testumonial from "../container/Testimonial/Testumonial";

function UserRoutes(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/not" element={<Not />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chackout" element={<Chackout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopdetail/:id" element={<Shopdetail />} />
        <Route path="/textmonial" element={<Testumonial />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default UserRoutes;
