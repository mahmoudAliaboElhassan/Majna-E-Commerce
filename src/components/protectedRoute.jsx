import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "./loader/index.jsx";
function ProtectedRoute({ children }) {
  const { token, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!loading, !token)) navigate("/");
  }, [navigate, loading, token]);

  if (loading) return <Loader />;
  if (token) return children;
}

export default ProtectedRoute;
