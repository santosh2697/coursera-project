import React from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  console.log(location.state, "location---");

  return <div>SuccessPage</div>;
};

export default SuccessPage;
