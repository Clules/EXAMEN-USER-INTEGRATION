import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard/Dashboard";
import Register from "./views/register/Register";
import Users from "./views/users/Users";
import CardPrescription from "./views/prescription/CardPrescription";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/description/:id" element={<CardPrescription />} />
      </Routes>
    </>
  );
}

export default App;
