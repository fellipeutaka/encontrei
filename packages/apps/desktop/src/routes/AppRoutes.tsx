import { Route, Routes } from "react-router-dom";

import { Sidebar } from "@encontrei/components/Sidebar";
import { Delivered } from "@encontrei/screens/Delivered";
import { Found } from "@encontrei/screens/Found";
import { Inventory } from "@encontrei/screens/Inventory";
import { Withdraw } from "@encontrei/screens/Withdraw";

export function AppRoutes() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route index element={<Inventory />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="found" element={<Found />} />
        <Route path="delivered" element={<Delivered />} />
      </Routes>
    </>
  );
}
