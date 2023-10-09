import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "../component/404";
import AddProduct from "../component/addProduct";
import Beverages from "../component/beverages";
import Category from "../component/category";
import Content from "../component/content";
import Order from "../component/order";
import OrderDetail from "../component/order-detail";
import Payment from "../component/payment";
import Shipping from "../component/shipping";
import VariableProduct from "../component/variableProduct";

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<OrderDetail />} />
        <Route path="order" element={<Order />} />
        <Route path="simple-product" element={<AddProduct />} />
        <Route path="variable-product" element={<VariableProduct />} />
        <Route path="category" element={<Category />} />
        <Route path="beverages" element={<Beverages />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<Payment />} />
        <Route path="content" element={<Content />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default DashboardRoutes;
