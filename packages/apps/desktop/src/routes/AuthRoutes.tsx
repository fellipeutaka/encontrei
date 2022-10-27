import { Route, Routes } from "react-router-dom";

import SignIn from "../screens/SignIn";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}
