import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-dark text-light text-center py-3">
      <h1>i am the nav bar </h1>
      <Link to="/registry" onClick={() => sessionStorage.removeItem("token")}>
        Logout
      </Link>
    </div>
  );
};

export default Header;
