import React from "react";
import Header from "./Header";

const Layout = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
