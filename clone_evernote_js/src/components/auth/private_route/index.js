import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const item = localStorage.getItem("user")
  return item ? children : <Navigate to="/login"></Navigate>
}

export default PrivateRoute;