import React from "react";
import HomeScreen from "./screens/home/index.js";
import UsersEditScreen from "./screens/users/edit/index.js";
import RegisterScreen from "./screens/auth/register/index.js";
import LoginScreen from "./screens/auth/login/index.js";
import NotesScreen from "./screens/notes/index/index.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/private_route/index.js";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/users/edit" element={
          <PrivateRoute>
            <UsersEditScreen />
          </PrivateRoute>
        }>
        </Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/notes" element={
          <PrivateRoute>
            <NotesScreen />
          </PrivateRoute>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;