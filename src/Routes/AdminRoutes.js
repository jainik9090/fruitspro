import React from "react";
import { Route, Routes } from "react-router-dom";
import Category from "../admin/container/Category/Category";
import Layout from "../admin/component/Layout/Layout";
import Subcategory from "../admin/Sub category/Subcategory";

function AdminRoutes(props) {
  return (
    <Layout>
      <Routes>
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />

      </Routes>
    </Layout>
  );
}

export default AdminRoutes;
