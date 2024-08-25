import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Loader from "@components/loader";

const withGuard = (Component) => {
  const Wrapper = () => {
    const navigate = useNavigate();
    const { loading, token, role } = useSelector((state) => state.auth);
    const location = useLocation();
    console.log(location.pathname.split("/")[1]);
    useEffect(() => {
      if (!loading && token && role === "reviewer") navigate("/reviewer");
      if (
        (location.pathname === "/favorite" ||
          location.pathname === "/shooping-cart" ||
          location.pathname.split("/")[1] === "customer-control-panel") &&
        localStorage.getItem("role") !== "customer"
      )
        navigate("/");
      else if (
        location.pathname.startsWith("/distributor-control-panel") &&
        role !== "distributor"
      )
        navigate("/");
    }, [navigate, loading, token]);
    if (loading) {
      return <Loader />;
    }
    if (!loading && token) return <Component />;
  };
  return Wrapper;
};

export default withGuard;
