import { Routes, Route, Navigate } from "react-router-dom";

import { Signin } from "../pages/signin";
import { SignUp } from "../pages/signup"


export function AuthRoutes() {
  const user = localStorage.removeItem("@notes:user")

  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/register" element={<SignUp />} />

      {!user && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  )
}