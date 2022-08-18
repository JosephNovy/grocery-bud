import React, { useEffect } from "react";

const Alert = ({ type, msg, removealert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removealert();
    }, 2500);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
