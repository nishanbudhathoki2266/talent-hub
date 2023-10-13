import React from "react";

const FormError = ({ errors }) => {
  return <p className="text-sm text-red-600 mt-1">{errors}</p>;
};

export default FormError;
