import { Route, Routes } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Delivered from "../screens/Delivered";
import Found from "../screens/Found";
import Inventory from "../screens/Inventory";
import Withdraw from "../screens/Withdraw";

export default function AppRoutes() {
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
